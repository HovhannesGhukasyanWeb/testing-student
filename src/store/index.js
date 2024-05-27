import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: "testing-student",
    storage,
    whitelist: [/* here goes all reducers that you want to persist */],
};

const rootReducer = combineReducers({
    // here goes all reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk],
});

export const persistor = persistStore(store);
