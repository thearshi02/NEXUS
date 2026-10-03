import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NexusProvider } from './context/NexusContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PassportPage } from './pages/PassportPage';
import { InsightsPage } from './pages/InsightsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ForecastPage } from './pages/ForecastPage';
import { RecordsPage } from './pages/RecordsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SettingsPage } from './pages/SettingsPage';
import { InstitutionPortalPage } from './pages/InstitutionPortalPage';

export default function App() {
  return (
    <NexusProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated Financial Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/passport" element={<PassportPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Institution Partner Portal */}
          <Route path="/partner-portal" element={<InstitutionPortalPage />} />
          <Route path="/institution" element={<Navigate to="/partner-portal" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </NexusProvider>
  );
}
