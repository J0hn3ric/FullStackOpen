import { createContext, useReducer, useContext } from 'react'

const initialState = false

const toggleReducer = (state, action) => {
  switch(action.type) {
  case 'TOGGLE_VISIBILITY':
    return !state
  default:
    return state
  }
}

const ToggleContext = createContext()

export const ToggleProvider = (props) => {
  const [visibility, visibilityDispatch] = useReducer(toggleReducer, initialState)

  return(
    <ToggleContext.Provider value={[visibility, visibilityDispatch]}>
      {props.children}
    </ToggleContext.Provider>
  )
}

export const useVisibilityDispatch = () => {
  const helper = useContext(ToggleContext)
  return helper[1]
}

export const useVisibilityValue = () => {
  const helper = useContext(ToggleContext)
  return helper[0]
}

export const setVisibility = dispatch => {
  dispatch({ type: 'TOGGLE_VISIBILITY' })
}