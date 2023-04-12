import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "../pages/home/Home";
import HomeSearch from "../pages/home/HomeSearch";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignIn/SignUp";
import { useAppSelector } from "../store/hooks";
import { SignUpSucess } from "../pages/SignIn/SignUpSucess";
import { ResetPassword } from "../pages/SignIn/ResetPassword";
import { EmailResetPassword } from "../pages/SignIn/EmailResetPassword";

export type ProtectedRouteProps = {
  children: JSX.Element;
};

const Protected = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const user = Object.values(useAppSelector((store) => store.users.entities));

  useEffect(() => {
    if (user[0] == undefined) {
      navigate("/");
    }
  }, []);

  return children;
};

const AppRoutes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <SignIn />
              </Protected>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/success" element={<SignUpSucess />} />
          <Route
            path="/e-mail/reset-password"
            element={<EmailResetPassword />}
          />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route
            path="/recados/page=:page"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/search=:assunto/:status/page=:page"
            element={
              <Protected>
                <HomeSearch />
              </Protected>
            }
          />
          <Route
            path="/search=/:status/page:page"
            element={
              <Protected>
                <HomeSearch />
              </Protected>
            }
          />
          <Route
            path="/search=/todos"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
