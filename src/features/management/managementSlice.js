import { createSlice } from "@reduxjs/toolkit";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import BuildIcon from "@mui/icons-material/Build";

const initialState = {
  sideMenuItems: [
    {
      label: "Access Management",
      icon: <PictureInPictureIcon />,
      panel: "panel1",
      path: "access-management",
      subMenuItems: [
        {
          path: "day-time-frame",
          label: "Day Time Frame",
          mainHeading: "Day Time Frame Setting",
          addFormHeading: "Day Time Frame",
        },
        {
          path: "week-time-frame",
          label: "Week Time Frame",
          mainHeading: "Week Time Frame Setting",
          addFormHeading: "Week Time Frame",
        },
        {
          path: "access-permission",
          label: "Access Permission",
          mainHeading: "Permission Assignment",
        },
        {
          path: "realtime-monitoring",
          label: "Realtime Monitoring",
          mainHeading: "Realtime Monitoring",
        },
        {
          path: "access-record",
          label: "Access Record",
          mainHeading: "Access Record",
        },
        {
          path: "door-status-record",
          label: "Door Status Record",
          mainHeading: "Door Status Record",
        },
        {
          path: "group-management",
          label: "Group Management",
          mainHeading: "Group Management",
          addFormHeading: "New Group",
        },
      ],
      dayTimeFrames: [
        {
          id: 1,
          startingTime: null,
          endingTime: null,
        },
      ],
    },
    {
      label: "System Settings",
      icon: <BuildIcon />,
      panel: "panel2",
      path: "system-settings",
      subMenuItems: [
        {
          path: "device-management",
          label: "Device Management",
          mainHeading: "Device Management",
          addFormHeading: "Device",
        },
        {
          path: "upper-department",
          label: "Upper Department",
          mainHeading: "Upper Department",
          addFormHeading: "Upper Department",
        },
        {
          path: "user-account",
          label: "User Account",
          mainHeading: "User Account",
          addFormHeading: "User Account",
        },
      ],
    },
  ],
};

export const managementSlice = createSlice({
  name: "management",
  initialState,
  reducers: {
    // increment: (state) => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});

// export const { increment, decrement, incrementByAmount } = managementSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default managementSlice.reducer;
