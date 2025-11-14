import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import leadsReducer from '../features/leads/leadsSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer,
    activities: activitiesReducer,
    notifications: notificationsReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;