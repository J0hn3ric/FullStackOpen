import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.content)
  const display = useSelector(state => state.notification.display)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: display
  }
  return (
    <div style={style} >
      {notification}
    </div>
  )
}

export default Notification