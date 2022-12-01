import { Customer } from '../../../src/models/customer';
import { CreateCustomerRepository } from '../../../src/useCases/protocols/create-customer.repository';

export class CreateCustomerRepositoryStub implements CreateCustomerRepository {
  create(data: Customer): Promise<void> {
    return Promise.resolve(null);
  }
}
