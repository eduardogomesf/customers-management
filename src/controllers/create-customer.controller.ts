import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { CreateCustomerUseCase } from '../useCases/create-customer.use-case';

@Controller()
export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @HttpCode(201)
  @Post('/customers')
  async execute(@Body() body: CreateCustomerDto) {
    const customer = await this.createCustomerUseCase.create(body);
    return customer;
  }
}
