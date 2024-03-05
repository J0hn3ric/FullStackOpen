import { useState } from 'react'

const Button = ({handleClick, name}) =>(
  <button onClick={handleClick}>{name}</button>
)

const Anecdotes = (props) =>{
  return(
    <>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {props.points[props.selected]} points</p>
    </>
  )
}

const Header = ({title}) =>(
  <h1>{title}</h1>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [maxVotes, setMax] = useState(0)

  const [points, setPoint] = useState(Array(8).fill(0))
   
  const [selected, setSelected] = useState(0)

  const next = () =>
    setSelected(Math.floor(Math.random() * 8))

  const vote = () =>{
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
    for(let i = 0; i < copy.length; i++){
      if(copy[i] > copy[maxVotes])
        setMax(i)
    }
  }

  return (
    <div>
      <div>
        <Header title='Anecdote of the day' />
        <Anecdotes anecdotes={anecdotes} points={points} selected={selected} />
        <Button handleClick={vote} name='vote' />
        <Button handleClick={next} name='next anecdote' />
      </div>

      <div>
        <Header title='Anecdote with most votes' />
        <Anecdotes anecdotes={anecdotes} points = {points} selected={maxVotes} />
      </div>
    </div>
  )
}

export default App
