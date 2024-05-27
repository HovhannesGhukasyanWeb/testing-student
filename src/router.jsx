import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout";

const Login = React.lazy(() => import("./pages/auth/login"));
const Tests = React.lazy(() => import("./pages/tests"));
const NotFound = React.lazy(() => import("./modules/errors/not-found"));

const Router = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    return (
        <BrowserRouter basename="/">
            <Suspense fallback={null}>
                <Routes>
                    {/* auth routes */}
                    <Route path="/login">
                        <Route
                            index
                            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
                        />
                    </Route>

                    <Route
                        path="/"
                        element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
                    >
                        <Route index element={<div>Home</div>} />
                        <Route path="/tests" index element={<Tests />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router;