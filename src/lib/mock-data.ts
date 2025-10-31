import { Idea, Review, Comment, AnalyticsMetrics, DepartmentMetrics, MonthlyTrend } from './types';

// Mock Ideas Data
export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI Chatbot for Member Services',
    description: 'Implement an AI-powered chatbot to handle common member inquiries, reducing wait times and improving member satisfaction. The chatbot would be trained on our knowledge base and could handle password resets, balance inquiries, and general pension questions.',
    department: 'Customer Operations',
    impact_area: 'Member Experience',
    tags: ['AI', 'Automation', 'Customer Service'],
    status: 'under_review',
    submitted_by: 'Sarah Johnson',
    submitted_at: '2024-10-15T10:30:00Z',
    created_at: '2024-10-15T10:30:00Z',
    updated_at: '2024-10-20T14:15:00Z'
  },
  {
    id: '2',
    title: 'Automated Pension Calculation Verification',
    description: 'Develop an automated system to cross-verify pension calculations using machine learning, ensuring accuracy and reducing manual review time. This would catch calculation errors before they reach members.',
    department: 'Actuarial',
    impact_area: 'Operational Efficiency',
    tags: ['ML', 'Verification', 'Risk Management'],
    status: 'accepted',
    submitted_by: 'Michael Chen',
    submitted_at: '2024-10-10T09:00:00Z',
    created_at: '2024-10-10T09:00:00Z',
    updated_at: '2024-10-25T16:45:00Z'
  },
  {
    id: '3',
    title: 'Predictive Analytics for Retirement Planning',
    description: 'Create predictive models to help members optimize their retirement planning based on current market conditions, life expectancy data, and personal financial situations.',
    department: 'Data Analytics',
    impact_area: 'Member Value',
    tags: ['Predictive Analytics', 'Financial Planning', 'AI'],
    status: 'implemented',
    submitted_by: 'Jennifer Wong',
    submitted_at: '2024-09-05T11:20:00Z',
    created_at: '2024-09-05T11:20:00Z',
    updated_at: '2024-10-30T10:00:00Z'
  },
  {
    id: '4',
    title: 'Document Processing Automation',
    description: 'Implement OCR and NLP to automatically process and categorize incoming documents, reducing manual data entry time by approximately 60%.',
    department: 'Operations',
    impact_area: 'Process Improvement',
    tags: ['OCR', 'NLP', 'Automation'],
    status: 'submitted',
    submitted_by: 'Robert Martinez',
    submitted_at: '2024-10-28T14:00:00Z',
    created_at: '2024-10-28T14:00:00Z',
    updated_at: '2024-10-28T14:00:00Z'
  },
  {
    id: '5',
    title: 'Fraud Detection System Enhancement',
    description: 'Upgrade our fraud detection system with advanced AI algorithms that can identify suspicious patterns in real-time, protecting member accounts more effectively.',
    department: 'Security & Compliance',
    impact_area: 'Risk Management',
    tags: ['Security', 'AI', 'Fraud Detection'],
    status: 'under_review',
    submitted_by: 'Lisa Anderson',
    submitted_at: '2024-10-22T08:30:00Z',
    created_at: '2024-10-22T08:30:00Z',
    updated_at: '2024-10-27T09:15:00Z'
  }
];

// Mock Reviews Data
export const mockReviews: Review[] = [
  {
    id: 'r1',
    idea_id: '1',
    reviewer_id: 'reviewer1',
    reviewer_name: 'David Thompson',
    feasibility_score: 8,
    impact_score: 9,
    alignment_score: 8,
    review_notes: 'Strong proposal with clear ROI. Recommend pilot program in Q1.',
    revision_requested: false,
    revision_notes: '',
    status: 'completed',
    created_at: '2024-10-20T10:00:00Z',
    updated_at: '2024-10-20T14:15:00Z'
  },
  {
    id: 'r2',
    idea_id: '2',
    reviewer_id: 'reviewer2',
    reviewer_name: 'Emily Parker',
    feasibility_score: 9,
    impact_score: 10,
    alignment_score: 9,
    review_notes: 'Excellent alignment with our accuracy goals. Approved for implementation.',
    revision_requested: false,
    revision_notes: '',
    status: 'approved',
    created_at: '2024-10-25T09:00:00Z',
    updated_at: '2024-10-25T16:45:00Z'
  }
];

// Mock Comments Data
export const mockComments: Comment[] = [
  {
    id: 'c1',
    idea_id: '1',
    author_id: 'user1',
    author_name: 'Tom Wilson',
    content: 'Great idea! We should also consider integrating this with our mobile app.',
    created_at: '2024-10-16T11:30:00Z',
    updated_at: '2024-10-16T11:30:00Z'
  },
  {
    id: 'c2',
    idea_id: '1',
    author_id: 'user2',
    author_name: 'Sarah Johnson',
    content: 'Thanks Tom! Mobile integration is definitely on the roadmap.',
    created_at: '2024-10-16T15:45:00Z',
    updated_at: '2024-10-16T15:45:00Z'
  },
  {
    id: 'c3',
    idea_id: '2',
    author_id: 'user3',
    author_name: 'Mark Stevens',
    content: 'This could save us significant audit time. Have you considered integration with our existing validation systems?',
    created_at: '2024-10-12T09:20:00Z',
    updated_at: '2024-10-12T09:20:00Z'
  }
];

// Mock Analytics Data
export const mockAnalytics: AnalyticsMetrics = {
  total_submissions: 247,
  approval_rate: 34,
  average_review_time: 8,
  projected_savings: 1200000
};

export const mockDepartmentMetrics: DepartmentMetrics[] = [
  { department: 'Customer Operations', submission_count: 45, approval_rate: 38 },
  { department: 'Actuarial', submission_count: 32, approval_rate: 41 },
  { department: 'Data Analytics', submission_count: 28, approval_rate: 46 },
  { department: 'Operations', submission_count: 52, approval_rate: 29 },
  { department: 'Security & Compliance', submission_count: 21, approval_rate: 33 },
  { department: 'IT', submission_count: 38, approval_rate: 35 },
  { department: 'Finance', submission_count: 31, approval_rate: 32 }
];

export const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Jan', submissions: 18, approvals: 6 },
  { month: 'Feb', submissions: 22, approvals: 8 },
  { month: 'Mar', submissions: 25, approvals: 9 },
  { month: 'Apr', submissions: 20, approvals: 7 },
  { month: 'May', submissions: 28, approvals: 10 },
  { month: 'Jun', submissions: 32, approvals: 12 },
  { month: 'Jul', submissions: 30, approvals: 11 },
  { month: 'Aug', submissions: 35, approvals: 13 },
  { month: 'Sep', submissions: 37, approvals: 12 }
];

// Department options for forms
export const departments = [
  'Customer Operations',
  'Actuarial',
  'Data Analytics',
  'Operations',
  'Security & Compliance',
  'IT',
  'Finance',
  'HR',
  'Legal'
];

// Impact area options
export const impactAreas = [
  'Member Experience',
  'Operational Efficiency',
  'Cost Reduction',
  'Risk Management',
  'Process Improvement',
  'Member Value',
  'Technology Innovation',
  'Compliance'
];
