import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
    name: 'tab',
    initialState: { tab: '' },
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload;
        },
    },
});

export const { setTab } = tabSlice.actions;
export const tabSliceReducer = tabSlice.reducer;
