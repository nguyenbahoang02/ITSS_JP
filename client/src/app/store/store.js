import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './apiService';
import { tabSliceReducer } from 'Features/Admin/tabSlice';
const rootReducer = {
    [apiService.reducerPath]: apiService.reducer,
    tab: tabSliceReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
