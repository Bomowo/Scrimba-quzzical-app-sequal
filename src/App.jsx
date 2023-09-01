import { useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'


function App() {
  const [gameInProgress, setGameInProgress] = useState(false)
  const [data, setData] = useState([])

  function changeGameStatus () {
    setGameInProgress(prevStatus => !prevStatus)
  }

  useEffect(() => {
    fetchQuizData()

  },[])

  const fetchQuizData = async () => {
    fetch("https://opentdb.com/api.php?amount=5&category=26&type=multiple")
      .then((response) => response.json())
      .then((json) =>   {setData(() => {
        return json.results.map( item => {
          const incorrect = item.incorrect_answers.map(incAnswr => {
            return {value: decode(incAnswr), id: nanoid(), isHeld: false, isCorrect: false}
          })

          const correct = {value: decode(item.correct_answer), id: nanoid(), isHeld: false, isCorrect: true}

          let AnswersArr = [correct, ...incorrect]
          AnswersArr.sort(() => 0.5 - Math.random())

          return {question: item.question, AnswersArr, id: nanoid()}
        })
      })})
      .catch((error) => console.error(error));
  };

  return (
    <main>
      {gameInProgress?
      <div>
        This game is in progress
        <button onClick={changeGameStatus}>change that</button>
      </div>
        :
      <div>
        Hi this game is not in progress
        <button onClick={changeGameStatus}>change that</button>
        <button onClick={console.log(data)}>Show data</button>
      </div>}
    </main>
  )
}

export default App


