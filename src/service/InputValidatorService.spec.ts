import AlarmNotification from "../models/AlarmNotification";
import UpholdAPIFetchingService from "../client/upholdService/UpholdAPIFetchingService";
import DatabaseService from "./DatabaseService";
import AlertBotService from "./AlertBotService";
import { ResponseParameters } from "@src/client/upholdService/types/ResponseParameters";
import InputValidatorService from "./InputValidatorService";
import { InputParameters } from "./types/InputParameters";
import InvalidInputException from "../exceptions/InvalidInputException";
import InvalidTickerException from "../exceptions/InvalidTickerException";

const SUCCESSFUL_DATA: ResponseParameters = {
  ask: 40334.8573414145,
  bid: 40137.2846971427,
  currency: 'USD'
};

const mockedApiFetchingService = UpholdAPIFetchingService as jest.Mocked<typeof UpholdAPIFetchingService>;
mockedApiFetchingService.validateTicker = jest.fn();


describe('InputValidatorService', () => {
  describe('CheckInputFormat', () => {
    describe('When correct input', () => {
      it('Returns expected vector', async () => {
        const input: string[] = ['npm', 'run', 'BTCUSD,0.01,5', 'ADAUSD,0.03,10']; //equivalent to process.argv
        mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);
        mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);
        var inputValues: InputParameters[] = await InputValidatorService.checkInputFormat(input);
        expect(inputValues[0]).toStrictEqual({ currencyPair: 'BTCUSD', percentageOscilation: 0.01, fetchIntervalInSeconds: 5 });
        expect(inputValues[1]).toStrictEqual({ currencyPair: 'ADAUSD', percentageOscilation: 0.03, fetchIntervalInSeconds: 10 });
      });
    });
    describe('When incorrect input', () => {
      describe('When different than three comma separated elements in argument', () => {
        it('Returns error', async () => {
          const input_with_more_args: string[] = ['npm', 'run', 'BTCUSD,0.01,5,invalid'];
          const input_with_less_args: string[] = ['npm', 'run', 'ADAUSD,0.01'];
          expect(async () => { await InputValidatorService.checkInputFormat(input_with_more_args) }).rejects.toThrowError(InvalidInputException);
          expect(async () => { await InputValidatorService.checkInputFormat(input_with_less_args) }).rejects.toThrowError(InvalidInputException);
        });
      });
      describe('When invalid pair format', () => {
        it('Returns error', async () => {
          const input: string[] = ['npm', 'run', 'BTCUSD,0.01,5'];
          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(false);
          expect(async () => { await InputValidatorService.checkInputFormat(input) }).rejects.toThrowError(InvalidTickerException);
        });
      });
      describe('When invalid oscilation range and format', () => {
        it('Returns error', async () => {
          const input_with_zero_value: string[] = ['npm', 'run', 'BTCUSD,0,5'];
          const input_with_above_value: string[] = ['npm', 'run', 'BTCUSD,100,5'];
          const input_with_NaN_value: string[] = ['npm', 'run', 'BTCUSD,aaa,5'];

          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);
          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);
          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);

          expect(async () => { await InputValidatorService.checkInputFormat(input_with_zero_value) }).rejects.toThrowError(InvalidInputException);
          expect(async () => { await InputValidatorService.checkInputFormat(input_with_above_value) }).rejects.toThrowError(InvalidInputException);
          expect(async () => { await InputValidatorService.checkInputFormat(input_with_NaN_value) }).rejects.toThrowError(InvalidInputException);
        });
      });
      describe('When invalid interval range and format', () => {
        it('Returns error', async () => {
          const input_with_zero_value: string[] = ['npm', 'run', 'BTCUSD,0.01,0'];
          const input_with_above_value: string[] = ['npm', 'run', 'BTCUSD,0.01,101'];
          const input_with_NaN_value: string[] = ['npm', 'run', 'BTCUSD,0.01,aaa'];

          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);
          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);
          mockedApiFetchingService.validateTicker.mockResolvedValueOnce(true);

          expect(async () => { await InputValidatorService.checkInputFormat(input_with_zero_value) }).rejects.toThrowError(InvalidInputException);
          expect(async () => { await InputValidatorService.checkInputFormat(input_with_above_value) }).rejects.toThrowError(InvalidInputException);
          expect(async () => { await InputValidatorService.checkInputFormat(input_with_NaN_value) }).rejects.toThrowError(InvalidInputException);
        });
      });
    });
  });
});