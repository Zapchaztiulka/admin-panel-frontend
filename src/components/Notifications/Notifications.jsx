import { useNotifications } from "@/redux/notifications/notificationsSlice"
import { NotificationItem } from "./NotificationItem"


export const Notifications = () => {
  const notifications = useNotifications()

  return (
    <div className="fixed bottom-0 start-1/2 -translate-x-1/2">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
