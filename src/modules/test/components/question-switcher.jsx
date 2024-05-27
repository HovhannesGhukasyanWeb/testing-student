import PropTypes from 'prop-types';

const QuestionSwticher = ({ questionsLength, currentQuestion, goToQuestion }) => {
    const questions = Array.from({ length: questionsLength }, (_, i) => i + 1);
    return (
        <div className="flex items-center gap-2 max-h-[300px] overflow-x-auto">
            {questions.map(question => {
                return (
                    <div
                        onClick={() => goToQuestion(question)}
                        key={question}
                        className={`w-8 h-8 p-2 flex items-center justify-center rounded-full cursor-pointer ${currentQuestion === question
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-blue-500 text-blue-500"
                            }`}
                    >
                        {question}
                    </div>
                );
            })}
        </div>
    );
}

QuestionSwticher.propTypes = {
    questionsLength: PropTypes.number.isRequired,
    currentQuestion: PropTypes.number.isRequired,
    goToQuestion: PropTypes.func.isRequired
}

export default QuestionSwticher;