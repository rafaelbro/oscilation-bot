import UpholdAPIFetchingService from "./client/upholdService/UpholdAPIFetchingService";
import AlertBotService from "./service/AlertBotService";
import DatabaseService from "./service/DatabaseService";
import InputValidatorService from "./service/InputValidatorService";
import { InputParameters } from "./service/types/InputParameters";
require('dotenv').config();

const databaseService = new DatabaseService();
console.log(process.env.DB_CONNECTION_STRING);

InputValidatorService.checkInputFormat(process.argv).then(async (result: InputParameters[]) => {
  for (let i = 0; i < result.length; i++) {
    UpholdAPIFetchingService.fetchTicker({ currencyPair: result[i].currencyPair }).then(async (price) => {
      console.log(`Starting notification service for: ${result[i].currencyPair}, with initial price: ${price.bid},
            notifying at ${result[i].percentageOscilation}% oscilations at an interval of ${result[i].fetchIntervalInSeconds}`);
      var alertBot = new AlertBotService({ currencyPair: result[i].currencyPair }, result[i].fetchIntervalInSeconds, price.bid, result[i].percentageOscilation);
      setInterval(() => { alertBot.comparePrices() }, alertBot.getIntervalInSeconds() * 1000);
    });
  };
});

