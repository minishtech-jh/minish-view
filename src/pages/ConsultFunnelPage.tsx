import { Info } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { funnelData } from '../data/mock'

const FUNNEL_COLORS = ['#3b82f6', '#8b5cf6', '#14b8a6', '#f59e0b', '#22c55e']

export function ConsultFunnelPage() {
  return (
    <div className="p-6 lg:p-8 pb-24 lg:pb-8 space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">통합 상담 퍼널</h1>
        <Info size={16} className="text-gray-400" />
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold text-gray-900 mb-6">전환 퍼널</h2>
        <div className="flex items-end gap-3 justify-center">
          {funnelData.stages.map((stage, i) => {
            const widthPct = 30 + (stage.pct / 100) * 70
            return (
              <div key={stage.name} className="flex flex-col items-center flex-1 max-w-[180px]">
                <div className="text-center mb-2">
                  <p className="text-lg font-bold text-gray-900">{stage.count}</p>
                  <p className="text-[10px] text-gray-400">{stage.pct}%</p>
                </div>
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${20 + stage.pct * 1.5}px`,
                    backgroundColor: FUNNEL_COLORS[i],
                    width: `${widthPct}%`,
                  }}
                />
                <p className="text-xs font-medium text-gray-600 mt-2 text-center">{stage.name}</p>
                {i < funnelData.stages.length - 1 && (
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    → {Math.round((funnelData.stages[i + 1].count / stage.count) * 100)}%
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 채널별 전환 성과 */}
        <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">채널별 전환 성과</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData.conversionByChannel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: '#6b7280' }} width={40} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                <Bar dataKey="infoProvide" name="정보제공" fill="#3b82f6" radius={[0, 2, 2, 0]} />
                <Bar dataKey="visit" name="내원상담" fill="#14b8a6" radius={[0, 2, 2, 0]} />
                <Bar dataKey="agree" name="치료동의" fill="#f59e0b" radius={[0, 2, 2, 0]} />
                <Bar dataKey="payment" name="수납완료" fill="#22c55e" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">채널</th>
                  <th className="text-right py-2 px-2 text-gray-500 font-medium">정보제공</th>
                  <th className="text-right py-2 px-2 text-gray-500 font-medium">내원상담</th>
                  <th className="text-right py-2 px-2 text-gray-500 font-medium">치료동의</th>
                  <th className="text-right py-2 px-2 text-gray-500 font-medium">수납완료</th>
                  <th className="text-right py-2 px-2 text-gray-500 font-medium">전환율</th>
                </tr>
              </thead>
              <tbody>
                {funnelData.conversionByChannel.map((ch) => (
                  <tr key={ch.channel} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-800">{ch.channel}</td>
                    <td className="py-2 px-2 text-right text-gray-700 tabular-nums">{ch.infoProvide}</td>
                    <td className="py-2 px-2 text-right text-gray-700 tabular-nums">{ch.visit}</td>
                    <td className="py-2 px-2 text-right text-gray-700 tabular-nums">{ch.agree}</td>
                    <td className="py-2 px-2 text-right text-gray-700 tabular-nums">{ch.payment}</td>
                    <td className="py-2 px-2 text-right">
                      <span className={`font-semibold ${ch.rate >= 30 ? 'text-green-600' : ch.rate >= 20 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {ch.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 주간 전환 추이 */}
        <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">주간 전환 추이</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={funnelData.weeklyConversions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                <Line type="monotone" dataKey="info" name="정보제공" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="consult" name="상담예약" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="visit" name="내원상담" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="agree" name="치료동의" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="payment" name="수납완료" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 상담실장 성과 */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">상담실장별 성과</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnelData.counselorPerformance.map((c, i) => (
            <div key={c.name} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  i === 0 ? 'bg-primary-500' : i === 1 ? 'bg-primary-400' : i === 2 ? 'bg-primary-300' : 'bg-gray-400'
                }`}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                  <p className="text-[10px] text-gray-400">상담 {c.consultations}건</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">동의율</span>
                  <span className="font-semibold text-gray-900">{c.rate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${c.rate}%` }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">매출</span>
                  <span className="font-semibold text-primary-700">
                    {(c.revenue / 10000).toLocaleString()}만원
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
