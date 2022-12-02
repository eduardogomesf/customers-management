import { NotFoundException } from '@nestjs/common';
import { ServiceUnavailableException } from '../../src/exceptions/http/service-unavailable.exception';
import { GetCustomerByIdUseCase } from '../../src/useCases/get-customer-by-id.use-case';
import { GetCustomerByIdRepository } from '../../src/useCases/protocols/get-customer-by-id.repository';
import { GetCustomerByIdRepositoryStub } from './stubs/get-customer-by-id.repository.stub';

jest.mock('uuid', () => ({
  v4: () => {
    return 'any-uuid';
  },
}));

describe('GetCustomerByIdUseCase', () => {
  let getCustomerByIdUseCase: GetCustomerByIdUseCase;
  let getCustomerByIdRepositoryStub: GetCustomerByIdRepository;

  beforeEach(() => {
    getCustomerByIdRepositoryStub = new GetCustomerByIdRepositoryStub();
    getCustomerByIdUseCase = new GetCustomerByIdUseCase(
      getCustomerByIdRepositoryStub,
    );
  });

  it('should get a customer by id', async () => {
    const result = await getCustomerByIdUseCase.get('any-id')

    expect(result).toEqual({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    })
  })

  it('should throw a not found exception if the customer is not found', async () => {
    getCustomerByIdRepositoryStub.getById = jest.fn().mockImplementation(() => {
      return new Promise(resolve => resolve(null))
    })

    const promise = getCustomerByIdUseCase.get('any-id')

    await expect(promise).rejects.toThrowError(
      new NotFoundException({
        error: 'Customer not found'
      })
    )
  })

  it('should throw a bad gateway exception if any error occur when trying to retrieve a customer', async () => {
    jest.spyOn(getCustomerByIdRepositoryStub, 'getById').mockReturnValue(Promise.reject(new Error('any_error')))

    const promise = getCustomerByIdUseCase.get('any-id')

    await expect(promise).rejects.toThrowError(
      new ServiceUnavailableException()
    )
  })
});
