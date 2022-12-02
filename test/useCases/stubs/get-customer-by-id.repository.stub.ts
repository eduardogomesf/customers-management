import { Customer } from "../../../src/models/customer";
import { GetCustomerByIdRepository } from "../../../src/useCases/protocols/get-customer-by-id.repository";

export class GetCustomerByIdRepositoryStub implements GetCustomerByIdRepository {
  async getById(customerId: string): Promise<Customer> {
    return Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    })
  }

}
