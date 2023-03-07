import { AdvertModel, ResoponseModel } from './../../models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export const getAds = createAsyncThunk(
    'adverts/fetchAds',
    async (page: number) => {
        const response: AxiosResponse<ResoponseModel, void> = await axios.get(`https://testguru.ru/frontend-test/api/v1/ads?page=${page}`)
        return response
    }
)

export interface CounterState {
    adverts: AdvertModel[];
    statuses: 'FULFILLED' | 'PENDING' | 'REJECTED' | '';
    paginate: {
        page: number;
        pages: number | null;
    }
}

const initialState: CounterState = {
    adverts: [],
    statuses: '',
    paginate: {
        page: 1,
        pages: null
    }
}

export const adsSlice = createSlice({
    name: 'adsSlice',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.paginate.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAds.fulfilled, (state, action) => {
            state.statuses = 'FULFILLED'
            state.adverts.push(...action.payload.data.items)
            state.paginate.page = action.payload.data.page
            state.paginate.pages = action.payload.data.pages
        })
        builder.addCase(getAds.pending, (state, action) => {
            state.statuses = 'PENDING'
        })
        builder.addCase(getAds.rejected, (state, action) => {
            state.statuses = 'REJECTED'
        })
    },
})

export const { setCurrentPage } = adsSlice.actions

export default adsSlice.reducer