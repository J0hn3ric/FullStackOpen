import { useContextValue } from '../NotificationContext'

const Notification = () => {
  const value = useContextValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: value.display
  }

  return (
    <div style={style}>
      <p>{value.message}</p>
    </div>
  )
}

export default Notification
