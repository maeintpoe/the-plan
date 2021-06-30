import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planId: null,
  planName: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPlanInfo: (state, action) => {
      state.planId = action.payload.planId;
      state.planName = action.payload.planName;
    },
    resetPlanInfo: (state) => {
      state.planId = null;
      state.planName = null;
    }
  },

});

export const { setPlanInfo, resetPlanInfo } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlanId = (state) => state.app.planId;
export const selectPlanName = (state) => state.app.planName;


export default appSlice.reducer;
