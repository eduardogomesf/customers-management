import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { CreateCustomerUseCase } from '../../src/useCases/create-customer.use-case';
import { CreateCustomerRepository } from '../../src/useCases/protocols/create-customer.repository';
import { CreateCustomerRepositoryStub } from './stubs/create-customer.repository.stub';

jest.mock('uuid', () => ({
  v4: () => {
    return 'any-uuid';
  },
}));

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCase;
  let createCustomerRepositoryStub: CreateCustomerRepository;

  beforeEach(() => {
    createCustomerRepositoryStub = new CreateCustomerRepositoryStub();
    createCustomerUseCase = new CreateCustomerUseCase(
      createCustomerRepositoryStub,
    );
  });

  it('should create a new customer', async () => {
    const payload = {
      name: 'Mr. Tester',
      document: 12141592452,
    };

    const result = await createCustomerUseCase.create(payload);

    expect(result.id).toBe('any-uuid');
    expect(result.document).toBe(payload.document);
    expect(result.name).toBe(payload.name);
  });

  it('should call createCustomerRepository with correct values', async () => {
    const payload = {
      name: 'Mr. Tester',
      document: 12141592452,
    };

    const repositoryCreateSpy = jest.spyOn(
      createCustomerRepositoryStub,
      'create',
    );

    await createCustomerUseCase.create(payload);

    expect(repositoryCreateSpy).toHaveBeenCalledTimes(1);
    expect(repositoryCreateSpy).toHaveBeenCalledWith({
      id: 'any-uuid',
      name: 'Mr. Tester',
      document: 12141592452,
    });
  });

  it('should throw a bad request exception if document is not provided', async () => {
    const payload = {
      name: 'Mr. Tester',
    } as any;

    const promise = createCustomerUseCase.create(payload);

    await expect(promise).rejects.toThrowError(
      new BadRequestException({
        error: 'Invalid params',
      }),
    );
  });

  it('should throw a bad request exception if name is not provided', async () => {
    const payload = {
      document: 12141592452,
    } as any;

    const promise = createCustomerUseCase.create(payload);

    await expect(promise).rejects.toThrowError(
      new BadRequestException({
        error: 'Invalid params',
      }),
    );
  });

  it('should throw a bad gateway exception if any error occur when trying to save the customer in the cache', async () => {
    const payload = {
      name: 'Mr. Tester',
      document: 12141592452,
    };

    jest.spyOn(createCustomerRepositoryStub, 'create').mockReturnValue(Promise.reject(new Error('any_error')))

    const promise = createCustomerUseCase.create(payload);

    await expect(promise).rejects.toThrowError(
      new BadGatewayException({
        error: 'Service unavailable',
      }),
    );
  });
});
