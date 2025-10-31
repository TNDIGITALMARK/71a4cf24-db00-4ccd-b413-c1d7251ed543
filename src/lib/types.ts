// APS AI Strategy Portal - TypeScript Types

export type IdeaStatus = 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'implemented';

export type ReviewStatus = 'pending' | 'completed' | 'approved' | 'rejected';

export interface Idea {
  id: string;
  title: string;
  description: string;
  department: string;
  impact_area: string;
  tags: string[];
  status: IdeaStatus;
  submitted_by: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  idea_id: string;
  reviewer_id: string;
  reviewer_name: string;
  feasibility_score: number;
  impact_score: number;
  alignment_score: number;
  review_notes: string;
  revision_requested: boolean;
  revision_notes: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  idea_id: string;
  parent_comment_id?: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsMetrics {
  total_submissions: number;
  approval_rate: number;
  average_review_time: number;
  projected_savings: number;
}

export interface DepartmentMetrics {
  department: string;
  submission_count: number;
  approval_rate: number;
}

export interface MonthlyTrend {
  month: string;
  submissions: number;
  approvals: number;
}
