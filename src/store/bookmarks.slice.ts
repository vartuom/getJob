import { createSlice } from "@reduxjs/toolkit";
import { VacancyElement } from "../types/types";

interface IInitialState {
    bookmarks: VacancyElement[];
}

const initialState: IInitialState = {
    bookmarks: [],
};

export const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        addBookmark(state, action) {
            state.bookmarks.push(action.payload);
        },
        removeBookmark(state, action) {
            state.bookmarks = state.bookmarks.filter(
                (bookmark) => bookmark.vacancy.id !== action.payload.vacancy.id
            );
        },
    },
});
export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;