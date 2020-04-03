import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    cryptoInputBox: {
      marginBottom: 20,
      marginTop: 20,
    },
    currencyInput: {
      minWidth: 'calc(70% - 10px)',
      marginRight: 10,
    },
    currencyType: {
      minWidth: '30%',
    },
    table: {
      minWidth: 650,
    },
    currencyIcon: {
      width: 18,
      height: 18,
      borderRadius: 30,
    },
    redColumn: {
      backgroundColor: '#d8ffc4',
    },
    greenColumn: {
      backgroundColor: '#ffdada',
    },
    rowCurrency: {
      cursor: 'pointer',
    },
  }),
);

export default useStyles;
