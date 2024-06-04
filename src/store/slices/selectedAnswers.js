import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


const selectedAnswers = createSlice({
    name: "selectedAnswers",
    initialState,
    reducers: {
        setSelectedAnswers(state, action) {
            return action.payload;
        }
    }
})

export const { setSelectedAnswers } = selectedAnswers.actions;

export default selectedAnswers.reducer;