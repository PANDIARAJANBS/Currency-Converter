import axios from "axios";

const BASE = "https://api.exchangerate-api.com/v4/latest/";
const NAMES = "https://openexchangerates.org/api/currencies.json";
export const fetchRates = async (base) => {
  const r = await axios.get(`${BASE}${base}`);
  return r.data;
};
export const fetchCurrencyNames = async () => {
  const r = await axios.get(NAMES);
  return r.data;
};
