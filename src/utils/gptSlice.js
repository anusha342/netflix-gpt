import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    error: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
      state.movieNames = null;
      state.movieResults = null;
      state.error = null;
    },
    addGptMovieResult: (state, action) => {
      state.movieNames = action.payload.movieNames;
      state.movieResults = action.payload.movieResults;
      state.error = null;
    },
    setGptError: (state, action) => {
      state.error = action.payload;
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const {
  toggleGptSearchView,
  addGptMovieResult,
  setGptError,
} = gptSlice.actions;

export default gptSlice.reducer;
