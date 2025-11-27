import React, { useEffect, useState, useMemo } from "react";
import { fetchRates, fetchCurrencyNames } from "../services/api";
import { isValidNumber } from "../utils/validation";
import Dropdown from "../components/Dropdown";
import Timer from "../components/Timer";
interface CurrencyOption {
  code: string;
  name: string;
  flag: string;
}
const Converter: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeError, setTypeError] = useState("");

  useEffect(() => {
    console.log(error, "kljasna");
  }, [error]);

  useEffect(() => {
    setResult(null);
    setShowTimer(false);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    (async () => {
      const names = await fetchCurrencyNames();
      const list = Object.keys(names).map((code) => ({
        code,
        name: names[code],
        flag: `https://flagcdn.com/24x18/${code.slice(0, 2).toLowerCase()}.png`,
      }));
      setCurrencies(list);
    })();
  }, []);
  const canConvert = useMemo(
    () =>
      amount.trim() !== "" &&
      isValidNumber(amount) &&
      !!fromCurrency &&
      !!toCurrency,
    [amount, fromCurrency, toCurrency]
  );
  const handleConvert = async (
    base: string = fromCurrency,
    target: string = toCurrency
  ) => {
    if (!isValidNumber(amount)) {
      setError(`${amount} Please Enter a valid Amount`);
      return;
    }
    console.log(base, "skldnlsa", target);
    if (!base || !target) {
      setError("Please select both currencies");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await fetchRates(base);
      const rate = data.rates?.[target];
      if (!rate) {
        setError("Rate not available");
        setLoading(false);
        return;
      }
      const value = parseFloat(amount) * rate;
      setResult(Number.isFinite(value) ? value : null);
      setShowTimer(true);
    } catch (e) {
      setError("Network error while converting");
    } finally {
      setLoading(false);
    }
  };
  const handleSwitch = () => {
    const newFrom = toCurrency;
    const newTo = fromCurrency;
    setFromCurrency(newFrom);
    setToCurrency(newTo);
    if (amount.trim() !== "" && isValidNumber(amount) && newFrom && newTo) {
      handleConvert(newFrom, newTo);
    }
  };

  return (
    <section className="panel">
      <div className="input-row" style={{ gridTemplateColumns: "1fr" }}>
        <input
          className="input"
          type="text"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            setAmount(value);
            const regex = /^\d+(\.\d+)?$/;
            if (value && !regex.test(value)) {
              setError("Invalid Amount Format");
            } else {
              setError("");
            }
          }}
          placeholder="Enter the Amount"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="input-row">
        <h3 className="currencyHead">From</h3>
        <Dropdown
          options={currencies}
          selected={fromCurrency}
          onSelect={setFromCurrency}
        />

        <h3 className="currencyHead">To</h3>
        <Dropdown
          options={currencies}
          selected={toCurrency}
          onSelect={setToCurrency}
        />

        <button onClick={handleSwitch} className="switchBtn">
          ⇄
        </button>
      </div>
      <button
        className="convertBtn"
        onClick={() => handleConvert()}
        disabled={loading}
      >
        {loading ? "Converting…" : "Convert"}
      </button>

      {result !== null && (
        <div className="result">
          <h3 className="currencyHead">Result</h3>
          <div className="Output">
            <p>
              {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
            </p>
            <Timer
              onExpire={() => {
                setResult(null);
                setShowTimer(false);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default Converter;
