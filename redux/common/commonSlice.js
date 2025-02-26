import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: 1,
    data: 1,
    entities: []
}

export const commonSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setudata: (state, action) => {
       
            state.entities= action .payload
        }
    },
    
});
export const { increment, decrement, setudata } = commonSlice.actions;
export default commonSlice.reducer;