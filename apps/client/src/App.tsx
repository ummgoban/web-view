import { useRNMessage } from "./hooks/use-RN-message";
import { Page } from "./Page";
import AppProvider from "./provider";

import "./App.css";

function App() {
  // React Native 메시지를 수신하는 훅
  useRNMessage();

  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

export default App;
