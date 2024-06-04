import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const Layout = () => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="bg-white flex" style={{ height: "calc(100% - 69px)" }}>
                <Sidebar />
                <Suspense fallback={null}>
                    <div className="h-full w-full max-h-full overflow-auto p-3">
                        <Outlet />
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default Layout;