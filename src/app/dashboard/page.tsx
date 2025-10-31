'use client';

import { APSLayout } from '@/components/aps/layout';
import { MetricCard } from '@/components/aps/metric-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { mockAnalytics, mockDepartmentMetrics, mockMonthlyTrends } from '@/lib/mock-data';
import {
  TrendingUpIcon,
  CheckCircle2Icon,
  ClockIcon,
  DollarSignIcon,
  DownloadIcon,
} from 'lucide-react';

export default function DashboardPage() {
  // Colors matching design reference
  const colors = {
    primary: '#0ea5e9',
    success: '#22c55e',
    warning: '#f97316',
    muted: '#64748b',
  };

  return (
    <APSLayout title="Executive Dashboard">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Strategic insights and program metrics for AI Strategy Initiative
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select defaultValue="q4-2024">
              <SelectTrigger className="w-[180px]" aria-label="Select time period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
                <SelectItem value="q3-2024">Q3 2024</SelectItem>
                <SelectItem value="q2-2024">Q2 2024</SelectItem>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
                <SelectItem value="2024">All 2024</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2" aria-label="Export dashboard data">
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Ideas"
            value={mockAnalytics.total_submissions}
            subtitle="Current quarter"
            icon={<TrendingUpIcon className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Approved Projects"
            value="120"
            subtitle={`${mockAnalytics.approval_rate}% approval rate`}
            icon={<CheckCircle2Icon className="h-5 w-5" />}
          />
          <MetricCard
            title="Avg Review Time"
            value={`${mockAnalytics.average_review_time} days`}
            subtitle="From submission to decision"
            icon={<ClockIcon className="h-5 w-5" />}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="Savings YTD"
            value={`$${(mockAnalytics.projected_savings / 1000000).toFixed(1)}M`}
            subtitle="Projected annual savings"
            icon={<DollarSignIcon className="h-5 w-5" />}
            trend={{ value: 18, isPositive: true }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Submission Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Idea Submission Volume</CardTitle>
              <CardDescription>Monthly trends for submissions and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockMonthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="submissions"
                    fill={colors.primary}
                    radius={[8, 8, 0, 0]}
                    name="Submissions"
                  />
                  <Bar
                    dataKey="approvals"
                    fill={colors.success}
                    radius={[8, 8, 0, 0]}
                    name="Approvals"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Approval & Implementation Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Program Success Metrics</CardTitle>
              <CardDescription>Current quarter approval and implementation rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-around py-8">
                {/* Approval Rate Gauge */}
                <div className="text-center">
                  <div className="relative inline-flex">
                    <svg className="h-32 w-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={colors.success}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.78)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">78%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                    Approval Rate
                  </p>
                </div>

                {/* Implementation Rate Gauge */}
                <div className="text-center">
                  <div className="relative inline-flex">
                    <svg className="h-32 w-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={colors.primary}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.55)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">55%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                    Implementation Rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Departmental Participation */}
          <Card>
            <CardHeader>
              <CardTitle>Departmental Participation</CardTitle>
              <CardDescription>Submission counts by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockDepartmentMetrics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="department"
                    width={150}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="submission_count"
                    fill={colors.primary}
                    radius={[0, 8, 8, 0]}
                    name="Submissions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>Ideas progressing through implementation stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: 'Q1 Planning', count: 15, color: colors.primary },
                  { stage: 'Q2 Development', count: 28, color: colors.success },
                  { stage: 'Q3 Testing', count: 12, color: colors.warning },
                  { stage: 'Q4 Deployment', count: 8, color: colors.muted },
                ].map((milestone) => (
                  <div key={milestone.stage} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{milestone.stage}</span>
                      <span className="text-[hsl(var(--muted-foreground))]">
                        {milestone.count} projects
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(milestone.count / 63) * 100}%`,
                          backgroundColor: milestone.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-[hsl(var(--muted))] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Active Projects</p>
                    <p className="text-2xl font-bold">63</p>
                  </div>
                  <CheckCircle2Icon className="h-10 w-10 text-[hsl(var(--success))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </APSLayout>
  );
}
