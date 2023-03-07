import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import adsSlice from './slices/adsSlice';

export const store = configureStore({
    reducer: {
        adsSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();