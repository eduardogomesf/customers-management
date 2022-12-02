import Redis from 'ioredis';

import { Customer } from '../../models/customer';
import { CreateCustomerRepository } from '../../useCases/protocols/create-customer.repository';
import { GetCustomerByIdRepository } from '../../useCases/protocols/get-customer-by-id.repository';

export class RedisCustomerRepository implements CreateCustomerRepository, GetCustomerByIdRepository {
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
}
