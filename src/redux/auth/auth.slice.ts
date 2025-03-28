import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
    user: String | null,
    isAuthenticated: boolean,
    isInitialized: boolean,
}

const initialState : AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<String>) => {
            state.user = action.payload;
            console.log("setUser", action.payload);
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        },
        logout: (state: AuthStateType) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = false;
        }
    }
})

export const {  setInitialize, setUser, logout } = authSlice.actions

export default authSlice.reducer