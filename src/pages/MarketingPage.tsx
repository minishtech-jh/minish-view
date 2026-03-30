import { InfoTooltip } from '../components/InfoTooltip'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { marketingData } from '../data/mock'

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b']

const totalSpend = marketingData.channels.reduce((s, c) => s + c.spend, 0)
const totalRevenue = marketingData.channels.reduce((s, c) => s + c.revenue, 0)
const totalConversions = marketingData.channels.reduce((s, c) => s + c.conversions, 0)
const avgRoas = Math.round(totalRevenue / totalSpend * 100)

const spendPie = marketingData.channels.map((c) => ({
  name: c.name,
  value: c.spend,
}))

export function MarketingPage() {
  return (
    <div className="p-6 lg:p-8 pb-24 lg:pb-8 space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">채널별 마케팅 성과</h1>
        <InfoTooltip size={16} text="네이버, 구글, 인스타그램 등 광고 채널별 비용 대비 성과(ROAS)를 분석합니다. 광고비 추이, 비중, CTR, CPA 등 상세 지표를 확인할 수 있습니다." />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '총 광고비', value: `${(totalSpend / 10000).toLocaleString()}만원`, color: 'bg-red-50 text-red-600' },
          { label: '총 매출', value: `${(totalRevenue / 10000).toLocaleString()}만원`, color: 'bg-green-50 text-green-600' },
          { label: '총 전환수', value: `${totalConversions}건`, color: 'bg-blue-50 text-blue-600' },
          { label: '평균 ROAS', value: `${avgRoas}%`, color: 'bg-purple-50 text-purple-600' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
            <p className="text-xs text-gray-500 font-medium mb-2">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 월별 채널 광고비 추이 */}
        <div className="xl:col-span-2 bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">월별 채널 광고비 추이</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={marketingData.monthlySpend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                <Tooltip
                  formatter={(value: any) => `${Number(value).toLocaleString()}원`}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="naver" name="네이버" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="google" name="구글" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="instagram" name="인스타그램" fill="#ec4899" radius={[2, 2, 0, 0]} />
                <Bar dataKey="blog" name="블로그" fill="#14b8a6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="youtube" name="유튜브" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 광고비 비중 */}
        <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">광고비 비중</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={spendPie}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  dataKey="value"
                  stroke="none"
                >
                  {spendPie.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => `${Number(value).toLocaleString()}원`}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {spendPie.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-900 font-medium tabular-nums">
                  {Math.round(item.value / totalSpend * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 채널별 성과 테이블 */}
      <div className="bg-white rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">채널별 상세 성과</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2.5 px-2 text-gray-500 font-medium">채널</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">광고비</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">노출수</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">클릭수</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">
                  <span className="inline-flex items-center gap-1">CTR <InfoTooltip text="클릭률(Click Through Rate). 노출수 대비 클릭수의 비율로, 광고가 얼마나 관심을 끌었는지를 나타냅니다." /></span>
                </th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">
                  <span className="inline-flex items-center gap-1">전환수 <InfoTooltip text="광고를 통해 실제 상담 신청, 예약 등 목표 행동을 완료한 건수입니다." /></span>
                </th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">
                  <span className="inline-flex items-center gap-1">CPA <InfoTooltip text="전환당 비용(Cost Per Acquisition). 전환 1건을 획득하는 데 소요된 평균 광고비입니다. 낮을수록 효율적입니다." /></span>
                </th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">매출</th>
                <th className="text-right py-2.5 px-2 text-gray-500 font-medium">
                  <span className="inline-flex items-center gap-1">ROAS <InfoTooltip text="광고 수익률(Return On Ad Spend). 광고비 대비 매출의 비율로, 100% 이상이면 광고비 이상의 매출을 올린 것입니다." /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {marketingData.channels.map((ch, i) => (
                <tr key={ch.name} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="font-medium text-gray-800">{ch.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{ch.spend.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{ch.impressions.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{ch.clicks.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className={ch.ctr >= 3 ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                      {ch.ctr}%
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{ch.conversions}</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{ch.cpa.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-gray-700 tabular-nums">{ch.revenue.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className={`font-semibold ${ch.roas >= 2000 ? 'text-green-600' : ch.roas >= 1500 ? 'text-yellow-600' : 'text-red-500'}`}>
                      {ch.roas}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
