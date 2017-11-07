var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkingConfigProvider } from '../networking-config/networking-config';
import { Coin } from '../../models/Coin';
import { StorageProvider } from '../storage/storage';
import 'rxjs/add/operator/map';
var NetworkingProvider = /** @class */ (function () {
    function NetworkingProvider(http, config, storageService) {
        this.http = http;
        this.config = config;
        this.storageService = storageService;
    }
    NetworkingProvider.prototype.getCoinList = function () {
        var url = this.config.tickerUrl();
        return this.http.get(url)
            .map(function (res) {
            console.log("getcoinlist");
            console.log(res.json());
            return res.json();
        });
    };
    NetworkingProvider.prototype.requestCoinData = function () {
        var _this = this;
        this.getCoinList().subscribe(function (data) {
            var coins = data.map(function (coin) { return new Coin(coin); });
            console.log(coins);
            _this.storageService.setCoinResource(coins);
        });
    };
    NetworkingProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            NetworkingConfigProvider,
            StorageProvider])
    ], NetworkingProvider);
    return NetworkingProvider;
}());
export { NetworkingProvider };
//# sourceMappingURL=networking.js.map