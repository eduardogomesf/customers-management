import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../models/customer';
import { GetCustomerByIdRepository } from './protocols/get-customer-by-id.repository';

@Injectable()
export class GetCustomerByIdUseCase {
  constructor(
    private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
  ) {}

  async get(customerId: string): Promise<Customer> {
    const customer = await this.getCustomerByIdRepository.getById(customerId).catch(() => {
      throw new BadGatewayException({
        error: 'Service unavailable',
      });
    });


    if (!customer) {
      throw new NotFoundException({
        error: 'Customer not found',
      });
    }

    return customer;
  }
}
