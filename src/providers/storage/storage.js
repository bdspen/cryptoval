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
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
export var Stores;
(function (Stores) {
    Stores["coinResource"] = "coinResource";
    Stores["watched"] = "watched";
})(Stores || (Stores = {}));
;
var StorageProvider = /** @class */ (function () {
    function StorageProvider(storage) {
        this.storage = storage;
    }
    StorageProvider.prototype.setWatchedCoins = function (value) {
        return this.storage.set(Stores.watched, value);
    };
    StorageProvider.prototype.clearAllData = function () {
        this.storage.clear();
    };
    StorageProvider.prototype.getWatchedCoinsAndSync = function () {
        var _this = this;
        Promise.all([
            this.getWatchedCoins(),
            this.getCoinResource()
        ])
            .then(function (results) {
            var updatedCoins = _this.updateSelectedCoins.apply(_this, results);
            _this.setWatchedCoins(updatedCoins);
        });
    };
    StorageProvider.prototype.hasData = function (store) {
        this.storage.keys()
            .then(function (keys) {
            console.log(keys);
        });
    };
    StorageProvider.prototype.getWatchedCoins = function () {
        return this.storage.get(Stores.watched);
    };
    StorageProvider.prototype.setCoinResource = function (value) {
        return this.storage.set(Stores.coinResource, value);
    };
    StorageProvider.prototype.getCoinResource = function () {
        return this.storage.get(Stores.coinResource);
    };
    StorageProvider.prototype.updateSelectedCoins = function (coins, resource) {
        coins.forEach(function (coin, i) {
            resource.forEach(function (resourceCoin, j) {
                if (coin.id === resourceCoin.id) {
                    coins[i] = Object.assign(coins[i], resource[j]);
                }
            });
        });
        return coins;
    };
    StorageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], StorageProvider);
    return StorageProvider;
}());
export { StorageProvider };
//# sourceMappingURL=storage.js.map