import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser, signOut } from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo,{rejectWithValue}) => { 
    try{
      const response = await checkUser(loginInfo);
      return response.data;
    }
    catch(error)
    {
      console.log(error)
      return rejectWithValue(error)
    }
    
  }
);

// for checkoutpage to add to user
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (loginInfo) => {
    const response = await updateUser(loginInfo);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userData) => {
    const response = await signOut(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser=(state)=>state.auth.loggedInUser
export const selectError=(state)=>state.auth.error

export const { increment} = authSlice.actions;


export default authSlice.reducer;
