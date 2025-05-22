import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {


  const {checkAuthToken, status} = useAuthStore();

    // const authStatus = 'checinkg';
    // const authStatus = 'not-authenticated';
    // const authStatus = 'authenticated';

  useEffect(() => {
    checkAuthToken()
  }, );

  if(status === 'checking') {
    return (
      <h3>Loading...</h3>
    )
  }
    

  return (
    <Routes>
        {
            (status === 'not-authenticated')
            ? <Route path="/auth/*" element={<LoginPage/>} />
            : <Route path="/*" element={<CalendarPage/>} />
        }

        <Route path="/*" element={<Navigate to="/auth/login" />} />
        
    </Routes>
  )
}
