import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import websocketService from '../services/websocket';
import { addNotification } from '../features/notifications/notificationsSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const socket = websocketService.connect(token);

      socket.on('notification', (notification) => {
        dispatch(addNotification(notification));
      });

      socket.on('lead:updated', (data) => {
        console.log('Lead updated:', data);
      });

      socket.on('activity:created', (data) => {
        console.log('Activity created:', data);
      });

      return () => {
        websocketService.disconnect();
      };
    }
  }, [token, dispatch]);

  return websocketService;
};