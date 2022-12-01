import { v4 as uuid } from 'uuid';

type CreateCustomerDto = {
  document: number;
  name: string;
};

export class Customer {
  public id: string;
  public name: string;
  public document: number;

  constructor(customerData: CreateCustomerDto) {
    this.id = uuid();
    this.name = customerData.name;
    this.document = customerData.document;
  }
}
