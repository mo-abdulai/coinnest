import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryproApiHeaders = {
  "x-access-token": process.env.REACT_APP_RAPIDAPI_KEY,
};

// const baseUrl = "https://coinranking1.p.rapidapi.com";
const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({ url, headers: cryproApiHeaders });
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),

    
    getCryptoExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});
export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery } = cryptoApi;
