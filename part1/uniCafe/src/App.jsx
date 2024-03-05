import { useState } from 'react'

const Header = ({title}) => (
  <div>
    <h1>{title}</h1>
  </div>
)

const Button = ({name, handleClick}) =>(
  <button onClick={handleClick}>{name}</button>
)

const Statistics = ({stats}) =>{
  if(stats.all === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <Line name='good' value={stats.good} />
        <Line name='neutral' value={stats.neutral} />
        <Line name='bad' value={stats.bad} />
        <Line name='all' value={stats.all} />
        <Line name='average' value={stats.avg} />
        <Line name='positive' value={stats.positive + '%'} /> 
      </tbody>
    </table>
  )
}

const Line = ({name, value}) =>(
  <tr>
    <td>
      {name} {value}
    </td>
  </tr>
)

const App = () =>{
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    avg: 0,
    positive: 0
  })

  const handleGood = () =>{
    const updatedGood = stats.good + 1
    const updatedAll = stats.all + 1
    const updateStats = {...stats,
      good: updatedGood,
      all: updatedAll,
      avg: (updatedGood - stats.bad) / updatedAll,
      positive: (updatedGood / updatedAll) * 100
      }
    setStats(updateStats)
  }

  const hanldeNeut = () =>{
    const updatedAll = stats.all + 1
    const updateStats = {...stats,
      neutral: stats.neutral + 1,
      all: updatedAll,
      avg: (stats.good - stats.bad) / updatedAll,
      positive: (stats.good / updatedAll) * 100
      }
    setStats(updateStats)
  }

  const handleBad = () =>{
    const updatedAll = stats.all + 1
    const updatedBad = stats.bad + 1
    const updateStats = {...stats,
      bad: updatedBad,
      all: updatedAll,
      avg: (stats.good - updatedBad) / updatedAll,
      positive: (stats.good / updatedAll) * 100
      }
    setStats(updateStats)
  }

  return(
    <div>
      <Header title='give feedback'/>
      <Button name='good' handleClick={handleGood}/>
      <Button name='neutral' handleClick={hanldeNeut}/>
      <Button name='bad' handleClick={handleBad}/>
      <Statistics stats={stats} />
      
    </div>
  )
}

export default App
