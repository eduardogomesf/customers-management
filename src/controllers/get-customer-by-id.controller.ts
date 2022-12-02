import { Controller, Get, Param } from "@nestjs/common";
import { GetCustomerByIdUseCase } from "../useCases/get-customer-by-id.use-case";

@Controller()
export class GetCustomerByIdController {

  constructor(
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase
  ) {}

  @Get('/customers/:id')
  async execute(@Param('id') customerId: string) {
    const customer = await this.getCustomerByIdUseCase.get(customerId)
    return customer
  }

}
