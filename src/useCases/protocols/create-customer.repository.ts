import { Customer } from '../../models/customer';

export interface CreateCustomerRepository {
  create: (data: Customer) => Promise<void>;
}
