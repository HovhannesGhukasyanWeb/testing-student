import PropTypes from "prop-types";
import ImageViewer from "../../../components/image-viewer";
import { useParams } from "react-router-dom";
import { storeApi, updateApi } from '../../../apis/baseCrudApi';
import handleError from "../../../helpers/handleError";
import { useEffect, useState } from "react";

const Question = ({ question, selectedAnswers = [] }) => {
    const currentQuestionSelectedAnswer = selectedAnswers.find(answer => answer.question_id === question.id);
    const currentQuestionSelectedAnswerId = currentQuestionSelectedAnswer?.answer_id ?? null;
    const [checked, setChecked] = useState(null)
    const { id: testId } = useParams();
    const setAnswer = async (answerId) => {
        const questionId = question.id;
        try {
            if (currentQuestionSelectedAnswer) {
                await updateApi('site/test/question/answer/' + currentQuestionSelectedAnswer.id, {
                    answer_id: answerId
                })
            } else {
                await storeApi('site/test/question/answer', {
                    test_id: testId,
                    question_id: questionId,
                    answer_id: answerId
                });
            }

            setChecked(answerId);
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        setChecked(currentQuestionSelectedAnswerId);
    }, [currentQuestionSelectedAnswerId]);

    return (
        <div className="w-full h-full">
            <div className="py-2 flex justify-between gap-2">
                <h3 className="text-xl font-semibold">{question.title}</h3>
                <div>
                    <p>Point: {question.point}</p>
                </div>
            </div>
            <div>
                {question.image && (
                    <ImageViewer imageSrc={question.image}>
                        <img src={question.image} alt={question.title} className="w-full h-48 object-contain cursor-pointer" />
                    </ImageViewer>
                )}
            </div>
            <div>
                {question.question_options.length > 0 && (
                    <div>
                        <ol>
                            {
                                question.question_options.map((option, index) => (
                                    <li key={index} className="font-semibold">{option.title}</li>
                                ))
                            }
                        </ol>
                    </div>
                )}
            </div>
            <div>
                {question.question_answers.map((option, index) => {
                    return (
                        <div key={index} className="py-2 flex items-center gap-2">
                            <input checked={checked == option.id ? true : false} onChange={() => setAnswer(option.id)} type="radio" name={question.id} id={option.id} value={option.id} />
                            <label className="cursor-pointer" htmlFor={option.id}>{option.title}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    selectedAnswers: PropTypes.array
}

export default Question;