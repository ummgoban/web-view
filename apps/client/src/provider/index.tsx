import { ReactQueryProvider } from "./react-query.provider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default AppProvider;
