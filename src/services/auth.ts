import User from '../models/mysql/user'
import { IUserInput } from '../interfaces/IUser'
import { Service, Inject } from 'typedi'
import { Connection } from 'typeorm'
import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import winston from 'winston'
import config from '../config'

@Service()
export default class AuthService {
  constructor(
    @Inject('mysqlConnection') private mysqlConnection: Connection,
    @Inject('logger') private logger: winston.Logger,
  ){}

  public async signUp(userInput: IUserInput): Promise<{ user: User; token: string }> {
    try {
      const salt = randomBytes(32)

      this.logger.debug('Hashing password')
      const hashedPassword = await argon2.hash(userInput.password, { salt })

      this.logger.silly('Creating user db record')
      let userModel = new User()
      userModel.name = userInput.name
      userModel.email = userInput.email
      userModel.password = hashedPassword
      userModel.salt = salt.toString('hex')

      const user = await this.mysqlConnection.manager
        .save(userModel)
        .then(user => {
          this.logger.silly("User has been saved, id is ", user.id)
          return user
        }).catch(error => {
          throw new Error(error)
        })

      this.logger.silly('Generating JWT')
      const token: string = this.generateToken(user)

      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')

      return { user, token }
      
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async SignIn(email: string, password: string): Promise<{ user: User; token: string}> {
    try {
      const userRepository = this.mysqlConnection.getRepository(User)
      const user = await userRepository.findOne({ email: email })
      if (!user) {
        throw new Error("User Not Registered")
      }

      /**
       * We use verify from argon2 to prevent 'timing based' attacks
       */
      this.logger.silly('Checking password')
      const validPassword = await argon2.verify(user.password, password)
      if (!validPassword) {
        console.log("invalid pass")
        throw new Error("Invalid Password")
      }
      this.logger.silly('Password is valid!')
      this.logger.silly('Generating JWT')
      const token = this.generateToken(user)

      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')

      return { user, token }

    } catch (error) {
        this.logger.error(error)
        throw error
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user.id}`);
    return jwt.sign(
      {
        _id: user.id, // We are gonna use this in the middleware 'isAuth'
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

}
