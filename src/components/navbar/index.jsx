import Button from "../../ui/button";
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from 'lucide-react';
import { logout } from '../../store/slices/user'

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const logoutHandler = () => dispatch(logout());

    return (
        <div className="bg-white py-3 flex justify-between items-center px-5 border-b border-lightgray">
            <div className="sm:block hidden">
                <h1 className="text-lg font-semibold">Testing Platform for Students</h1>
            </div>
            <div className="flex items-center gap-2 sm:w-auto w-full sm:justify-start justify-between">
                <p className="text-sm">
                    Welcome student, <a href="/profile" className="font-semibold underline">{user.username}</a>
                </p>
                <Button className="flex items-center gap-2" onClick={logoutHandler}>
                    Logout
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default Navbar;