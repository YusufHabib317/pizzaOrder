import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAddress } from './../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
// }

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  const positionObj = await getPosition();

  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});

const initialState = {
  username: '',
  status: 'idle',
  userPosition: {},
  userAddress: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userAddress = action.payload.address;
        state.userPosition = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address, Make sure to fill this field';
      }),
});

export const { updateName } = userSlice.actions;

export const username = (state) => state.user.username;

export default userSlice.reducer;
