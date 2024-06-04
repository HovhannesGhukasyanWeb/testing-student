import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
}


const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            window.location.assign('/login');
        }
    }
})

export const { login, logout } = user.actions;

export default user.reducer;