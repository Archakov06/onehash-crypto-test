export type TCoin = {
  name: string;
  fullName: string;
  imageUrl: string;
  price: number;
  volume24Hour: number;
};

export type TCoinDiff = { [key: string]: string };

export type TSelectedCoin = {
  name: string;
  price: number;
};
