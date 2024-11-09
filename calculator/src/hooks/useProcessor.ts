import { useState } from "react";
import { KeyType } from "../components/KeyButton";
import { DEFAULT_STATE } from "src/Constants";
export function useProcessor() {
  const [result, setResult] = useState<number>(DEFAULT_STATE.result);
  const [buffer, setBuffer] = useState<string>(DEFAULT_STATE.buffer);
  const [display, setDisplay] = useState<string>(DEFAULT_STATE.display);
  const [pendingOp, setPendingOp] = useState<string>(DEFAULT_STATE.pendingOp);

  const processKey = (type: KeyType, valueOrOp: string | number) => {
    if (type === "cmd") {
      switch (valueOrOp) {
        case "~":
          setResult(parseFloat(buffer || "0"));
          break;
        case "=":
          break;
        case "+/-": {
          if (result === 0) {
            const val = -1 * parseFloat(buffer || display || "0");
            setResult(val);
            setDisplay(val.toString());
          } else {
            setResult((r) => {
              const val = -1 * r;
              setDisplay(val.toString());
              return val;
            });
          }
          setPendingOp(DEFAULT_STATE.pendingOp);
          return;
        }
        case "%":
          setResult((r) => r % parseFloat(buffer || display || "1"));
          break;
        case "+":
          setResult((r) => r + parseFloat(buffer || display || "0"));
          break;
        case "-":
          setResult((r) => r - parseFloat(buffer || display || "0"));
          break;
        case "÷": {
          const denominator = parseFloat(buffer || display || "0");
          if (result === 0) {
            setResult(parseFloat(buffer || display || "0"));
          } else {
            setResult((r) => r / denominator);
          }
          break;
        }
        case "*": {
          const denominator = parseFloat(buffer || display || "1") ?? 1;

          setResult((r) => {
            return (r || 1) * denominator;
          });
          break;
        }
        default:
          throw new Error(`Unknown operator: ${valueOrOp}`);
      }
      setBuffer(DEFAULT_STATE.buffer);
      setDisplay(valueOrOp.toString());

      if (valueOrOp === "=") {
        const total = (0, eval)(
          `${result}${pendingOp.replace("÷", "/")}${buffer}`
        );

        setResult(DEFAULT_STATE.result);
        setBuffer(DEFAULT_STATE.buffer);
        setPendingOp(DEFAULT_STATE.pendingOp);

        if (!isNaN(total)) {
          setDisplay(total.toString());
        } else {
          setDisplay(DEFAULT_STATE.display);
        }
      }
      if (valueOrOp === "~") {
        setResult(DEFAULT_STATE.result);
        setBuffer(DEFAULT_STATE.buffer);
        setPendingOp(DEFAULT_STATE.pendingOp);
        setDisplay(DEFAULT_STATE.display);
      }
      setPendingOp(valueOrOp.toString());
    } else if (type === "value") {
      if (valueOrOp === "." && buffer.includes(".")) {
        return;
      }
      // Add Values to buffer
      if (pendingOp === "=") {
        setPendingOp(DEFAULT_STATE.pendingOp);
      }
      if (!buffer) {
        setDisplay(valueOrOp.toString());
        setBuffer(valueOrOp.toString());
      } else {
        setDisplay(`${buffer}${valueOrOp}`);
        setBuffer(`${buffer}${valueOrOp}`);
      }
    }
  };

  return { result, buffer, display, pendingOp, processKey };
}
