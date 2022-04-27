import AlarmNotification from "../models/AlarmNotification";
import { FetchParameters } from "../client/upholdService/types/FetchParameters";
import UpholdAPIFetchingService from "../client/upholdService/UpholdAPIFetchingService";
import DatabaseService from "./DatabaseService";

class AlertBotService {
  private currencyPair: string;
  private originalBidPrice: number;
  private intervalInSeconds: number;
  private originalBidPriceTimestamp: number;
  private oscilationPercentage: number;

  constructor(params: FetchParameters, intervalInSeconds: number, originalBidPrice: number, oscilationPercentage: number) {
    this.originalBidPriceTimestamp = new Date().getTime();
    this.currencyPair = params.currencyPair;
    this.intervalInSeconds = intervalInSeconds;
    this.originalBidPrice = originalBidPrice;
    this.oscilationPercentage = oscilationPercentage;
  }

  private async fetchPairPrice(): Promise<number> {
    const result = await UpholdAPIFetchingService.fetchTicker({ currencyPair: this.currencyPair });
    return result.bid;
  }

  public getIntervalInSeconds(): number {
    return this.intervalInSeconds;
  }

  public async comparePrices(): Promise<void> {
    await this.fetchPairPrice().then(async result => {
      const percentDifference = Math.abs(((this.originalBidPrice - result) / (this.originalBidPrice)) * 100);
      if (percentDifference > this.oscilationPercentage) {
        console.log(`Price changed over treshold for ${this.currencyPair}, saving to database`);
        await this.saveNotificationToDatabase(this.currencyPair, this.intervalInSeconds, this.originalBidPrice, result, this.oscilationPercentage, this.originalBidPriceTimestamp, percentDifference);
      }
    });
  }

  private async saveNotificationToDatabase(currencyPair: string, fetchInterval: number, originalBidPrice: number, fetchedBidPrice: number,
    oscilationPercentage: number, timeOfBidPrice: number, percentPriceDifference: number) {
    const alarmNotification: AlarmNotification = await AlarmNotification.create({
      currencyPair: currencyPair,
      originalBidPrice: originalBidPrice,
      fetchedBidPrice: fetchedBidPrice,
      oscilationPercentage: oscilationPercentage,
      fetchIntervalInSeconds: fetchInterval,
      timeOfBidPrice: new Date(timeOfBidPrice),
      percentPriceDifference: percentPriceDifference,
    });
    await alarmNotification.save();
  }
};

export default AlertBotService;