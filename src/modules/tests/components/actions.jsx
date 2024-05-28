import PropTypes from "prop-types";
import Button from '../../../ui/button';
import { Eye, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../utils/statuses";
const Actions = ({ test }) => {
    const navigate = useNavigate();
    const currentDateTime = new Date();
    const canStartTest = new Date(test.test_data_from) <= currentDateTime && new Date(test.test_data_to) >= currentDateTime;
    const { status } = test;

    const canSeeResult = [STATUSES.SUCCESS, STATUSES.FAILED].includes(status);

    return (
        <div className="flex items-center gap-2">
            {canStartTest && status == "pending" ? (
                <Button className="flex items-center justify-center gap-2" onClick={() => navigate('/tests/' + test.id)}>
                    <Play className="w-4 h-4" />
                    Start Test
                </Button>
            ) : null}

            {canSeeResult ? (
                <Button variant="success" className="flex items-center justify-center gap-2" onClick={() => navigate('/tests/' + test.id + "/result")}>
                    <Eye className="w-4 h-4" />
                    See Test Result
                </Button>
            ) : null}
        </div>
    )
}

Actions.propTypes = {
    test: PropTypes.object.isRequired,
}

export default Actions;