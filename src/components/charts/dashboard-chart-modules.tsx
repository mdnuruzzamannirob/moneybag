'use client'

import { useMemo } from 'react'

import { EChartCanvas } from '@/components/charts/echart-canvas'
import type {
  DistributionItem,
  IncomeExpensePoint,
  UserGrowthPoint,
} from '@/types/dashboard-models'

const axisLabel = { color: '#94a3b8', fontSize: 11 }
const splitLine = { lineStyle: { color: 'rgba(148,163,184,.22)', type: 'dashed' as const } }
const tooltip = {
  trigger: 'axis' as const,
  backgroundColor: '#0f172a',
  borderWidth: 0,
  textStyle: { color: '#f8fafc', fontSize: 12 },
}

export function IncomeExpenseChartModule({
  data,
}: {
  data: IncomeExpensePoint[]
}) {
  const option = useMemo(
    () => ({
      animationDuration: 550,
      color: ['#10b981', '#ef4444'],
      grid: { left: 8, right: 8, top: 16, bottom: 32, containLabel: true },
      legend: {
        bottom: 0,
        left: 'center',
        itemWidth: 9,
        itemHeight: 9,
        textStyle: axisLabel,
      },
      tooltip: {
        ...tooltip,
        valueFormatter: (value: number) => `৳${value.toLocaleString('en-US')}`,
      },
      xAxis: {
        type: 'category' as const,
        data: data.map((point) => point.label),
        axisLabel,
        axisLine: { lineStyle: { color: 'rgba(148,163,184,.3)' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value' as const,
        axisLabel: {
          ...axisLabel,
          formatter: (value: number) =>
            value >= 1000 ? `${value / 1000}k` : value,
        },
        splitLine,
      },
      series: [
        {
          name: 'Income',
          type: 'bar' as const,
          data: data.map((point) => point.income),
          barMaxWidth: 14,
          itemStyle: { borderRadius: [4, 4, 0, 0] },
        },
        {
          name: 'Expense',
          type: 'bar' as const,
          data: data.map((point) => point.expense),
          barMaxWidth: 14,
          itemStyle: { borderRadius: [4, 4, 0, 0] },
        },
      ],
    }),
    [data],
  )

  return (
    <EChartCanvas
      ariaLabel="Income and expense grouped bar chart"
      option={option}
    />
  )
}

export function DistributionChartModule({
  data,
  centerLabel,
  centerValue,
  valuePrefix,
}: {
  data: DistributionItem[]
  centerLabel: string
  centerValue: string
  valuePrefix: string
}) {
  const option = useMemo(
    () => ({
      animationDuration: 550,
      color: data.map((item) => item.color),
      tooltip: {
        trigger: 'item' as const,
        backgroundColor: '#0f172a',
        borderWidth: 0,
        textStyle: { color: '#f8fafc', fontSize: 12 },
        valueFormatter: (value: number) =>
          `${valuePrefix}${value.toLocaleString('en-US')}`,
      },
      title: {
        text: centerValue,
        subtext: centerLabel,
        left: '34%',
        top: '39%',
        textAlign: 'center' as const,
        textStyle: { color: '#94a3b8', fontSize: 18, fontWeight: 600 },
        subtextStyle: { color: '#64748b', fontSize: 11 },
      },
      legend: {
        orient: 'vertical' as const,
        right: 0,
        top: 'middle',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 13,
        formatter: (name: string) => `{name|${name}}`,
        textStyle: {
          ...axisLabel,
          rich: {
            name: { color: '#64748b', fontSize: 11 },
          },
        },
      },
      series: [
        {
          name: centerLabel,
          type: 'pie' as const,
          radius: ['56%', '78%'],
          center: ['34%', '50%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: { scaleSize: 5 },
          data,
        },
      ],
    }),
    [centerLabel, centerValue, data, valuePrefix],
  )

  return (
    <EChartCanvas
      ariaLabel={`${centerLabel} donut chart`}
      className="h-64"
      option={option}
    />
  )
}

export function UserGrowthChartModule({
  data,
}: {
  data: UserGrowthPoint[]
}) {
  const option = useMemo(
    () => ({
      animationDuration: 600,
      color: ['#6366f1'],
      grid: { left: 8, right: 12, top: 18, bottom: 4, containLabel: true },
      tooltip: {
        ...tooltip,
        valueFormatter: (value: number) =>
          `${value.toLocaleString('en-US')} users`,
      },
      xAxis: {
        type: 'category' as const,
        boundaryGap: false,
        data: data.map((point) => point.label),
        axisLabel,
        axisLine: { lineStyle: { color: 'rgba(148,163,184,.3)' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value' as const,
        axisLabel,
        splitLine,
      },
      series: [
        {
          name: 'New users',
          type: 'line' as const,
          smooth: 0.35,
          symbol: 'circle',
          symbolSize: 7,
          lineStyle: { width: 3 },
          itemStyle: { borderWidth: 2, borderColor: '#ffffff' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(99,102,241,.32)' },
                { offset: 1, color: 'rgba(99,102,241,.02)' },
              ],
            },
          },
          data: data.map((point) => point.users),
        },
      ],
    }),
    [data],
  )

  return <EChartCanvas ariaLabel="Monthly user growth line chart" option={option} />
}
