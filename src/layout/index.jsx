import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Suspense fallback={null}>
                <div className="h-full w-full max-h-full overflow-auto">
                    <Outlet />
                </div>
            </Suspense>
        </div>
    )
}

export default Layout;