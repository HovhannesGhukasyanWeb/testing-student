import Button from "../../../ui/button"
import { useState } from "react";
import ConfirmTest from "./confirm-test";

const SubmitTest = () => {
    const [showDialog, setShowDialog] = useState(false);
    const submitHandler = () => {
        setShowDialog(true);
    }

    return (
        <div>
            {showDialog && <ConfirmTest setShowDialog={setShowDialog} />}
            <Button onClick={submitHandler}>
                Submit Test
            </Button>
        </div>
    )
}

export default SubmitTest;