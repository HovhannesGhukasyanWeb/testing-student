import { useNavigate } from "react-router-dom";
import Button from "../../../ui/button";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
                <p className="font-bold">
                    Ooops! 404 Not Found
                </p>
                <div className="mt-2">
                    <span>
                        The page you are looking for does not exist.
                    </span>
                </div>
                <div className="mt-2">
                    <Button onClick={() => navigate("/")}>
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;