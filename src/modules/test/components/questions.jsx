import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseApi from "../../../apis/baseApi";
import { errorAlert } from "../../../helpers/alertMessage";
import { getAxiosConfig } from '../../../apis/config'
import useEmblaCarousel from 'embla-carousel-react'
import Question from "./question";
import Button from "../../../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QuestionSwticher from "./question-switcher";
import { useSelector } from "react-redux";

const Questions = () => {
    const { id } = useParams();
    const selectedAnswers = useSelector(state => state.selectedAnswers);
    const [testQuestions, setTestQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const questionsLength = testQuestions.length;
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    })

    const goToPrev = () => {
        emblaApi?.scrollPrev();

        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    const goToNext = () => {
        emblaApi?.scrollNext();

        if (currentQuestion < questionsLength) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const goToQuestion = (questionNumber) => {
        emblaApi.scrollTo(questionNumber - 1);
        setCurrentQuestion(questionNumber);
    }


    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('site/test/questions/' + id, getAxiosConfig());
                setTestQuestions(response.data);
            } catch (error) {
                errorAlert("Could not fetch test questions");
            }
        })();
    }, [id]);

    emblaApi?.on('scroll', () => {
        setCurrentQuestion(emblaApi.selectedScrollSnap() + 1);
    })

    return (
        <div className="w-full h-full">
            <div className="w-full h-full">
                <div className="shadow-lg w-full h-full bg-white min-h-[300px] rounded-lg">

                    <div className="border-b p-2 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-semibold">{currentQuestion}/{questionsLength}</h3>
                        </div>
                        <div>
                            <QuestionSwticher goToQuestion={goToQuestion} currentQuestion={currentQuestion} questionsLength={questionsLength} />
                        </div>
                        <Button>
                            Submit Test
                        </Button>
                    </div>
                    <div className="embla h-full" ref={emblaRef}>
                        <div className="embla__container h-full">
                            {testQuestions.map((question, index) => (
                                <div className="embla__slide px-5 py-2 max-h-[300px] h-[300px] overflow-auto" key={index}>
                                    <Question selectedAnswers={selectedAnswers} question={question} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-2 flex justify-center border-t border-lightgray">
                        <div className="flex justify-between items-center px-4 py-2 gap-2">
                            <Button
                                disabled={!emblaApi?.canScrollPrev() ?? true}
                                onClick={goToPrev}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                disabled={!emblaApi?.canScrollNext() ?? true}
                                onClick={goToNext}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;