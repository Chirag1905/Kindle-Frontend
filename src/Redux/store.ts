import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import rootReducer, { RootState } from "./rootReducer";
import rootSaga from "./rootSaga";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure persist
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["auth"], // only 'auth' state will be persisted
};

// Create a persisted reducer
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store: ReturnType<typeof configureStore> = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

// Create persistor
export const persistor = persistStore(store);

// Infer types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type { RootState };
