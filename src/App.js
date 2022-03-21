import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import themes from './themes';

import SigninPage from './views/authentication/signin/SigninPage';
import SignupPage from './views/authentication/signup/SignupPage';
import StudentDashboard from './views/dashboard/student/StudentDashboard';
import CompanyDashboard from './views/dashboard/company/CompanyDashboard';
import MainLayout from './components/layout/MainLayout/MainLayout';
import AnimaticCreator from './views/animatic-creator/AnimaticCreator';
//import TimelineControlEditor from './views/animatic-creator/TimelineControlEditor';

export default function App() {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <Routes>
                    <Route path="signin" element={<SigninPage />} />
                    {/* <Route path="/" element={<SigninPage />} /> */}
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="dashboard/creator" element={<MainLayout />}>
                        <Route path="/dashboard/creator" element={<CompanyDashboard />} />
                    </Route>
                    <Route path="animatic" element={<AnimaticCreator />} />
                    {/* <Route path="animatic" element={<TimelineControlEditor />} /> */}
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
