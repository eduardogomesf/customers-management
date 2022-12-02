import { v4 as uuid } from 'uuid';

type CreateCustomerDto = {
  id?: string
  document: number;
  name: string;
};

export class Customer {
  public id: string;
  public name: string;
  public document: number;

  constructor(customerData: CreateCustomerDto) {
    this.id = customerData.id ? customerData.id : uuid();
    this.name = customerData.name;
    this.document = customerData.document;
  }
}
