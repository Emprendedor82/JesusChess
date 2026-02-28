import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Bell,
  CheckCheck,
  ClipboardList,
  ChevronRight,
  ArrowLeft,
  Inbox,
} from 'lucide-react';
import { notificationStore } from '../../data/notificationStore';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(notificationStore.getNotificationsForStudent());
  }, []);

  const handleOpen = (notif) => {
    if (!notif.read) {
      notificationStore.markAsRead(notif.id);
      setNotifications(prev =>
        prev.map(n => (n.id === notif.id ? { ...n, read: true } : n))
      );
    }
    if (notif.deepLink) {
      navigate(notif.deepLink);
    }
  };

  const handleMarkAll = () => {
    notificationStore.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Ahora';
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)}h`;
    return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in" data-testid="notifications-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            data-testid="back-btn"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Notificaciones</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">{unreadCount} sin leer</p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAll} data-testid="mark-all-read-btn">
            <CheckCheck className="w-4 h-4 mr-1" />
            Leer todo
          </Button>
        )}
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground" data-testid="empty-notifications">
          <Inbox className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm font-medium">Sin notificaciones</p>
          <p className="text-xs mt-1">Las tareas de tu profesor apareceran aqui</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`cursor-pointer transition-all ${
                notif.read ? 'opacity-70' : 'border-accent/30 shadow-sm'
              }`}
              onClick={() => handleOpen(notif)}
              data-testid={`notification-${notif.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                    notif.read ? 'bg-muted' : 'bg-accent/10'
                  }`}>
                    <ClipboardList className={`w-5 h-5 ${notif.read ? 'text-muted-foreground' : 'text-accent'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${notif.read ? 'font-medium text-muted-foreground' : 'font-bold text-foreground'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notif.body}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2">{formatDate(notif.createdAt)}</p>
                  </div>
                  {notif.deepLink && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
