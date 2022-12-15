import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  type: "success" | "error" | "info";
  message: string;
}

export const notificationStore = createSlice({
  name: "notifications",
  initialState: {
    notifications: [] as Notification[],
  },
  reducers: {
    addSuccessNotification: (state, action: PayloadAction<string>) => {
      state.notifications = [
        {
          message: action.payload,
          type: "success",
        },
        ...state.notifications,
      ];
    },
    addErrorNotification: (state, action: PayloadAction<string>) => {
      state.notifications = [
        {
          message: action.payload,
          type: "error",
        },
        ...state.notifications,
      ];
    },
    closeNotification: (state) => {
      state.notifications = state.notifications.slice(1);
    },
    clear: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  closeNotification,
  addSuccessNotification,
  addErrorNotification,
  clear,
} = notificationStore.actions;

export default notificationStore.reducer;
