import { useState } from "react";
import { to6DigitHash } from "@packages/shared";

import "./App.css";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  colorBox: {
    width: "100%",
    height: "100px",
  },
};

function App() {
  const [hashValue, setHashValue] = useState<string | undefined>(undefined);

  return (
    <>
      <div style={styles.container}>
        <label htmlFor="hashValue">Hash Value:</label>
        <input type="text" value={hashValue} onChange={(e) => setHashValue(e.target.value)} style={styles.input} />
        <div style={{ ...styles.colorBox, backgroundColor: `#${to6DigitHash(hashValue ?? "")}` }}></div>
        <p>{to6DigitHash(hashValue ?? "")}</p>
      </div>
    </>
  );
}

export default App;
