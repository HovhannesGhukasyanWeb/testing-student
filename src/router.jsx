import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout";
import getMe from "./apis/getMe";
import { logout } from "./store/slices/user";

const Login = React.lazy(() => import("./pages/auth/login"));
const Tests = React.lazy(() => import("./pages/tests"));
const NotFound = React.lazy(() => import("./modules/errors/not-found"));
const Test = React.lazy(() => import("./pages/test"));
const TestResult = React.lazy(() => import("./pages/test-result"));

const Router = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                try {
                    await getMe();
                } catch (error) {
                    dispatch(logout());
                }
            })();
        }
    }, [dispatch, isAuthenticated]);

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
                        <Route path="/tests/:id" index element={<Test />} />
                        <Route path="/tests/:id/result" index element={<TestResult />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router;