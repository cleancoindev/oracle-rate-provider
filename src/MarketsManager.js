const Binance = require('./markets/Binance.js');
const Uniswap = require('./markets/Uniswap.js');
const HuobiPro = require('./markets/HuobiPro.js');
const Bittrex = require('./markets/Bittrex.js');
const Upbit = require('./markets/Upbit.js');
const HitBTC = require('./markets/HitBTC.js');

module.exports = class MarketsManager {
  constructor(w3) {
    this.w3 = w3;

    this.markets = [];
  }

  async init() {
    this.markets['binance'] = new Binance(this.w3, 'binance');
    this.markets['uniswap'] = await new Uniswap(this.w3).init();
    this.markets['huobipro'] = await new HuobiPro(this.w3, 'huobipro');
    this.markets['bittrex'] = await new Bittrex(this.w3, 'bittrex');
    this.markets['upbit'] = await new Upbit(this.w3, 'upbit');
    this.markets['hitbtc'] = await new HitBTC(this.w3, 'hitbtc');

    return this;
  }

  bn (number) {
    return new this.w3.utils.BN(number);
  }

  async getRate(data) {
    let rate;
    try {
      rate = await this.markets[data.exchangeId].getRate(data.currency);
    } catch(e) {
      console.log('Error message: ' + e.message);
    }

    return rate;
  }
};