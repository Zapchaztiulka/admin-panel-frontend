import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    notifications: [],
  }

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (
            state,
            { payload }
          ) => {
            const notification = {
              id: (new Date()).toISOString(),
              ...payload,
            }
            state.notifications.push(notification)
          },

          dismissNotification: (
            state,
            { payload }
          ) => {
            const index = state.notifications.findIndex(
              (notification) => notification.id === payload
            )

            if (index !== -1) {
              state.notifications.splice(index, 1)
            }
          },
    },
  })
  const { actions } = notificationsSlice


export const { addNotification, dismissNotification } = actions


const selectNotifications = (state) =>
  state.notifications.notifications

export const useNotifications = () => useSelector(selectNotifications)


export const notificationsReducer = notificationsSlice.reducer;