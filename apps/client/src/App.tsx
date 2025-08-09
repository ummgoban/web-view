import AppRouter from "./router/app-router";

import "./App.css";
import AppProvider from "./provider";

function App() {
  return (
    <AppProvider>
      <main className="h-screen w-screen flex flex-col">
        <AppRouter />
      </main>
    </AppProvider>
  );
}

export default App;
