import ConverterStore from './converterStore';
import CurrenciesStore from './currenciesStore';

const stores = {
  converterStore: new ConverterStore(),
  currenciesStore: new CurrenciesStore(),
};

export default stores;
