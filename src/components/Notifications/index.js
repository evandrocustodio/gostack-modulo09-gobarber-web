import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

import api from '../../services/api';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => Boolean(notifications.find(n => n.read === false)),
    [notifications]
  );

  useEffect(() => {
    async function carregar() {
      const response = await api.get('notifications');
      const data = response.data.map(n => ({
        ...n,
        timeDistance: formatDistance(parseISO(n.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));
      setNotifications(data);
    }
    carregar();
  }, []);

  async function handleMarkAsReaded(id) {
    await api.put(`notifications/${id}`);
    setNotifications(
      notifications.map(n => (n._id === id ? { ...n, read: true } : n))
    );
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications size={20} color='#7159c1' />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsReaded(notification._id)}
                  type='button'
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
