import Redis from 'ioredis';

import { Customer } from '../../models/customer';
import { CreateCustomerRepository } from '../../useCases/protocols/create-customer.repository';
import { GetCustomerByIdRepository } from '../../useCases/protocols/get-customer-by-id.repository';
import { UpdateCustomerData, UpdateCustomerRepository } from '../../useCases/protocols/update-customer-repository';

export class RedisCustomerRepository implements CreateCustomerRepository, GetCustomerByIdRepository, UpdateCustomerRepository {
  private repository: Redis;

  private keyPrefix = 'customer:';

  constructor() {
    this.repository = new Redis();
  }

  async create(customer: Customer): Promise<void> {
    await this.repository.set(
      `${this.keyPrefix}${customer.id}`,
      JSON.stringify(customer),
    );
    return null;
  }

  async getById(customerId: string): Promise<Customer> {
    const stringifiedCustomer = await this.repository.get(
      `${this.keyPrefix}${customerId}`,
    );
    return stringifiedCustomer ? JSON.parse(stringifiedCustomer) : null;
  }

  async updateById(customerId: string, data: UpdateCustomerData): Promise<Customer> {
    await this.repository.set(
      `${this.keyPrefix}${customerId}`,
      ""
    );

    await this.repository.set(
      `${this.keyPrefix}${data.id}`,
      JSON.stringify(data)
    );

    return new Customer(data)
  }
}
