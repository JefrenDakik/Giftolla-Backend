import { IAddressDto } from '../interfaces/IAddress'
import Address from '../models/mysql/address'

export class AddressDtoFactory {

  public createIAddresses(addresses: Address[]): IAddressDto[] {
    let addressesDto: IAddressDto[] = []

    addresses.forEach(address => {
      const addressDto = this.createIAddress(address)

      addressesDto.push(addressDto)
    })

    return addressesDto
  }

  public createIAddress(address: Address): IAddressDto {
    let addressDto = {} as IAddressDto

    addressDto = {
      id: address.id,
      fullName: address.full_name,
      addressLine1: address.address_line1,
      addressLine2: address.address_line2,
      city: address.city,
      state: address.state,
      zipCode: address.zip_code,
      phoneNumber: address.phone_number,
      instructions: address.delivery_instructions,
      buildingSecurityCode: address.building_security_code,
      countryId: address.country.id
    }

    return addressDto
  }
}