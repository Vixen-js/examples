import { KeyType } from "./components/KeyButton";

export interface KeyItem {
  value: string;
  textValue: string;
  type: KeyType;
  isBig?: boolean;
}
export const Keyboard: KeyItem[] = [
  { type: "cmd", value: "AC", textValue: "AC" },
  { type: "cmd", value: "+/-", textValue: "PLUS_MINUS" },
  { type: "cmd", value: "%", textValue: "PERCENT" },
  { type: "cmd", value: "÷", textValue: "DIVIDE" },
  { type: "value", value: "7", textValue: "7" },
  { type: "value", value: "8", textValue: "8" },
  { type: "value", value: "9", textValue: "9" },
  { type: "cmd", value: "*", textValue: "MULTIPLY" },
  { type: "value", value: "4", textValue: "4" },
  { type: "value", value: "5", textValue: "5" },
  { type: "value", value: "6", textValue: "6" },
  { type: "cmd", value: "-", textValue: "MINUS" },
  { type: "value", value: "1", textValue: "2" },
  { type: "value", value: "2", textValue: "3" },
  { type: "value", value: "3", textValue: "3" },
  { type: "cmd", value: "+", textValue: "PLUS" },
  { type: "value", value: "0", isBig: true, textValue: "0" },
  { type: "value", value: ".", textValue: "DOT" },
  { type: "cmd", value: "=", textValue: "EQUAL" }
];

export const DEFAULT_STATE = {
  result: 0,
  buffer: "",
  display: "",
  pendingOp: "~"
};
