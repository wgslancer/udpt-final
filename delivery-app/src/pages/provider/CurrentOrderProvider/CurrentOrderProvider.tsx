import { createContext, useContext } from "react";

interface CurrentOrderContextInterface {}

const CurrentOrderContext = createContext<CurrentOrderContextInterface | null>(
  null
);

interface CurrentOrderProviderProps {
  children: React.ReactNode;
}

const CurrentOrderProvider = ({ children }: CurrentOrderProviderProps) => {
  const value: CurrentOrderContextInterface = {};

  return (
    <CurrentOrderContext.Provider value={value}>
      {children}
    </CurrentOrderContext.Provider>
  );
};

export const useCurrentOrderContext = () => {
  const context = useContext(CurrentOrderContext);

  if (!context)
    throw Error(
      "useCurrentOrderContext need to be using in CurrentOrderProvider"
    );

  return context;
};

export default CurrentOrderProvider;
