import { Service, Inject } from 'typedi'
import winston from 'winston'
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AddressRepository } from '../repositories/address'
import { IAddressDto, IAddressInput } from '../interfaces/IAddress';

@Service()
export default class AddressService {

  constructor(
    @Inject('logger') private logger: winston.Logger,
    @InjectRepository() private readonly addressRepository: AddressRepository,
  ){}

  public async saveAddress(customerId: number, addressInput: IAddressInput): Promise<IAddressDto>  {
    try {

      const addressModel = this.addressRepository.create({
        id: addressInput.id,
        full_name: addressInput.fullName,
        address_line1: addressInput.addressLine1,
        address_line2: addressInput.addressLine2,
        city: addressInput.city,
        state: addressInput.state,
        zip_code: addressInput.zipCode,
        phone_number: addressInput.phoneNumber,
        delivery_instructions: addressInput.instructions,
        building_security_code: addressInput.buildingSecurityCode,
        country: {
          id: addressInput.countryId
        },
        customer: {
          id: customerId
        }
      })

      const address: IAddressDto = await this.addressRepository.saveAddress(addressModel)

      return address

    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async getAddresses(customerId: number): Promise<IAddressDto[]> {
    try {
      const addresses = this.addressRepository.getCustomerAddresses(customerId)

      return addresses
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
