import Container, { Service, Inject } from "typedi";
import { Repository, EntityRepository } from "typeorm";
import Customer from '../models/mysql/customer';
import winston from "winston";
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async saveCustomer(customer: Customer): Promise<Customer> {
    const customerRecord = await this.manager
      .save(customer)
      .then(customer => {
        this.logger.silly("Customer has been saved, id is ", customer.id)
        return customer
      }).catch(error => {
        throw new Error(error)
      })
    return customerRecord
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customerRecord = await this.findOne({ email: email })

    return customerRecord
  }

}