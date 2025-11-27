import React, { useEffect, useMemo, useRef, useState } from "react";
interface Option {
  code: string;
  name: string;
  flag: string;
}
interface Props {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}
const Dropdown: React.FC<Props> = ({ options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [loadDelay, setLoadDelay] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setLoadDelay(query.trim()), 150);
    return () => clearTimeout(id);
  }, [query]);
  const selectedOption = useMemo(
    () => options.find((o) => o.code === selected),
    [options, selected]
  );
  const filtered = useMemo(() => {
    const q = loadDelay.toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.code.toLowerCase().includes(q) || o.name.toLowerCase().includes(q)
    );
  }, [loadDelay, options]);
  useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);
  const handleSelect = (code: string) => {
    onSelect(code);
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.blur();
  };

  return (
    <div className="combo">
      <div className="combo__inputWrap">
        <div className="combo__selected">
          {!open && selectedOption && (
            <>
              {selectedOption?.flag && (
                <img src={selectedOption.flag} alt="" className="combo__flag" />
              )}

              <span>{selectedOption.code}</span>
              <span className="currency-name">{selectedOption.name}</span>
            </>
          )}
        </div>
        <input
          ref={inputRef}
          className="combo__input"
          type="text"
          value={open ? query : ""}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
          placeholder="Select Currency"
        />
        <button
          type="button"
          className="combo__toggle"
          onClick={() => setOpen(!open)}
        >
          ▾
        </button>
      </div>
      {open && (
        <ul ref={listRef} className="combo__list">
          {filtered.length === 0 ? (
            <li className="no-results">No records found</li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={opt.code}
                className={`combo__item ${i === activeIndex ? "active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt.code)}
              >
                <img src={opt.flag} alt="" />
                <span>{opt.code}</span>
                <span className="currency-name">{opt.name}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
