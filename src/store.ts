import { createSlice, configureStore } from "@reduxjs/toolkit";
import { lightTheme } from "./Themes";

const themeStore  = createSlice({
    name: "theme",
    initialState: {
        theme: lightTheme 
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const store = configureStore({
    reducer: {
        theme: themeStore.reducer
    }
});

export const setTheme = themeStore.actions.setTheme;