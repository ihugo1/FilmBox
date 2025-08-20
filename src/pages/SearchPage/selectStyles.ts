import { StylesConfig } from "react-select";

interface SelectOption {
  value: string | number;
  label: string;
}

export const selectStyles: StylesConfig<SelectOption, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    border: state.isFocused ? "1px solid #4d4d4d" : "1px solid #333",
    boxShadow: state.isFocused ? "0 0 0 1px #4d4d4d" : "none",
    "&:hover": {
      borderColor: "#4d4d4d",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4d4d4d"
      : state.isFocused
      ? "#333"
      : "#1a1a1a",
    color: "#fff",
    "&:active": {
      backgroundColor: "#4d4d4d",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#a0a0a0",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
