import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./common/commonSlice";

export const store = configureStore({
    reducer: {
        sdata: commonSlice
    }
})