import Container, { Service } from "typedi"
import { Repository, EntityRepository } from "typeorm"
import winston from "winston"
import Address from "../models/mysql/address"
import Factory from "../factory"
import { IAddressDto, IAddressInput } from "../interfaces/IAddress"

@Service()
@EntityRepository(Address)
export class AddressRepository extends Repository<Address>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async getCustomerAddresses(customerId: number): Promise<IAddressDto[]> {
    const addresses = await this.find({
        where: { customer: { id: customerId } },
        relations: ['country'],
      })
      .then(addresses => {
        return addresses
      })
      .catch(error => {
        throw new Error(error)
      })
    const adressesDto = Factory.addressDtoFactory.createIAddresses(addresses)

    return adressesDto
  }

  public async saveAddress(address: Address): Promise<IAddressDto> {
    const addressRecord = await this.save(address)
      .then(address => {
        return address
      })
      .catch(error => {
        throw new Error(error)
      })

    const addressDto: IAddressDto = Factory.addressDtoFactory.createIAddress(addressRecord)

    return addressDto
  }

  public async deleteAddress(customerId: number, addressId: number) {
    const result = await this.delete({
      id: addressId,
      customer: {
        id: customerId
      }
    })
    .then(result => {
      return result
    })
    .catch(error => {
      throw new Error(error)
    })

    return result
  }

}