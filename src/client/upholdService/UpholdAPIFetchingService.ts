import IHttpRequestService from "../IHttpRequestService";
import { FetchParameters } from "./types/FetchParameters";
import axios from "axios";
import Status from "http-status-codes";
import { ResponseParameters } from "./types/ResponseParameters";
import FetchingTickerException from "../../exceptions/FetchingTickerException";


class UpholdAPIFetchingService implements IHttpRequestService {
  BASE_URL = "https://api.uphold.com/v0/ticker/";
  public async fetchTicker(params: FetchParameters): Promise<ResponseParameters> {
    const apiURL = `${this.BASE_URL}${params.currencyPair}`;

    try {
      const result = await axios.get<ResponseParameters>(apiURL);
      if (result.status !== Status.OK) {
        throw new FetchingTickerException(JSON.stringify((result.statusText)));
      }
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  public async validateTicker(params: FetchParameters): Promise<boolean> {
    const apiURL = `${this.BASE_URL}${params.currencyPair}`;
    try {
      const result = await axios.get<ResponseParameters>(apiURL);
      if (result.status === Status.OK) {
        return true;
      } else if (result.status === Status.NOT_FOUND) {
        return false
      } else {
        throw new FetchingTickerException(JSON.stringify((result.statusText)))
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UpholdAPIFetchingService();