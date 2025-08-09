import { useState } from "react";
import { to6DigitHash } from "@packages/shared";
import { AppBar } from "@packages/ui";

import "./App.css";

function App() {
  const [hashValue, setHashValue] = useState<string | undefined>(undefined);

  return (
    <main className="h-screen w-screen flex flex-col">
      <AppBar title="Hash Generator" />
      <div className="flex flex-col items-center gap-10">
        <label htmlFor="hashValue">Hash Value:</label>
        <input type="text" id="hashValue" value={hashValue} onChange={(e) => setHashValue(e.target.value)} className="w-full p-2" />
        <div className="w-full h-100px" style={{ backgroundColor: `#${to6DigitHash(hashValue ?? "")}` }}></div>
        <p>{to6DigitHash(hashValue ?? "")}</p>
      </div>
    </main>
  );
}

export default App;
