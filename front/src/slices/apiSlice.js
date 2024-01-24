import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl:'http://localhost:3002'});
export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(bulder)=>({})
})