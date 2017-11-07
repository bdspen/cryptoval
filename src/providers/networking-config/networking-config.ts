import { Injectable } from '@angular/core';
import { Config } from '../../config';
import { Coin } from '../../models/Coin';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkingConfigProvider {

  serverURL: string = 'https://api.coinmarketcap.com/v1';  
  ticker: string = '/ticker';

  constructor () { }

  tickerUrl(): string {
    return this.serverURL + this.ticker;
  }

}
