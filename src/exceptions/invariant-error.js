import ClientError from './client-error';

class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

export default InvariantError;
