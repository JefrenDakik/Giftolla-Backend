import Customer from '../models/mysql/customer'
import { ICustomerInput, IFacebookCustomerInput } from '../interfaces/ICustomer'
import { Service, Inject } from 'typedi'
import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import winston from 'winston'
import config from '../config'
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CustomerRepository } from '../repositories/customer'
import { CartRepository } from '../repositories/cart'
import { WishlistRepository } from '../repositories/wishlist'

@Service()
export default class AuthService {

  constructor(
    @Inject('logger') private logger: winston.Logger,
    @InjectRepository() private readonly customerRepository: CustomerRepository,
    @InjectRepository() private readonly cartRepository: CartRepository,
    @InjectRepository() private readonly wishlistRepository: WishlistRepository,
  ){}
  
  public async signUp(customerInput: ICustomerInput): Promise<{ customer: Customer; token: string }> {
    try {
      let customer
      customer = await this.customerRepository.findByEmail(customerInput.email)
      if (customer) {
        throw new Error('Email already exists')
      }

      const salt = randomBytes(32)
      this.logger.debug('Hashing password')
      const hashedPassword = await argon2.hash(customerInput.password, { salt })

      const cart = await this.cartRepository.createCart()
      const wishlist = await this.wishlistRepository.createWishlist()

      this.logger.silly('Creating user db record')
      const customerModel = this.customerRepository.create({
        name: customerInput.name,
        email: customerInput.email,
        password: hashedPassword,
        salt: salt.toString('hex'),
        cart: cart,
        wishlist: wishlist,
      })
      
      customer = await this.customerRepository.saveCustomer(customerModel)

      this.logger.silly('Generating JWT')
      const token: string = this.generateToken(customer)

      Reflect.deleteProperty(customer, 'password')
      Reflect.deleteProperty(customer, 'salt')

      return { customer, token }
      
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async SignIn(email: string, password: string): Promise<{ customer: Customer; token: string}> {
    try {
      const customer = await this.customerRepository.findByEmail(email)

      if (!customer) {
        throw new Error("Customer Not Registered")
      }

      /**
       * We use verify from argon2 to prevent 'timing based' attacks
       */
      this.logger.silly('Checking password')
      const validPassword = await argon2.verify(customer.password, password)
      if (!validPassword) {
        throw new Error("Invalid Password")
      }
      this.logger.silly('Password is valid!')
      this.logger.silly('Generating JWT')
      const token = this.generateToken(customer)

      Reflect.deleteProperty(customer, 'password')
      Reflect.deleteProperty(customer, 'salt')

      return { customer, token }

    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async loginWithFacebook(customerInput: IFacebookCustomerInput): Promise<{ customer: Customer; token: string}> {
    try {
      let customer = await this.customerRepository.findByFacebookIdOrEmail(
        customerInput.facebookId,
        customerInput.email,
      )
      
      if(!customer) {
        const cart = await this.cartRepository.createCart()
        const wishlist = await this.wishlistRepository.createWishlist()

        const customerModel = this.customerRepository.create({
          name: customerInput.name,
          email: customerInput.email,
          facebookId: customerInput.facebookId,
          cart: cart,
          wishlist: wishlist,
        })

        customer = await this.customerRepository.saveCustomer(customerModel)
      } else {
        // handle usecase when user change his facebook email
        const customerModel = this.customerRepository.create({
          id: customer.id,
          name: customerInput.name,
          email: customerInput.email,
        })

        customer = await this.customerRepository.saveCustomer(customerModel)
      }

      this.logger.silly('Generating JWT')
      const token: string = this.generateToken(customer)

      Reflect.deleteProperty(customer, 'password')
      Reflect.deleteProperty(customer, 'salt')

      return { customer, token }
    
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  private generateToken(customer) {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${customer.id}`)
    return jwt.sign(
      {
        _id: customer.id, // We are gonna use this in the middleware 'isAuth'
        name: customer.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

}
