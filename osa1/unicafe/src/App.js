import { useState } from 'react'


const Button = ({handleKlick, text}) => <button onClick={handleKlick}>{text}</button>
const StatisticLine = ({text, value}) => {
return(
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>
)
}

const Statistics = ({good, neutral, bad}) =>
{
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good / all * 100

  if (all === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={all}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive}></StatisticLine>
          </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleKlick = (stat, setStat) => () => setStat(stat + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleKlick={handleKlick(good, setGood)} text="good"></Button>
      <Button handleKlick={handleKlick(neutral, setNeutral)} text="neutral"></Button>
      <Button handleKlick={handleKlick(bad, setBad)} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App