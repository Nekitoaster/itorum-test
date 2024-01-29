import { configureStore } from "@reduxjs/toolkit";
import { comicsApi } from "./comics/comicsApi";

export const store = configureStore({
  reducer: {
    [comicsApi.reducerPath]: comicsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(comicsApi.middleware),
});
