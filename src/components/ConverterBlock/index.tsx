import React from 'react';
import { observer, inject } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import CurrenciesStore from '../../stores/currenciesStore';
import ConverterStore from '../../stores/converterStore';
import { TSelectedCoin } from '../../types';

type IConverterBlock = {
  classes: any;
  currenciesStore?: CurrenciesStore;
  converterStore?: ConverterStore;
};

type TReducerState = {
  value1: string;
  value2: string;
  inPrice: number;
  outPrice: number;
};

type TSetValue1Action = {
  type: string;
  payload: string;
};

type TAction = TSetValue1Action;

function reducer(state: TReducerState, action: any): TReducerState {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        value2: String((Number(action.payload.value) * state.inPrice) / state.outPrice),
      };

    case 'SET_PRICES':
      return {
        ...state,
        inPrice: action.payload.in,
        outPrice: action.payload.out,
      };

    default:
      return state;
  }
}

const ConverterBlock: React.FC<IConverterBlock> = inject(
  'currenciesStore',
  'converterStore',
)(
  observer(({ classes, currenciesStore, converterStore }) => {
    const [selectedOutCoin, setSelectedOutCoin] = React.useState('USD');
    const coins: string[] = currenciesStore!.getItems.map(coin => coin.name);
    const inPrice = Number(converterStore?.getSelectedCoin.price) || 0;
    const outPrice =
      Number(currenciesStore!.getItems.find(obj => obj.name === selectedOutCoin)?.price) || 0;
    const [state, dispatch] = React.useReducer(reducer, {
      value1: '',
      value2: '',
      inPrice,
      outPrice,
    });

    React.useEffect(() => {
      dispatch({
        type: 'SET_PRICES',
        payload: {
          in: inPrice,
          out: outPrice,
        },
      });
    }, [inPrice, outPrice]);

    const onUpdateField = (name: string, value: string) => {
      dispatch({
        type: 'SET_VALUE',
        payload: {
          name,
          value,
        },
      });
    };

    return (
      <Paper className={classes.paper}>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
            <TextField
              type="number"
              value={state.value1}
              onChange={(e: any) => onUpdateField('value1', e.target.value)}
              label="Сумма"
            />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Валюта
            </InputLabel>
            <Select value={converterStore?.getSelectedCoin.name || ''}>
              {coins.map(name => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
            <TextField type="number" value={state.value2} label="Сумма" />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Валюта
            </InputLabel>
            <Select
              onChange={e => setSelectedOutCoin(e.target.value as string)}
              value={selectedOutCoin}>
              <MenuItem value="USD">USD</MenuItem>
              {coins.map(name => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Paper>
    );
  }),
);

export default ConverterBlock;
