import { useNotificationValue } from '../context/notificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (notification.message === null) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
