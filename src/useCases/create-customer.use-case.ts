import {
  BadRequestException,
  Injectable,
  BadGatewayException,
} from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customer } from '../models/customer';
import { CreateCustomerRepository } from './protocols/create-customer.repository';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly createCustomerRepository: CreateCustomerRepository,
  ) {}

  async create(dto: CreateCustomerDto) {
    const { document, name } = dto;

    if (!document || !name) {
      throw new BadRequestException({
        error: 'Invalid params',
      });
    }

    const customer = new Customer(dto);

    await this.createCustomerRepository.create(customer).catch(() => {
      throw new BadGatewayException({
        error: 'Service unavailable',
      });
    });

    return customer;
  }
}
