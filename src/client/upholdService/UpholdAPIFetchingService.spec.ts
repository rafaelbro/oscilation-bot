import axios from "axios";
import UpholdAPIFetchingService from "./UpholdAPIFetchingService";
import { StatusCodes } from "http-status-codes";

const SUCCESSFUL_DATA = {
  status: StatusCodes.OK,
  data: {
    ask: '40334.8573414145',
    bid: '40137.2846971427',
    currency: 'USD'
  },
};

const WRONG_DATA = {
  status: StatusCodes.NOT_FOUND
};

const WRONG_DATA_STATUS = {
  status: StatusCodes.GONE
};

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get = jest.fn();

describe('UpholdAPIFetchingService', () => {
  describe('Fetching ticker', () => {
    describe('When valid response', () => {
      it('returns json value', async () => {
        mockedAxios.get.mockResolvedValueOnce(SUCCESSFUL_DATA);
        const result = await UpholdAPIFetchingService.fetchTicker({ currencyPair: 'BTCUSD' });
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
        expect(result.bid).toBe(SUCCESSFUL_DATA.data.bid);
      });
    });
    describe('When invalid request', () => {
      it('returns error', async () => {
        mockedAxios.get.mockResolvedValueOnce(WRONG_DATA);
        expect(async () => { await UpholdAPIFetchingService.fetchTicker({ currencyPair: 'BTCUSD' }) }).rejects.toThrowError();
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
      });
    });
    describe('When error fetching JSON', () => {
      it('propagates error', async () => {
        mockedAxios.get.mockImplementationOnce(() => {
          throw new Error('Random Error');
        });
        expect(async () => { await UpholdAPIFetchingService.fetchTicker({ currencyPair: 'BTCUSD' }) }).rejects.toThrowError();
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
      });
    });
  });
  describe('Validate ticker', () => {
    describe('When valid ticker', () => {
      it('returns true', async () => {
        mockedAxios.get.mockResolvedValueOnce(SUCCESSFUL_DATA);
        const result = await UpholdAPIFetchingService.validateTicker({ currencyPair: 'BTCUSD' });
        expect(result).toBeTruthy();
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
      });
    });
    describe('When invalid ticker', () => {
      it('returns false', async () => {
        mockedAxios.get.mockResolvedValueOnce(WRONG_DATA);
        const result = await UpholdAPIFetchingService.validateTicker({ currencyPair: 'BTCUSD' });
        expect(result).toBeFalsy();
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
      });
    });
    describe('When error fetching', () => {
      it('propagates error', async () => {
        mockedAxios.get.mockImplementationOnce(() => {
          throw new Error('Random Error');
        });
        expect(async () => { await UpholdAPIFetchingService.validateTicker({ currencyPair: 'BTCUSD' }) }).rejects.toThrowError();
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
      });
    });
    describe('When unexpected status code', () => {
      it('throws error', async () => {
        mockedAxios.get.mockResolvedValueOnce(WRONG_DATA_STATUS);
        expect(async () => { await UpholdAPIFetchingService.validateTicker({ currencyPair: 'BTCUSD' }) }).rejects.toThrowError();
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.uphold.com/v0/ticker/BTCUSD');
      });
    });
  });
});