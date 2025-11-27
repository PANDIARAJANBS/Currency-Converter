import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dropdown from "../components/Dropdown";

const options = [
  { code: "GBP", name: "British Pound Sterling", flag: null },
  { code: "EUR", name: "Euro", flag: null },
  { code: "USD", name: "United States Dollar", flag: null },
];

test("shows no results when nothing matches", async () => {
  const onSelect = jest.fn();
  render(<Dropdown options={options} selected="GBP" onSelect={onSelect} />);

  fireEvent.click(screen.getByRole("button"));
  const input = screen.getByPlaceholderText("Select Currency");
  fireEvent.change(input, { target: { value: "xyz" } });

  await waitFor(() =>
    expect(screen.getByText(/No records found/i)).toBeInTheDocument()
  );
});
