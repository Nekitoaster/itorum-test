import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const comicsApi = createApi({
  reducerPath: "comicsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://gateway.marvel.com/v1/public`,
  }),
  endpoints: (build) => ({
    getComics: build.query({
      query: () =>
        `comics?ts=1&apikey=bd41e0bc5d6687b99b5ea452ad6e3ec7&hash=301541fbc6e3fe5a511fdba3afdb1244`,
    }),
  }),
});

export const { useGetComicsQuery } = comicsApi;
