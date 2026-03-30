// ── Main KPI 분석 데이터 ──

export const kpiSummary = {
  period: '26/03/01 ~ 26/03/11',
  hospital: '미니쉬치과병원',
  baseMonth: '26/03',
  prevPeriod: [
    { label: '광고비', current: 7_235_693, prev: 16_710_183, change: -56.70, unit: '원' },
    { label: '매출액', current: 633_798_760, prev: 536_875_552, change: 18.05, unit: '원' },
    { label: '확정금액', current: 307_350_000, prev: 380_899_921, change: -19.31, unit: '원' },
    { label: '정보제공수', current: 80, prev: 104, change: -23.08, unit: '건' },
    { label: '신환수', current: 120, prev: 112, change: 7.14, unit: '명' },
    { label: '미니쉬내원 신환수', current: 89, prev: 85, change: 4.71, unit: '명' },
    { label: '미니쉬위드의 신환수', current: 22, prev: 27, change: -18.52, unit: '명' },
    { label: '진료적단가', current: 4_454_348, prev: 3_526_851, change: 26.30, unit: '원' },
  ],
  dailyAvg: [
    { label: '광고비', avg: 628_976, base: 945_937, change: 50.39 },
    { label: '매출액', avg: 55_850_739, base: 75_291_370, change: -34.81 },
    { label: '확정금액', avg: 30_735_000, base: 0, change: 100 },
    { label: '신환수', avg: 10, base: 16, change: -60.0 },
    { label: '미니쉬내원 신환수', avg: 8, base: 14, change: -75.0 },
    { label: '미니쉬위드의 신환수', avg: 2, base: 0, change: 100 },
    { label: '진료적단가', avg: 4_454_348, base: 0, change: 100 },
  ],
  mainKpis: [
    { label: '매출액', pct: 25.4, target: '2,500,000,000원', current: '633,798,760원' },
    { label: '확정금액', pct: 12.3, target: '2,500,000,000원', current: '307,350,000원' },
    { label: '정보제공수', pct: 14.8, target: '540건', current: '80건' },
    { label: '신환수', pct: 57.1, target: '210건', current: '120건' },
    { label: '미니쉬내원 신환수', pct: 42.4, target: '210건', current: '89건' },
    { label: '미니쉬위드의 신환수', pct: 18.3, target: '120건', current: '22건' },
  ],
  monthlyTrend: [
    { month: '25/09', ad: 39, referral: 32, partner: 8, other: 0 },
    { month: '25/10', ad: 139, referral: 140, partner: 38, other: 0 },
    { month: '25/11', ad: 226, referral: 236, partner: 122, other: 0 },
    { month: '25/12', ad: 189, referral: 163, partner: 26, other: 6 },
    { month: '26/01', ad: 207, referral: 130, partner: 26, other: 26 },
    { month: '26/02', ad: 184, referral: 96, partner: 25, other: 20 },
    { month: '26/03', ad: 68, referral: 37, partner: 9, other: 154 },
  ],
  channelKpi: [
    { channel: '광고', revenue: 266_612_980, revPct: 42.07, confirmed: 156_480_000, confPct: 50.91, newPat: 68, newPct: 56.67, minishNew: 51, minishPct: 57.30, withNew: 15, withPct: 68.18, unitCost: 3_639_070, minishConfirm: 5_178_667 },
    { channel: '소개', revenue: 212_018_880, revPct: 33.45, confirmed: 119_170_000, confPct: 38.77, newPat: 37, newPct: 30.83, minishNew: 28, minishPct: 31.46, withNew: 6, withPct: 27.27, unitCost: 5_416_818, minishConfirm: 11_468_333 },
    { channel: '협력', revenue: 154_817_400, revPct: 24.43, confirmed: 31_600_000, confPct: 10.28, newPat: 9, newPct: 7.50, minishNew: 8, minishPct: 8.99, withNew: 1, withPct: 4.55, unitCost: 10_533_333, minishConfirm: 8_400_000 },
    { channel: '기타', revenue: 349_500, revPct: 0.06, confirmed: 100_000, confPct: 0.03, newPat: 6, newPct: 5.00, minishNew: 2, minishPct: 2.25, withNew: 0, withPct: 0, unitCost: 100_000, minishConfirm: 0 },
  ],
}

// ── 마케팅 성과 데이터 ──

