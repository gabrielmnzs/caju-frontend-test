import React, { useContext, createContext, useState, ReactNode } from 'react';

import { Loader } from '~/components/Loader';

interface LoaderContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextProps => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }

  return context;
};
