import { observable, computed, action } from 'mobx';
import { TCoin, TSelectedCoin } from '../types';

class ConverterStore {
  @observable private selectedCoin: TSelectedCoin = {
    name: '',
    price: 0,
  };

  @computed
  get getSelectedCoin() {
    return this.selectedCoin;
  }

  @action
  setSelectedCoin(coin: TCoin) {
    this.selectedCoin = {
      name: coin.name,
      price: coin.price,
    };
  }
}

export default ConverterStore;
