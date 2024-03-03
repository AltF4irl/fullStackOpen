import {useState} from 'react'

const Button = ({name, onClick}) => <button onClick={onClick}>{name}</button>

const StatisticLine = ({name, stat}) => {
  return (
    <>
      <td>{name}</td>
      <td>{stat}</td>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [accumulate, setAccumulate] = useState(0)
  const [average, setAverage] = useState(0)
  const [positiveRate, setPositiveRate] = useState(0)

  const eventHandler = {
    goodClickHandler: () => {
      const goodHolder = good + 1
      const accumHolder = accumulate + 1
      const allHolder = all + 1
      setGood(good + 1)
      setAll(all + 1)
      setAccumulate(accumulate  + 1)
      setAverage(accumHolder / allHolder * 100)
      setPositiveRate(goodHolder / allHolder * 100)
    },
    neutralClickHandler: () => {
      const allHolder = all + 1
      setNeutral(neutral  + 1)
      setAll(all + 1)
      setAverage(accumulate / allHolder * 100)
      setPositiveRate(good / allHolder * 100)
    },
    badClickHandler: () => {
      const accumHolder = accumulate - 1
      const allHolder = all + 1
      setBad(bad + 1)
      setAll(all + 1)
      setAccumulate(accumulate - 1)
      setAverage(accumHolder / allHolder * 100)
      setPositiveRate(good / allHolder * 100)
    }
  }

  const {goodClickHandler, neutralClickHandler, badClickHandler} = eventHandler

  if (all === 0) {
    return (
      <>
        <h1>Give Feedback</h1>
        <Button name='good' onClick={goodClickHandler} />
        <Button name='neutral' onClick={neutralClickHandler} />
        <Button name='bad' onClick={badClickHandler} />
        <h2>Statistcs</h2>
        <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <>
      <h1>Give Feedback</h1>
      <Button name='good' onClick={goodClickHandler} />
      <Button name='neutral' onClick={neutralClickHandler} />
      <Button name='bad' onClick={badClickHandler} />
      <h2>Statistcs</h2>
      <table>
        <tbody>
          <tr><StatisticLine name='Good' stat={good} /></tr>
          <tr><StatisticLine name='Neutral' stat={neutral} /></tr>
          <tr><StatisticLine name='Bad' stat={bad} /></tr>
          <tr><StatisticLine name='All' stat={all} /></tr>
          <tr><StatisticLine name='Average' stat={average.toFixed(2)} /></tr>
          <tr><StatisticLine name='Positive' stat={positiveRate.toFixed(2)} /></tr>
        </tbody>
      </table>
    </>
  )
}

export default App