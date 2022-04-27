import AlarmNotification from "../models/AlarmNotification";
import UpholdAPIFetchingService from "../client/upholdService/UpholdAPIFetchingService";
import DatabaseService from "./DatabaseService";
import AlertBotService from "./AlertBotService";
import { ResponseParameters } from "@src/client/upholdService/types/ResponseParameters";

const SUCCESSFUL_DATA: ResponseParameters = {
  ask: 40334.8573414145,
  bid: 40137.2846971427,
  currency: 'USD'
};

const mockedApiFetchingService = UpholdAPIFetchingService as jest.Mocked<typeof UpholdAPIFetchingService>;
mockedApiFetchingService.fetchTicker = jest.fn();
const databaseService = new DatabaseService();


describe('AlertBotSerice', () => {
  beforeEach(async () => {
    try{
      await AlarmNotification.destroy({
        where: {},
        truncate: true
      });
    } catch (error){
      console.log(error);
    }
  });
  describe('Compare prices', () => {
    describe('When inferior to oscilation percentage', () => {
      it('Does not save to database', async () => {
        const oscilationPercentage = 0.01;
        const inferiorPrice = SUCCESSFUL_DATA.bid * (1 - (oscilationPercentage - 0.0001) / 100);
        var alarmBot = new AlertBotService({ currencyPair: 'BTCUSD' }, 5, inferiorPrice, oscilationPercentage);

        mockedApiFetchingService.fetchTicker.mockResolvedValueOnce(SUCCESSFUL_DATA);
        await alarmBot.comparePrices();
        const records = await AlarmNotification.count();
        expect(records).toEqual(0);
      });
    });
    describe('When superior to oscilation percentage', () => {
      it('Does not save to database', async () => {
        const oscilationPercentage = 0.01;
        const inferiorPrice = SUCCESSFUL_DATA.bid * (1 - (oscilationPercentage + 0.0001) / 100);
        var alarmBot = new AlertBotService({ currencyPair: 'BTCUSD' }, 5, inferiorPrice, oscilationPercentage);
        mockedApiFetchingService.fetchTicker.mockResolvedValueOnce(SUCCESSFUL_DATA);
        await alarmBot.comparePrices();
        const records = await AlarmNotification.count();
        expect(records).toEqual(1);
      });
    });
  });
  describe('getIntervalInSeconds', () => {
    it('returns correct interval', () => {
      const oscilationPercentage = 0.01;
      const interval = 5;
      var alarmBot = new AlertBotService({ currencyPair: 'BTCUSD' }, interval, SUCCESSFUL_DATA.bid, oscilationPercentage);
      expect(alarmBot.getIntervalInSeconds()).toEqual(interval);
    });
  });
});