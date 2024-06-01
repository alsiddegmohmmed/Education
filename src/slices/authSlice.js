import { createSlice } from "@reduxjs/toolkit";

// Ensure the initial state is defined correctly
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState, // Correctly spelled and used
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload; 
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null; 
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions; 
export default authSlice.reducer;
   