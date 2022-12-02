import { Customer } from "../../../src/models/customer";
import { UpdateCustomerRepository } from "../../../src/useCases/protocols/update-customer-repository";

export class UpdateCustomerRepositoryStub implements UpdateCustomerRepository {
  updateById(customerId: string, data: { id: string; document: number; name: string; }): Promise<Customer> {
    return Promise.resolve({
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    })
  }
}