export const marketingData = {
  channels: [
    { name: '네이버 검색광고', spend: 3_200_000, impressions: 45_200, clicks: 2_150, ctr: 4.76, conversions: 32, cpa: 100_000, revenue: 85_600_000, roas: 2675 },
    { name: '구글 검색광고', spend: 1_800_000, impressions: 28_300, clicks: 1_420, ctr: 5.02, conversions: 18, cpa: 100_000, revenue: 42_300_000, roas: 2350 },
    { name: '인스타그램', spend: 1_200_000, impressions: 62_000, clicks: 980, ctr: 1.58, conversions: 8, cpa: 150_000, revenue: 18_400_000, roas: 1533 },
    { name: '네이버 블로그', spend: 500_000, impressions: 15_600, clicks: 620, ctr: 3.97, conversions: 5, cpa: 100_000, revenue: 12_800_000, roas: 2560 },
    { name: '유튜브', spend: 535_693, impressions: 18_900, clicks: 340, ctr: 1.80, conversions: 5, cpa: 107_139, revenue: 8_200_000, roas: 1531 },
  ],
  monthlySpend: [
    { month: '25/10', naver: 2_800_000, google: 1_500_000, instagram: 900_000, blog: 400_000, youtube: 400_000 },
    { month: '25/11', naver: 3_100_000, google: 1_700_000, instagram: 1_100_000, blog: 450_000, youtube: 500_000 },
    { month: '25/12', naver: 2_900_000, google: 1_600_000, instagram: 1_000_000, blog: 480_000, youtube: 450_000 },
    { month: '26/01', naver: 3_000_000, google: 1_650_000, instagram: 1_050_000, blog: 500_000, youtube: 480_000 },
    { month: '26/02', naver: 3_300_000, google: 1_900_000, instagram: 1_250_000, blog: 520_000, youtube: 550_000 },
    { month: '26/03', naver: 3_200_000, google: 1_800_000, instagram: 1_200_000, blog: 500_000, youtube: 536_000 },
  ],
}

// ── 검색/유입 추이 데이터 ──

export const searchTrafficData = {
  keywords: [
    { keyword: '미니쉬치과', volume: 2_450, change: 12.3, rank: 1 },
    { keyword: '강남 임플란트', volume: 1_820, change: -5.2, rank: 3 },
    { keyword: '미니쉬 라미네이트', volume: 1_340, change: 22.1, rank: 2 },
    { keyword: '강남 치과 추천', volume: 980, change: 8.7, rank: 5 },
    { keyword: '미니쉬 후기', volume: 760, change: 15.4, rank: 4 },
    { keyword: '치아 성형', volume: 650, change: -3.1, rank: 8 },
  ],
  trafficSources: [
    { source: '네이버 검색', sessions: 12_450, newUsers: 8_320, bounceRate: 35.2, avgDuration: 185 },
    { source: '구글 검색', sessions: 4_280, newUsers: 3_150, bounceRate: 42.1, avgDuration: 156 },
    { source: '직접 유입', sessions: 3_650, newUsers: 1_200, bounceRate: 28.4, avgDuration: 210 },
    { source: '소셜 미디어', sessions: 2_180, newUsers: 1_890, bounceRate: 55.3, avgDuration: 95 },
    { source: '외부 링크', sessions: 1_420, newUsers: 980, bounceRate: 48.6, avgDuration: 120 },
  ],
  weeklyTraffic: [
    { week: '03/01', organic: 3_200, paid: 1_800, social: 650, direct: 920 },
    { week: '03/03', organic: 3_450, paid: 1_950, social: 720, direct: 880 },
    { week: '03/05', organic: 2_980, paid: 2_100, social: 580, direct: 950 },
    { week: '03/07', organic: 3_600, paid: 1_750, social: 810, direct: 1_020 },
    { week: '03/09', organic: 3_150, paid: 2_200, social: 690, direct: 870 },
    { week: '03/11', organic: 3_400, paid: 1_900, social: 740, direct: 960 },
  ],
}

// ── 상담 퍼널 데이터 ──

export const funnelData = {
  stages: [
    { name: '정보 제공', count: 540, pct: 100 },
    { name: '상담 예약', count: 380, pct: 70.4 },
    { name: '내원 상담', count: 285, pct: 52.8 },
    { name: '치료 동의', count: 195, pct: 36.1 },
    { name: '수납 완료', count: 168, pct: 31.1 },
  ],
  conversionByChannel: [
    { channel: '광고', infoProvide: 280, consultation: 195, visit: 148, agree: 102, payment: 88, rate: 31.4 },
    { channel: '소개', infoProvide: 150, consultation: 112, visit: 89, agree: 65, payment: 58, rate: 38.7 },
    { channel: '협력', infoProvide: 85, consultation: 58, visit: 38, agree: 22, payment: 18, rate: 21.2 },
    { channel: '기타', infoProvide: 25, consultation: 15, visit: 10, agree: 6, payment: 4, rate: 16.0 },
  ],
  counselorPerformance: [
    { name: '김실장', consultations: 98, agreements: 72, rate: 73.5, revenue: 185_000_000 },
    { name: '박실장', consultations: 85, agreements: 58, rate: 68.2, revenue: 142_000_000 },
    { name: '이실장', consultations: 62, agreements: 40, rate: 64.5, revenue: 98_000_000 },
    { name: '최실장', consultations: 40, agreements: 25, rate: 62.5, revenue: 68_000_000 },
  ],
  weeklyConversions: [
    { week: '03/01', info: 85, consult: 58, visit: 42, agree: 30, payment: 26 },
    { week: '03/03', info: 92, consult: 65, visit: 48, agree: 33, payment: 28 },
    { week: '03/05', info: 78, consult: 52, visit: 38, agree: 27, payment: 24 },
    { week: '03/07', info: 95, consult: 68, visit: 52, agree: 36, payment: 31 },
    { week: '03/09', info: 88, consult: 60, visit: 45, agree: 32, payment: 28 },
    { week: '03/11', info: 102, consult: 77, visit: 60, agree: 37, payment: 31 },
  ],
}
