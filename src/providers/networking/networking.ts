import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkingConfigProvider } from '../networking-config/networking-config';
import { Observable } from 'rxjs/Observable';
import { Coin } from '../../models/Coin';
import { StorageProvider } from '../storage/storage';
import { TickerResponseCoin } from '../../models/apiResponses';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkingProvider {

  constructor(
    private http: Http,
    private config: NetworkingConfigProvider,
    private storageService: StorageProvider
  ) {}

  private getCoinList(): Observable<TickerResponseCoin[]> {
    const url = this.config.tickerUrl();
    return this.http.get(url)
      .map(res => {
        console.log("getcoinlistVVVV")        
        console.log(res.json())
        return res.json() as TickerResponseCoin[]
      });
  }

  requestCoinData(): void {
    this.getCoinList().subscribe(data => {
      const coins: Coin[] = data.map((coin: TickerResponseCoin): Coin => new Coin(coin));
      console.log("coinlist from request...saving to storage....");
      console.log(coins);
      this.storageService.setCoinResource(coins);
    });
  }

}
