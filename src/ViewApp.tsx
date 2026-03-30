import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MainKpiPage } from './pages/MainKpiPage'
import { MarketingPage } from './pages/MarketingPage'
import { SearchTrafficPage } from './pages/SearchTrafficPage'
import { ConsultFunnelPage } from './pages/ConsultFunnelPage'
import './index.css'

/**
 * Minish View App for Module Federation (remote).
 * No Router wrapper — host provides the router context.
 */
export default function ViewApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="kpi" replace />} />
        <Route path="kpi" element={<MainKpiPage />} />
        <Route path="marketing" element={<MarketingPage />} />
        <Route path="search" element={<SearchTrafficPage />} />
        <Route path="funnel" element={<ConsultFunnelPage />} />
      </Route>
    </Routes>
  )
}
