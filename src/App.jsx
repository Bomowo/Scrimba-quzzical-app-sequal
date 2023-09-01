import { useState, useEffect} from 'react'
import Question from './component/Question'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'


function App() {
  const [gameInProgress, setGameInProgress] = useState(false)
  const [data, setData] = useState([])
  const [showCorrect, setShowCorrect] = useState(false);

  function changeGameStatus () {
    setGameInProgress(prevStatus => !prevStatus)
  }

  useEffect(() => {
    fetchQuizData()

  },[])

  function testClick (questionId, selectedId) {
    console.log('You clicked me ' + questionId + " " + selectedId)

    setData(prevData => {
      return prevData.map(question => {
        if(questionId !== question.id) {
          return question;
        } else {
          const newAnswers = question.answersArr.map(answer => {
            return answer.id === selectedId ? {...answer, isHeld: !answer.isHeld} : {...answer, isHeld: false}
          })

          return {...question, answersArr: newAnswers}
        }
      })
    })
  }

  const fetchQuizData = async () => {
    fetch("https://opentdb.com/api.php?amount=5&category=26&type=multiple")
      .then((response) => response.json())
      .then((json) =>   {setData(() => {
        return json.results.map( item => {
          const incorrect = item.incorrect_answers.map(incAnswr => {
            return {value: decode(incAnswr), id: nanoid(), isHeld: false, isCorrect: false}
          })

          const correct = {value: decode(item.correct_answer), id: nanoid(), isHeld: false, isCorrect: true}

          let answersArr = [correct, ...incorrect]
          answersArr.sort(() => 0.5 - Math.random())

          return {question: decode(item.question), answersArr, id: nanoid()}
        })
      })})
      .catch((error) => console.error(error));
  };

  const questionList = data.map(question => {
    return (
      <Question 
      key = {nanoid()}
      question={question.question}
      questionId = {question.id}
      answerArray={question.answersArr} 
      selectAnswer={testClick}
      showCorrect={showCorrect}/>
    )
  })

  function checkAnswers () {
    setShowCorrect(true);
  }

  let correctAnswerd = 0;
    
  if(showCorrect){
      data.map((question) => {
          return question.answersArr.forEach(answer => {
              return answer.isHeld && answer.isCorrect ? correctAnswerd++ : correctAnswerd;
          });
      });
  }

  return (
    <main>
      {gameInProgress?
      <div className='question-list'>
        This game is in progress
        {questionList}
        <button onClick={checkAnswers}>Check answers</button>
        <span className='score'>{showCorrect && correctAnswerd} / 5</span>
      </div>
        :
      <div className="start-page">
        <h1>Quizzical</h1>
        <p>5 Question about celebrities of different diffuculty</p>
        <button onClick={changeGameStatus}>Start Quiz</button>
      </div>}
    </main>
  )
}

export default App


