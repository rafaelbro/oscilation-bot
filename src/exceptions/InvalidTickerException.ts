class InvalidTickerException extends Error {
  constructor(ticker: string) {
    super("Invalid Ticker: " + ticker);
  }
}

export default InvalidTickerException;