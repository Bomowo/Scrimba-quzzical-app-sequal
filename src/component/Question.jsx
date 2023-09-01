import PropTypes from 'prop-types';

export default function Question ({question, answerArray, selectAnswer, questionId, showCorrect}) {

    let buttonsWithAnswers = answerArray.map(answer => {
        let styles = {
            'backgroundColor': answer.isHeld? 'black' : '',
            'color': answer.isHeld? 'white' : '',
        }

        if(showCorrect) {
            if(answer.isHeld && answer.isCorrect) {
                styles = {backgroundColor: 'green'}
            } else if (answer.isHeld && !answer.isCorrect) {
                styles = {backgroundColor: 'red'}
            } else if (answer.isCorrect) {
                styles = {backgroundColor: 'green'}
            } else if (!answer.isCorrect) {
                styles = {backgroundColor: 'grey'}
            }
        }

        return <button key={answer.id} 
                       onClick={() => {selectAnswer(questionId, answer.id)}}
                       style={styles}>
                        {answer.value}</button>
    })

    return (
        <div className="Question">
            <h2>
                {question}
            </h2>
                {buttonsWithAnswers}
            <hr/>
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    answerArray: PropTypes.array.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    showCorrect: PropTypes.bool.isRequired
}