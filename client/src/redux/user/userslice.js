import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState, // Corrected: Use 'initialState' with a capital 'S'
    reducers:{
        signinstart: (state)=>{
            state.loading = true;
        },
        signinsuccess: (state, action)=>{
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinfailure: (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateuserstart: (state) => {
            state.loading = true;
          },
          updateusersuccess: (state, action) => {
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateuserfailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          deleteuserstart: (state) => {
            state.loading = true;
          },
          deleteusersuccess: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = null;
          },
          deleteuserfailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          signoutuserstart: (state) => {
            state.loading = true;
          },
          signoutusersuccess: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = null;
          },
          signoutuserfailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
    }
});

// We need to export both the reducer and the reducer functions in order to use them to update and fetch the store
export const { signinstart, signinfailure, signinsuccess, updateuserfailure,
    updateusersuccess,
    updateuserstart, deleteuserfailure,
    deleteusersuccess,
    deleteuserstart,
    signoutuserfailure,
    signoutusersuccess,
    signoutuserstart,} = userSlice.actions;
export default userSlice.reducer;

// When we are done making the slice, we need to add this slice in the store in order to use the reducers of the slice
