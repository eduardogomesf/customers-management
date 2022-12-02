import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { UpdateCustomerUseCase } from '../useCases/update-customer.use-case';

@Controller()
export class UpdateCustomerController {
  constructor(private readonly updateCustomerUseCase: UpdateCustomerUseCase) {}

  @Put('/customers/:id')
  async execute(@Body() body: UpdateCustomerDto, @Param('id') customerId: string) {
    const customer = await this.updateCustomerUseCase.update(customerId, body);
    return customer;
  }
}
