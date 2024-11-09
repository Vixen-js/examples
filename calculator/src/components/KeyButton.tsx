import { Button } from "@vixen-js/core-react";
import { KeyItem } from "../Constants";

export type KeyType = "value" | "cmd";

interface KeyButtonProps extends KeyItem {
  label: string;
  onClick: (type: KeyType, value: string | number) => void;
}
export function KeyButton({
  label,
  type,
  value,
  isBig,
  textValue,
  onClick
}: KeyButtonProps) {
  return (
    <Button
      text={label}
      id={`${type === "cmd" ? "CMD" : "Key"}_${textValue}`}
      onClick={() => onClick(type, value)}
      style={isBig ? "width: 115px;" : ""}
    />
  );
}
