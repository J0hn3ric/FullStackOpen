import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state.notification)

  return(
    <div>
      {(message &&
        <Alert variant={type === 'error'
          ? 'danger'
          : 'success' }>
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
