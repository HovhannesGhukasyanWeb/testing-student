import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import user from "./slices/user";
import table from "./slices/table";
import selectedAnswers from "./slices/selectedAnswers";

const persistConfig = {
    key: "testing-student",
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user, table, selectedAnswers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk],
});

export const persistor = persistStore(store);
