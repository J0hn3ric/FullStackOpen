import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility } from '../reducers/toggleVisibilityReducer'
import { Button } from 'react-bootstrap'

const Togglable = (props, refs) => {
  const visible = useSelector(state => state.visibility)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={() => dispatch(toggleVisibility())}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='danger' size='sm' onClick={() => dispatch(toggleVisibility())}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
