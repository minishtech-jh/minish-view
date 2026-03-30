import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'
import { InfoTooltip } from '../components/InfoTooltip'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { searchTrafficData } from '../data/mock'

const totalSessions = searchTrafficData.trafficSources.reduce((s, t) => s + t.sessions, 0)
const totalNewUsers = searchTrafficData.trafficSources.reduce((s, t) => s + t.newUsers, 0)
const avgBounce = (searchTrafficData.trafficSources.reduce((s, t) => s + t.bounceRate * t.sessions, 0) / totalSessions).toFixed(1)

const SOURCE_COLORS: Record<string, string> = {
  organic: '#22c55e',
  paid: '#3b82f6',
  social: '#ec4899',
  direct: '#f59e0b',
}

export function SearchTrafficPage() {
  return (
    <div className="p-6 lg:p-8 pb-24 lg:pb-8 space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">외부 검색/유입 추이</h1>
        <InfoTooltip size={16} text="자연 검색, 유료 광고, 소셜, 직접 유입 등 외부 채널별 트래픽 현황과 주간 추이를 분석합니다. 주요 키워드 검색량과 유입 소스별 성과도 확인할 수 있습니다." />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '총 세션수', value: totalSessions.toLocaleString() },
          { label: '신규 방문자', value: totalNewUsers.toLocaleString() },
          { label: '평균 이탈률', value: `${avgBounce}%` },
          { label: '추적 키워드', value: `${searchTrafficData.keywords.length}개` },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
            <p className="text-xs text-gray-500 font-medium mb-2">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* 주간 트래픽 추이 */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">주간 유입 추이</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={searchTrafficData.weeklyTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Area type="monotone" dataKey="organic" name="자연 검색" stroke={SOURCE_COLORS.organic} fill={SOURCE_COLORS.organic} fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="paid" name="유료 광고" stroke={SOURCE_COLORS.paid} fill={SOURCE_COLORS.paid} fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="social" name="소셜" stroke={SOURCE_COLORS.social} fill={SOURCE_COLORS.social} fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="direct" name="직접 유입" stroke={SOURCE_COLORS.direct} fill={SOURCE_COLORS.direct} fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 키워드 순위 */}
        <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">주요 키워드 검색량</h2>
          <div className="space-y-3">
            {searchTrafficData.keywords.map((kw, i) => {
              const maxVolume = Math.max(...searchTrafficData.keywords.map(k => k.volume))
              return (
                <div key={kw.keyword}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded flex items-center justify-center bg-gray-100 text-[10px] font-bold text-gray-500">
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium text-gray-800">{kw.keyword}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 tabular-nums">{kw.volume.toLocaleString()}</span>
                      <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${kw.change > 0 ? 'text-up' : 'text-down'}`}>
                        {kw.change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {kw.change > 0 ? '+' : ''}{kw.change}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-primary-400 h-1.5 rounded-full"
                      style={{ width: `${(kw.volume / maxVolume) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 유입 소스별 성과 */}
        <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">유입 소스별 성과</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2.5 px-2 text-gray-500 font-medium">소스</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 font-medium">세션</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 font-medium">신규</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 font-medium">이탈률</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 font-medium">평균 체류</th>
                </tr>
              </thead>
              <tbody>
                {searchTrafficData.trafficSources.map((src) => (
                  <tr key={src.source} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-2 font-medium text-gray-800 flex items-center gap-1">
                      {src.source}
                      <ExternalLink size={10} className="text-gray-300" />
                    </td>
                    <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{src.sessions.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{src.newUsers.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-right">
                      <span className={src.bounceRate < 40 ? 'text-green-600 font-semibold' : src.bounceRate < 50 ? 'text-yellow-600' : 'text-red-500'}>
                        {src.bounceRate}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">
                      {Math.floor(src.avgDuration / 60)}분 {src.avgDuration % 60}초
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
