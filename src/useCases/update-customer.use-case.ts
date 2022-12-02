import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { UpdateCustomerDto } from "../dtos/update-customer.dto";
import { CustomerNotFoundException } from "../exceptions/http/customer-not-found.exception";
import { ServiceUnavailableException } from "../exceptions/http/service-unavailable.exception";
import { Customer } from "../models/customer";
import { GetCustomerByIdRepository } from "./protocols/get-customer-by-id.repository";
import { UpdateCustomerRepository } from "./protocols/update-customer-repository";

@Injectable()
export class UpdateCustomerUseCase {

  constructor(
    private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
    private readonly updateCustomerRepository: UpdateCustomerRepository
  ) {}

  async update(customerId: string, updateData: UpdateCustomerDto): Promise<Customer> {
    if (!updateData.id || !updateData.document || !updateData.name) {
      throw new BadRequestException({
        error: 'Invalid params'
      })
    }

    const customerById = await this.getCustomerByIdRepository.getById(customerId).catch(() => {
      throw new ServiceUnavailableException()
    })

    if (!customerById) {
      throw new CustomerNotFoundException()
    }

    const customerByNewId = await this.getCustomerByIdRepository.getById(updateData.id).catch(() => {
      throw new ServiceUnavailableException()
    })

    const isNewIdAlreadyInUse = !!customerByNewId

    if (isNewIdAlreadyInUse) {
      throw new ConflictException({
        error: 'Id already in use'
      })
    }

    const customer = await this.updateCustomerRepository.updateById(
      customerId,
      updateData
    ).catch(() => {
      throw new ServiceUnavailableException()
    })

    return customer
  }

}
