import { cn } from "@packages/ui";

import { useRNMessage } from "./hooks/use-RN-message";
import AppProvider from "./provider";
import AppRouter from "./router/app-router";
import useSafeAreaStore from "./store/safearea.store";

import "./App.css";

function App() {
  useRNMessage();

  const { insets } = useSafeAreaStore();

  return (
    <AppProvider>
      <main
        className={cn("h-screen w-screen flex flex-col")}
        style={{
          margin: `$0px ${insets.right}px ${insets.bottom}px ${insets.left}px`,
        }}
      >
        <AppRouter />
      </main>
    </AppProvider>
  );
}

export default App;
