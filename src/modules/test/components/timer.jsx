import { TimerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ test }) => {
    console.log(test)
    const [time, setTime] = useState(3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        setInterval(() => {
            setTime((prev) => {
                return prev - 1;
            });
        }, 1000);
    }, []);

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