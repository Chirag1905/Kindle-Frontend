'use client';

import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import { useState } from "react";
import '@ant-design/v5-patch-for-react-19';

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const [rehydrated, setRehydrated] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        // loading={<Loader />}
        onBeforeLift={() => setRehydrated(true)}
      >
        <Toaster position="top-right" />
        {/* <PrivateRoute> */}
        {rehydrated ? children : null}
        {/* </PrivateRoute> */}
      </PersistGate>
    </Provider>
  );
}