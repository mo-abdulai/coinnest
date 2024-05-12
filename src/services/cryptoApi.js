import {createApi, fetchBaseQuery }  from '@reduxjs/toolkit/query/react';

const cryproApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryproApiHeaders });
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        
        getCryptoDetails: builder.query({
      query: (coinId ) => createRequest(`/coin/${coinId}`),
    })
    })
});
export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
