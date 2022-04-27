import UpholdAPIFetchingService from "../client/upholdService/UpholdAPIFetchingService";
import InvalidInputException from "../exceptions/InvalidInputException";
import InvalidTickerException from "../exceptions/InvalidTickerException";
import { InputParameters } from "./types/InputParameters";

class InputValidatorService {
  private INPUT_SIZE: number = 3;
  private MIN_INTERVAL: number = 1;
  private MAX_INTERVAL: number = 100;

  public async checkInputFormat(input: string[]): Promise<InputParameters[]> {
    var resolvedInput: InputParameters[] = [];
    for (let i = 2; i < input.length; i++) {
      var splitInput = input[i].split(',');
      this.checkInputSize(splitInput);
      await this.checkPairFormat(splitInput[0]);
      this.checkOscilationFormat(splitInput[1]);
      this.checkIntervalFormat(splitInput[2]);
      resolvedInput.push({
        currencyPair: splitInput[0],
        percentageOscilation: parseFloat(splitInput[1]),
        fetchIntervalInSeconds: parseInt(splitInput[2])
      });
    }
    return resolvedInput;
  }

  private checkInputSize(input: string[]): boolean {
    if (input.length === this.INPUT_SIZE) return true;
    throw new InvalidInputException("Input " + input.toString() + " has invalid format");
  }

  private async checkPairFormat(element: string) {
    const result = await UpholdAPIFetchingService.validateTicker({ currencyPair: element });
    if (result === true) return true;
    throw new InvalidTickerException("Ticker " + element + " has invalid format");
  }

  private checkOscilationFormat(element: string) {
    const number = parseFloat(element);
    if (!isNaN(number) && (number > 0 && number < 100)) {
      return true;
    }
    throw new InvalidInputException(element + " is not a number, or not in valid range(0 to 100)");
  }

  private checkIntervalFormat(element: string) {
    const number = parseFloat(element);
    if (!isNaN(number) && (number >= this.MIN_INTERVAL && number <= this.MAX_INTERVAL)) {
      return true;
    }
    throw new InvalidInputException(element + " is not a number, or not in valid range(1 to 100)");
  }
}

export default new InputValidatorService;