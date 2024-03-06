import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {isConnected : false , username :''},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		connected : (state, action) => {
			state.value.isConnected = true ,
			state.value.username = action.payload;
		},
		noConnected : (state) => {
			state.value.isConnected = false,
			state.value.username = '';
		}
	},
});

export const { connected, noConnected } = userSlice.actions;
export default userSlice.reducer;
