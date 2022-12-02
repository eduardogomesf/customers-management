import { Customer } from "../../models/customer";

type UpdateCustomerData = {
  id: string
  document: number
  name: string
}

export interface UpdateCustomerRepository {
  updateById: (customerId: string, data: UpdateCustomerData) => Promise<Customer>
}
