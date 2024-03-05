import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0){
    return(
      <div>
        the app is used by pressing buttons
      </div>
    )
  }
  return(
    <div>
      buton press history: {props.allClicks.join('')}
    </div>
  )
}

const Button = ({handleClick, name}) =>(
  <button onClick={handleClick}>
    {name}
  </button>
)

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftclick = () => {
    setAll(allClicks.concat('L'))   
    const updatedLeft = clicks.left + 1
    setClicks({...clicks, left: clicks.left + 1})
    setTotal(updatedLeft + clicks.right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updateR = clicks.right + 1
    setClicks({...clicks, right: clicks.right + 1})
    setTotal(clicks.left + updateR)
  }


  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftclick} name='Left'/>
      <Button handleClick={handleRightClick} name='Right'/>
      {clicks.right}
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App
