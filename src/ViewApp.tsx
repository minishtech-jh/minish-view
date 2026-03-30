import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MainKpiPage } from './pages/MainKpiPage'
import { MarketingPage } from './pages/MarketingPage'
import { SearchTrafficPage } from './pages/SearchTrafficPage'
import { ConsultFunnelPage } from './pages/ConsultFunnelPage'
import './index.css'

/**
 * Minish View App for Module Federation (remote).
 * MemoryRouter로 자체 라우팅 — Host 라우터와 독립적으로 동작.
 */
export default function ViewApp() {
  return (
    <MemoryRouter initialEntries={['/kpi']}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/kpi" element={<MainKpiPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/search" element={<SearchTrafficPage />} />
          <Route path="/funnel" element={<ConsultFunnelPage />} />
          <Route path="*" element={<Navigate to="/kpi" replace />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
