import { FetchParameters } from "./upholdService/types/FetchParameters";
import { ResponseParameters } from "./upholdService/types/ResponseParameters";

export default interface IHttpRequestService {
  BASE_URL: string,
  fetchTicker(params: FetchParameters): Promise<ResponseParameters>;
  validateTicker(params: FetchParameters): Promise<boolean>;
}