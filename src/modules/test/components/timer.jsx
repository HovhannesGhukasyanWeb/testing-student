import { TimerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { countDurationInSeconds } from "../../../helpers/countDuration";
import { errorAlert } from "../../../helpers/alertMessage";
import { confirmTest } from "../utils/confirm-test";
import handleError from "../../../helpers/handleError";
import { useNavigate } from "react-router-dom";


let timeInterval = null;

const Timer = ({ test }) => {
    const navigate = useNavigate();
    const [testStarted, setTestStarted] = useState(false);
    const [time, setTime] = useState(3600);
    const [isAlerted, setIsAlerted] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        if (test) {
            const startTime = new Date(test.test_data_from) > new Date() ? new Date(test.test_data_from) : new Date();
            const durationInSeconds = countDurationInSeconds(startTime, test.test_data_to);
            setTime(localStorage.getItem(`test-${test.test_id}-time`) || durationInSeconds);
            setTestStarted(true);
        }
    }, [test]);

    useEffect(() => {
        if (test) {
            timeInterval = setInterval(() => {
                setTime((prev) => {
                    localStorage.setItem(`test-${test.test_id}-time`, prev - 1);
                    return prev - 1;
                });
            }, 1000);
        }
    }, [test]);

    useEffect(() => {
        if (test && testStarted) {
            try {
                if (time <= 0) {
                    setTime(0);
                    clearInterval(timeInterval);
                    errorAlert("You didn't finish the test. It will be submitted automatically.")
                    confirmTest(test.test_id);
                    navigate(`/tests/${test.test_id}/result`);
                }

                if (time <= 180 && !isAlerted) {
                    errorAlert("You have 3 minutes left to complete the test");
                    setIsAlerted(true);
                }
            } catch (error) {
                handleError(error);
            }
        }
    }, [time, test, isAlerted, navigate, testStarted]);

    return (
        <div className="flex justify-end py-2">
            <div className="shadow-lg p-2 border border-lightgray">
                <div className="flex items-center gap-2">
                    <div>
                        <TimerIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <span>{String(minutes).length > 1 ? minutes : "0" + minutes}:{String(seconds).length > 1 ? seconds : "0" + seconds}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

Timer.propTypes = {
    test: PropTypes.object,
}

export default Timer;