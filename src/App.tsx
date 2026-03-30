import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MainKpiPage } from './pages/MainKpiPage'
import { MarketingPage } from './pages/MarketingPage'
import { SearchTrafficPage } from './pages/SearchTrafficPage'
import { ConsultFunnelPage } from './pages/ConsultFunnelPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/kpi" replace />} />
          <Route path="/kpi" element={<MainKpiPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/search" element={<SearchTrafficPage />} />
          <Route path="/funnel" element={<ConsultFunnelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
