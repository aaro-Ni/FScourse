import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))

  const setRandomSelected = () => setSelected(Math.round(Math.random()*7 - 0.49))
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const anecdoteWithMostVotes = () => {
    let indexMost = 0
    for (let i = 0; i<7; i++)
    {
      if (points[i] > points[indexMost])
        {
        indexMost = i
      }
    }
    return indexMost

  }
  const mostVotes = anecdoteWithMostVotes()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} points</p>
      <br/>
      <button onClick={vote}>vote</button>
      <button onClick={setRandomSelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
      <p>has {points[mostVotes]} points</p>

      
    </div>
  )
}

export default App
