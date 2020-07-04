export interface IAddressInput {
  id: number
  fullName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  instructions: string
  buildingSecurityCode: string
  countryId: number
}

export interface IAddressDto {
  id: number
  fullName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  instructions: string
  buildingSecurityCode: string
  countryId: number
}