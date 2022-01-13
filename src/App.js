import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import themes from './themes';

import LoginPage from './views/authentication/login/LoginPage';
import SignupPage from './views/authentication/signup/SignupPage';
import StudentDashboard from './views/dashboard/student/StudentDashboard';

export default function App() {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="dashboard" element={<StudentDashboard />} />
                </Routes>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}