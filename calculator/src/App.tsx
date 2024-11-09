import { Window, View, Text } from "@vixen-js/core-react";
import { QIcon, QKeyEvent } from "@vixen-js/core";
import styles from "./assets/styles/styles.css?raw";
import vixenLogo from "./assets/images/Logo.png";
import { Keyboard } from "./Constants";
import { KeyButton } from "./components/KeyButton";
import { useMemo } from "react";
import { useProcessor } from "./hooks/useProcessor";

const App = () => {
  const { display, processKey } = useProcessor();

  const handleKeyRelease = (evt: any) => {
    const keyEvt = new QKeyEvent(evt);
    const text = keyEvt.text().replace("/", "÷");
    const isNumberOrDot = Number.isInteger(+text) || text === ".";

    const isCommand = Keyboard.some(
      ({ type, value }) => type === "cmd" && value === text
    );
    if (isNumberOrDot) {
      processKey("value", text);
    } else if (isCommand) {
      processKey("cmd", text.replace("AC", "~"));
    }
  };

  const getBestSize = useMemo((): string => {
    const size = Math.min(50, 350 / display.length);
    return `font-size: ${Math.round(size)}px;`;
  }, [display]);

  return (
    <Window
      styleSheet={styles}
      size={{ width: 230, height: 300 }}
      windowTitle="Calculator"
      windowIcon={new QIcon(vixenLogo)}
      OnKeyRelease={handleKeyRelease}
    >
      <View id="root">
        <Text id="inputBox" style={getBestSize}>
          {display}
        </Text>
        {Keyboard.map(({ value, type, isBig, textValue }, idx) => (
          <KeyButton
            key={`Key_${type}_${idx}`}
            label={value}
            value={value}
            type={type}
            isBig={isBig}
            textValue={textValue}
            onClick={(type, value) =>
              processKey(type, value.toString().replace("AC", "~"))
            }
          />
        ))}
      </View>
    </Window>
  );
};

export default App;
