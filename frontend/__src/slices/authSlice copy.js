import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      // state.loading = false;
      // state.error = null;
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      // state.loading = false;
      // state.error = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

// // Login user
// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch(setLoading());
//     const response = await axios.post('/api/user/login', { email, password });
    
//     // If login is successful, generate token is handled by backend with cookie
//     if (response.status === 200) {
//       // Assuming user data is included, but if not, empty object is OK
//       dispatch(setCredentials(response.data || {}));
//     }
//   } catch (error) {
//     dispatch(setError(error.response?.data?.msg || 'Failed to login'));
//   }
// };

// // Register user
// export const register = (name, email, password, confPassword) => async () => {
//   e.preventDefault();
//   try {
//     if (password !== confPassword) {
//       return { s: false, msg: "Passwords do not match!" };
//     }
//     if (password.length < 6) {
//       return { s: false, msg: "Password needs to be at least 6 characters long" };
//     }
//     const response = await axios.post('http://localhost:5000/api/user/register', { name, email, password });
//     if (response.status === 200) {
//       return { s: true, msg: response.data.msg };
//     } else {
//       return { s: false, msg: response.data.msg };
//     }
//   } catch (error) {
//     return { s: false, msg: error.response?.data?.msg };
//   }
// };

// // Logout user
// export const logout = () => async (dispatch) => {
//   try {
//     await axios.post('/api/user/logout');
//     dispatch(clearCredentials());
//   } catch (error) {
//     dispatch(setError('Failed to logout'));
//   }
// };

// // Get user profile
// export const getUserProfile = () => async (dispatch, getState) => {
//   try {
//     const { userInfo } = getState().auth;
//     dispatch(setLoading());

//     const response = await axios.get('/api/user/profile', {
//       headers: {
//         Authorization: `Bearer ${userInfo?.token}`,
//       },
//     });

//     if (response.status === 200) {
//       dispatch(setCredentials(response.data)); // Updating the user info
//     }
//   } catch (error) {
//     dispatch(setError(error.response?.data?.msg || 'Failed to fetch profile'));
//   }
// };

// // Update user profile
// export const updateUserProfile = (updatedData) => async (dispatch, getState) => {
//   try {
//     const { userInfo } = getState().auth;
//     dispatch(setLoading());

//     const response = await axios.put('/api/user/profile', updatedData, {
//       headers: {
//         Authorization: `Bearer ${userInfo?.token}`,
//       },
//     });

//     if (response.status === 200) {
//       dispatch(setCredentials(response.data));
//     }
//   } catch (error) {
//     dispatch(setError(error.response?.data?.msg || 'Failed to update profile'));
//   }
// };

export default authSlice.reducer;
