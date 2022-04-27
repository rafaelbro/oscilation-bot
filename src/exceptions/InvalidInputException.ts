class InvalidInputException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export default InvalidInputException;