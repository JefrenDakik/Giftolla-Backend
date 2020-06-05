export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface ICustomerInput {
  name: string;
  email: string;
  password: string;
}