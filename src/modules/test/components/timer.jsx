import { TimerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { countDurationInSeconds } from "../../../helpers/countDuration";

const Timer = ({ test }) => {
    console.log(test)
    const [time, setTime] = useState(3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        if (test) {
            const startTime = new Date(test.test_data_from) > new Date() ? new Date(test.test_data_from) : new Date();
            const durationInSeconds = countDurationInSeconds(startTime, test.test_data_to);
            setTime(localStorage.getItem(`test-${test.test_id}-time`) || durationInSeconds);
        }
    }, [test]);

    useEffect(() => {
        if (test) {
            setInterval(() => {
                setTime((prev) => {
                    localStorage.setItem(`test-${test.test_id}-time`, prev - 1);
                    return prev - 1;
                });
            }, 1000);
        }
    }, [test]);

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