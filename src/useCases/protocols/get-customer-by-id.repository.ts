import { Customer } from '../../models/customer';

export interface GetCustomerByIdRepository {
  getById: (customerId: string) => Promise<Customer>;
}
