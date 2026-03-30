import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
} from 'lucide-react'
import { InfoTooltip } from '../components/InfoTooltip'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { kpiSummary } from '../data/mock'

const analysisOptions = ['신환수', '매출액', '확정금액', '정보제공수'] as const

function ChangeCell({ value }: { value: number }) {
  const isUp = value > 0
  const Icon = isUp ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isUp ? 'text-up' : 'text-down'}`}>
      <Icon size={12} />
      {isUp ? '▲' : '▼'}{Math.abs(value).toFixed(2)}%
    </span>
  )
}

export function MainKpiPage() {
  const [metric, setMetric] = useState<typeof analysisOptions[number]>('신환수')

  return (
    <div className="p-6 lg:p-8 pb-24 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Main KPI 분석</h1>
          <InfoTooltip size={16} text="병원의 핵심 성과 지표(KPI)를 종합적으로 분석합니다. 전월 대비 증감, 일평균 실적, 목표 달성률 등을 한눈에 확인할 수 있습니다." />
        </div>
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <span className="text-gray-500">분석기간 :</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-[var(--radius-button)]">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-gray-700 font-medium">{kpiSummary.period}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-[var(--radius-button)]">
            <Building2 size={14} className="text-gray-400" />
            <span className="text-gray-700 font-medium">{kpiSummary.hospital}</span>
          </div>
          <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-[var(--radius-button)] text-gray-700 font-medium">
            기준일: {kpiSummary.baseMonth}
          </div>
        </div>
      </div>

      {/* 전월 동기간 대비 */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">전월 동기간 대비</h2>
          <InfoTooltip text="전월 같은 기간의 실적과 비교한 증감률입니다. 동일 영업일 수 기준으로 산출됩니다." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          {kpiSummary.prevPeriod.map((item) => (
            <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-[11px] text-gray-500 font-medium mb-1 truncate">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums">
                {item.unit === '원' ? `${item.current.toLocaleString()}` : `${item.current.toLocaleString()}${item.unit}`}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                전월 : {item.prev.toLocaleString()}
              </p>
              <ChangeCell value={item.change} />
            </div>
          ))}
        </div>
      </div>

      {/* 당월 일평균 대비 */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">당월 일평균 대비</h2>
          <InfoTooltip text="당월 일평균 실적과 기준일 실적을 비교합니다. 일별 편차를 파악하여 운영 효율을 점검할 수 있습니다." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
          {kpiSummary.dailyAvg.map((item) => (
            <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-[11px] text-gray-500 font-medium mb-1 truncate">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums">
                일평균 : {item.avg.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                기준일 : {item.base.toLocaleString()}
              </p>
              <ChangeCell value={item.change} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 주요 KPI */}
        <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-gray-900">주요 KPI</h2>
            <InfoTooltip text="핵심 KPI의 목표 대비 달성률을 표시합니다. 프로그레스 바로 현재 진행 상황을 직관적으로 확인할 수 있습니다." />
          </div>
          <div className="space-y-4">
            {kpiSummary.mainKpis.map((kpi) => (
              <div key={kpi.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 font-medium">{kpi.label}</span>
                  <span className="text-xs font-bold text-gray-900 tabular-nums">{kpi.pct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(kpi.pct, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-gray-400">{kpi.current}</span>
                  <span className="text-[10px] text-gray-400">목표 {kpi.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 내원경로별 분석 */}
        <div className="xl:col-span-2 bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-900">내원경로별 분석</h2>
              <InfoTooltip text="광고, 소개, 협력, 기타 등 내원경로별 월별 추이를 분석합니다. 분석지표를 변경하여 다양한 관점에서 비교할 수 있습니다." />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">분석지표</span>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as typeof metric)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700"
              >
                {analysisOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={kpiSummary.monthlyTrend[metric]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  tickFormatter={(v) =>
                    metric === '매출액' || metric === '확정금액'
                      ? `${(v / 100_000_000).toFixed(1)}억`
                      : v.toLocaleString()
                  }
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(value: number) =>
                    metric === '매출액' || metric === '확정금액'
                      ? `${value.toLocaleString()}원`
                      : `${value.toLocaleString()}${metric === '신환수' ? '명' : '건'}`
                  }
                />
                <Legend
                  iconType="plainline"
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                />
                <Line type="monotone" dataKey="ad" name="광고" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="referral" name="소개" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="partner" name="협력" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="other" name="기타" stroke="#9ca3af" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI 현황 테이블 */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">{kpiSummary.baseMonth} KPI 현황</h2>
          <InfoTooltip text="내원경로별 매출액, 확정금액, 신환수, 진료적단가 등 상세 KPI를 테이블로 확인합니다." />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2.5 px-2 text-gray-500 font-medium">지표명</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">매출액</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">비중</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">확정금액</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">비중</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">신환수</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">비중</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">진료적단가</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">미니쉬신환 확정금액 적단가</th>
              </tr>
            </thead>
            <tbody>
              {kpiSummary.channelKpi.map((row) => (
                <tr key={row.channel} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 px-2 font-medium text-gray-800">{row.channel}</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{row.revenue.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-gray-500">{row.revPct}%</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{row.confirmed.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-gray-500">{row.confPct}%</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{row.newPat}</td>
                  <td className="py-2.5 px-2 text-right text-gray-500">{row.newPct}%</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{row.unitCost.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{row.minishConfirm.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="py-2.5 px-2 text-gray-900">총합계</td>
                <td className="py-2.5 px-2 text-right text-gray-900 tabular-nums">
                  {kpiSummary.channelKpi.reduce((s, r) => s + r.revenue, 0).toLocaleString()}
                </td>
                <td className="py-2.5 px-2 text-right text-gray-500">100%</td>
                <td className="py-2.5 px-2 text-right text-gray-900 tabular-nums">
                  {kpiSummary.channelKpi.reduce((s, r) => s + r.confirmed, 0).toLocaleString()}
                </td>
                <td className="py-2.5 px-2 text-right text-gray-500">100%</td>
                <td className="py-2.5 px-2 text-right text-gray-900 tabular-nums">
                  {kpiSummary.channelKpi.reduce((s, r) => s + r.newPat, 0)}
                </td>
                <td className="py-2.5 px-2 text-right text-gray-500">100%</td>
                <td className="py-2.5 px-2 text-right text-gray-900 tabular-nums">
                  {Math.round(kpiSummary.channelKpi.reduce((s, r) => s + r.revenue, 0) / kpiSummary.channelKpi.reduce((s, r) => s + r.newPat, 0)).toLocaleString()}
                </td>
                <td className="py-2.5 px-2 text-right text-gray-900 tabular-nums">
                  {Math.round(kpiSummary.channelKpi.reduce((s, r) => s + r.minishConfirm * r.newPat, 0) / kpiSummary.channelKpi.reduce((s, r) => s + r.newPat, 0)).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
