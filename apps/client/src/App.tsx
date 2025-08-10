import { cn } from "@packages/ui";

import { useRNMessage } from "./hooks/use-RN-message";
import AppProvider from "./provider";
import AppRouter from "./router/app-router";

import "./App.css";

function App() {
  // TODO: RN 메시지 수신 hook 분리
  // RN 메시지 수신 훅 사용
  const { insets } = useRNMessage();

  return (
    <AppProvider>
      <main
        className={cn("h-screen w-screen flex flex-col")}
        style={{
          margin: `${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px`,
        }}
      >
        <AppRouter />
      </main>
    </AppProvider>
  );
}

export default App;
