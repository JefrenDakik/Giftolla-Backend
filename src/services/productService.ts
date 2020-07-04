import { Service, Inject } from 'typedi'
import winston from 'winston'
import { InjectRepository } from 'typeorm-typedi-extensions';
import Product from '../models/mysql/product'
import { ProductRepository } from '../repositories/product'
import { IProductDto } from '../interfaces/IProduct';

@Service()
export default class ProductService {

  constructor(
    @Inject('logger') private logger: winston.Logger,
    @InjectRepository() private readonly productRepository: ProductRepository,
  ){}

  public async getProducts(): Promise<IProductDto[]> {
    try {
      const products = await this.productRepository.getProducts()

      return products
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
