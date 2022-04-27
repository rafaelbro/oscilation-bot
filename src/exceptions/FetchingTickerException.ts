class FetchingTickerException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export default FetchingTickerException;