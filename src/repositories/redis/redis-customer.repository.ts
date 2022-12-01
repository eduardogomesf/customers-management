import Redis from 'ioredis';

import { Customer } from '../../models/customer';
import { CreateCustomerRepository } from '../../useCases/protocols/create-customer.repository';

export class RedisCustomerRepository implements CreateCustomerRepository {
  private repository: Redis;

  constructor() {
    this.repository = new Redis();
  }

  async create(customer: Customer): Promise<void> {
    await this.repository.set(
      `customer:${customer.id}`,
      JSON.stringify(customer),
    );
    return null;
  }
}
