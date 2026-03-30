import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MainKpiPage } from './pages/MainKpiPage'
import { MarketingPage } from './pages/MarketingPage'
import { SearchTrafficPage } from './pages/SearchTrafficPage'
import { ConsultFunnelPage } from './pages/ConsultFunnelPage'
import './index.css'

/**
 * Minish View App for Module Federation (remote).
 * Uses MemoryRouter to avoid conflict with host's router.
 */
export default function ViewApp() {
  return (
    <MemoryRouter initialEntries={['/kpi']}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/kpi" replace />} />
          <Route path="/kpi" element={<MainKpiPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/search" element={<SearchTrafficPage />} />
          <Route path="/funnel" element={<ConsultFunnelPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
