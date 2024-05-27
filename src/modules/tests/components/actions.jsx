import PropTypes from "prop-types";
import Button from '../../../ui/button';
import { Play } from "lucide-react";
const Actions = ({ test }) => {
    const currentDateTime = new Date();
    const canStartTest = new Date(test.test_data_from) <= currentDateTime && new Date(test.test_data_to) >= currentDateTime;
    const { status } = test;

    return (
        <div className="flex items-center gap-2">
            {canStartTest && status == "pending" ? (
                <div>
                    <Button className="flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Start Test
                    </Button>
                </div>
            ) : null}
        </div>
    )
}

Actions.propTypes = {
    test: PropTypes.object.isRequired,
}

export default Actions;