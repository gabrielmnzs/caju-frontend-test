import React, { ReactNode } from 'react';

import { LoaderProvider } from './loader';
import { ModalProvider } from './modal';
import ConfirmationModal from '~/components/ModalConfirmation';

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <LoaderProvider>
    <ModalProvider>
      {children}
      <ConfirmationModal />
    </ModalProvider>
  </LoaderProvider>
);

export default AppProvider;
