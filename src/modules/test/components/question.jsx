import PropTypes from "prop-types";
import ImageViewer from "../../../components/image-viewer";

const Question = ({ question }) => {
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
                {question.question_answers.map((option, index) => (
                    <div key={index} className="py-2 flex items-center gap-2">
                        <input type="radio" name={question.id} id={option.id} value={option.id} />
                        <label className="cursor-pointer" htmlFor={option.id}>{option.title}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.object.isRequired
}

export default Question;