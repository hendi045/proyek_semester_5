import React, { useState, useEffect } from 'react';
import { DataProvider, useDataContext } from './context/DataContext';
import { AdminLayout } from './layouts/AdminLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { DataAromaPage } from './pages/admin/DataAromaPage';
import { DataKriteriaPage } from './pages/admin/DataKriteriaPage';
import { BobotKriteriaPage } from './pages/admin/BobotKriteriaPage';
import { DataPenilaianPage } from './pages/admin/DataPenilaianPage';
import { ProsesSawPage } from './pages/admin/ProsesSawPage';
import { HasilRankingPage } from './pages/admin/HasilRankingPage';
import { LaporanPage } from './pages/admin/LaporanPage';
import { AdminPlaceholderPage } from './pages/admin/AdminPlaceholderPage';
import { PublicRekomendasiPage } from './pages/public/PublicRekomendasiPage';
import { PublicRiwayatPage } from './pages/public/PublicRiwayatPage';
import { Toast } from './components/ui/Toast';
import { PWAInstallBanner } from './components/ui/PWAInstallBanner';

// Admin routes list
const ADMIN_ROUTES = ['dashboard', 'aroma', 'kriteria', 'bobot', 'penilaian', 'saw', 'ranking', 'laporan'];

function AppContent() {
  const { toast } = useDataContext();

  // Normalisasi hash router
  const normalizeRoute = (rawHash) => {
    let clean = (rawHash || '').replace(/^#\/?/, '').toLowerCase();
    if (clean.startsWith('admin/')) {
      clean = clean.replace('admin/', '');
    }
    if (clean === 'rekomendasi') return 'public-rekomendasi';
    if (clean === 'riwayat') return 'public-riwayat';
    return clean;
  };

  // Sync state with hash or default to public recommendation
  const getInitialRoute = () => {
    const route = normalizeRoute(window.location.hash);
    if (route && (ADMIN_ROUTES.includes(route) || ['login', 'public-rekomendasi', 'public-riwayat'].includes(route))) {
      return route;
    }
    return 'public-rekomendasi';
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('qa_demo_admin_auth') === 'true';
  });

  // Keep browser URL hash updated
  useEffect(() => {
    window.location.hash = currentRoute;
  }, [currentRoute]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const route = normalizeRoute(window.location.hash);
      if (route && (ADMIN_ROUTES.includes(route) || ['login', 'public-rekomendasi', 'public-riwayat'].includes(route))) {
        setCurrentRoute(route);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route) => {
    // If trying to access admin route without being authenticated, redirect to login
    if (ADMIN_ROUTES.includes(route) && !isAdminAuthenticated) {
      setCurrentRoute('login');
      return;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('qa_demo_admin_auth', 'true');
    setCurrentRoute('dashboard');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('qa_demo_admin_auth');
    setCurrentRoute('login');
  };

  // Helper untuk merender halaman admin sesuai rute aktif
  const renderAdminPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'aroma':
        return <DataAromaPage />;
      case 'kriteria':
        return <DataKriteriaPage />;
      case 'bobot':
        return <BobotKriteriaPage />;
      case 'penilaian':
        return <DataPenilaianPage />;
      case 'saw':
        return <ProsesSawPage onNavigate={handleNavigate} />;
      case 'ranking':
        return <HasilRankingPage onNavigate={handleNavigate} />;
      case 'laporan':
        return <LaporanPage onNavigate={handleNavigate} />;
      default:
        return (
          <AdminPlaceholderPage
            currentPath={currentRoute}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <>
      {/* PWA Offline & Install Banner */}
      <PWAInstallBanner />

      {/* Toast Notification Container */}
      <div className="qa-toast-container">
        {toast && <Toast toast={toast} />}
      </div>

      {/* Render Login Page */}
      {currentRoute === 'login' ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToPublic={() => setCurrentRoute('public-rekomendasi')}
        />
      ) : ADMIN_ROUTES.includes(currentRoute) ? (
        // Admin Area (Protected Demo)
        !isAdminAuthenticated ? (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onBackToPublic={() => setCurrentRoute('public-rekomendasi')}
          />
        ) : (
          <AdminLayout
            currentPath={currentRoute}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          >
            {renderAdminPage()}
          </AdminLayout>
        )
      ) : (
        // Public Area (Default)
        <PublicLayout
          currentPath={currentRoute}
          onNavigate={handleNavigate}
        >
          {currentRoute === 'public-riwayat' ? (
            <PublicRiwayatPage
              onNavigateToRekomendasi={() => handleNavigate('public-rekomendasi')}
            />
          ) : (
            <PublicRekomendasiPage
              onNavigateToHistory={() => handleNavigate('public-riwayat')}
            />
          )}
        </PublicLayout>
      )}
    </>
  );
}

export function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
