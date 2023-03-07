import { AdvertModel } from './../../models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export const getAd = createAsyncThunk(
    'adverts/fetchAd',
    async (id: string) => {
        const response: AxiosResponse<AdvertModel, void> = await axios.get(`https://testguru.ru/frontend-test/api/v1/ads/${id}`)
        return response
    }
)

export interface CounterState {
    advert: AdvertModel | null;
    statuses: 'FULFILLED' | 'PENDING' | 'REJECTED' | '';
}

const initialState: CounterState = {
    advert: null,
    statuses: '',
}

export const adsSlice = createSlice({
    name: 'adsSlice',
    initialState,
    reducers: {
        setAdvert: (state, action: PayloadAction<null>) => {
            state.advert = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAd.fulfilled, (state, action) => {
            state.statuses = 'FULFILLED'
            state.advert = action.payload.data
        })
        builder.addCase(getAd.pending, (state) => {
            state.statuses = 'PENDING'
        })
        builder.addCase(getAd.rejected, (state) => {
            state.statuses = 'REJECTED'
        })
    },
})

export const { setAdvert } = adsSlice.actions

export default adsSlice.reducer