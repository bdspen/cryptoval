import { Injectable } from '@angular/core';
import { Config } from '../../config';
import { Coin } from '../../models/Coin';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkingConfigProvider {

  serverURL: string = 'https://api.coinmarketcap.com/v1';  
  ticker: string = '/ticker';

  constructor () { }

  tickerUrl(param?: string): string {
    return this.serverURL + this.ticker;
  }

  createTickerUrls(coinIds: string[]): string[] {
    return coinIds.map((coinId: string) => this.tickerUrl(coinId));  
  }



}
