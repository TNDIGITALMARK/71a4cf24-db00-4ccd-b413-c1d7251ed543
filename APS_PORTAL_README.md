# APS AI Strategy Portal

A secure, WCAG 2.1 AA-compliant internal portal system for Alberta Pensions Services Corporation (APS) to support its new AI Strategy & Literacy Initiative.

## Overview

The APS AI Strategy Portal is a comprehensive web application that empowers employees to contribute innovative ideas while providing leadership with comprehensive oversight and analytics.

## System Architecture

### Three Interconnected Applications

#### 1. **Idea Hub** (`/idea-hub`)
A collaborative platform where APS employees submit innovative AI or operational improvement ideas.

**Features:**
- New submission form with fields for title, description, department, impact area, and tags
- Status tracking (submitted → under review → accepted/rejected → implemented)
- Public comments for cross-department collaboration
- Advanced filtering by department, status, and keyword search
- Real-time idea list with status badges
- Like and comment functionality

#### 2. **Executive Dashboard** (`/dashboard`)
Centralized analytics dashboard for executives to monitor progress and outcomes.

**Features:**
- Key metrics cards (Total Submissions, Approval Rate, Average Review Time, Projected Savings)
- Interactive data visualizations:
  - Monthly submission volume trends (bar chart)
  - Approval and implementation rate gauges (circular progress)
  - Departmental participation breakdown (horizontal bar chart)
  - Project milestone progress trackers
- Time period filtering (Q1-Q4, yearly)
- Export functionality for PDF/Excel reports
- Real-time metric updates

#### 3. **Reviewer Console** (`/reviewer-console`)
Operational hub for designated reviewers to evaluate submitted ideas through structured workflows.

**Features:**
- Assigned idea queue with pending reviews
- Comprehensive scoring rubrics:
  - Feasibility assessment (0-10 scale)
  - Impact evaluation (0-10 scale)
  - Strategic alignment (0-10 scale)
- Integrated comment threads
- Revision request capabilities
- Tab-based navigation (Pending, Completed, All Ideas)
- Approval/rejection workflow with notes

## Design System

### Color Palette (Extracted from Design Reference)
- **Primary Dark Blue (Sidebar/Header)**: `#334155` → `hsl(215 25% 27%)`
- **Secondary Navy**: `#1e3a5f` → `hsl(213 51% 24%)`
- **Background Light**: `#f8fafc` → `hsl(210 20% 98%)`
- **Accent Blue**: `#0ea5e9` → `hsl(199 89% 48%)`
- **Success Green**: `#22c55e` → `hsl(142 71% 45%)`
- **Warning Orange**: `#f97316` → `hsl(25 95% 53%)`

### Typography
- **Font Family**: Inter (Google Fonts) with Segoe UI fallback
- **Base Size**: 14px
- **Heading Scale**:
  - H1: 24px / 600 weight
  - H2: 18px / 600 weight
  - H3: 16px / 600 weight

### Spacing System
- **8px Grid System**: All spacing follows 8px increments
- **Card Padding**: 24px
- **Section Gaps**: 24px
- **Component Spacing**: 16px

## Technical Implementation

### Core Technologies
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom design tokens
- **UI Components**: Radix UI primitives
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Component Architecture

#### Shared Components (`/src/components/aps/`)
- **APSLayout**: Main layout wrapper with sidebar and header
- **Sidebar**: Fixed navigation with mobile responsive drawer
- **Header**: Top navigation with search, notifications, and user menu
- **MetricCard**: Reusable metric display with trend indicators
- **StatusBadge**: Color-coded status indicators

#### Data Layer (`/src/lib/`)
- **types.ts**: TypeScript interfaces for Ideas, Reviews, Comments, Analytics
- **mock-data.ts**: Comprehensive mock data for all features
- **supabase/client.ts**: Supabase client configuration (ready for database integration)

### Accessibility Features (WCAG 2.1 AA)

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Focus indicators on all focusable elements
- Skip links for navigation bypass

#### ARIA Attributes
- `aria-label` on all icon buttons
- `aria-current="page"` for active navigation items
- `aria-required="true"` on required form fields
- `role="status"` on status badges
- Proper heading hierarchy (h1 → h2 → h3)

#### Color Contrast
- All text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Status badges use high-contrast color combinations
- Form inputs have clear focus states

#### Screen Reader Support
- Semantic HTML structure
- Descriptive link text
- Form labels properly associated with inputs
- Alternative text where needed

### Responsive Design

#### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

#### Mobile Features
- Collapsible sidebar with hamburger menu
- Touch-optimized form controls
- Responsive data tables that stack appropriately
- Mobile-friendly chart displays

## File Structure

```
src/
├── app/
│   ├── dashboard/         # Executive Dashboard page
│   ├── idea-hub/          # Idea Submission Hub page
│   ├── reviewer-console/  # Review Management Console page
│   ├── globals.css        # Global styles with APS design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Redirects to dashboard
├── components/
│   ├── aps/               # APS-specific components
│   │   ├── header.tsx
│   │   ├── layout.tsx
│   │   ├── metric-card.tsx
│   │   ├── sidebar.tsx
│   │   └── status-badge.tsx
│   └── ui/                # Reusable UI primitives
└── lib/
    ├── mock-data.ts       # Sample data
    ├── types.ts           # TypeScript types
    └── supabase/
        └── client.ts      # Database client
```

## Mock Data

The system includes comprehensive mock data:
- **5 Sample Ideas** across different departments and statuses
- **2 Sample Reviews** with scoring and notes
- **3 Sample Comments** demonstrating collaboration
- **Analytics Metrics** with realistic numbers
- **7 Department Metrics** with participation rates
- **9 Months of Trend Data** for visualizations

## Database Schema (Prepared for Supabase)

### Tables
- **ideas**: Stores innovation submissions with multi-tenant isolation
- **reviews**: Reviewer evaluations with scoring criteria
- **comments**: Discussion threads on ideas

### Security
- Row Level Security (RLS) enabled on all tables
- Tenant and project isolation via JWT claims
- Proper foreign key constraints
- Indexes for optimal query performance

## Usage Instructions

### Navigation
1. Access the portal at the root URL → automatically redirects to `/dashboard`
2. Use the sidebar to navigate between:
   - **Idea Hub**: Submit and browse ideas
   - **Reviewer Console**: Evaluate pending submissions
   - **Executive Dashboard**: View analytics and metrics

### Submitting an Idea
1. Navigate to Idea Hub
2. Click "Submit New Idea" button
3. Fill in required fields (title, description, department, impact area)
4. Add optional tags
5. Submit for review

### Reviewing Ideas
1. Navigate to Reviewer Console
2. Browse pending reviews in the queue
3. Click "Review Idea" on any submission
4. Score on three criteria (Feasibility, Impact, Alignment)
5. Add review notes
6. Approve or reject with feedback

### Viewing Analytics
1. Navigate to Executive Dashboard
2. View key metrics at the top
3. Explore interactive charts
4. Filter by time period
5. Export data for reports

## Security Considerations

- **Self-hosted**: Designed for APS's internal infrastructure
- **No third-party dependencies**: All data stored on internal servers
- **JWT-based authentication**: Ready for integration with APS's auth system
- **RLS policies**: Database-level security enforcement
- **HTTPS enforced**: Secure communication channels

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Footer Attribution

All pages include the footer label:
> "Powered by Humanik Zylo — AI-generated UI, built securely within APS's environment."

## Future Enhancements

The modular architecture supports seamless integration of:
- Advanced reporting modules
- Automated workflow engines
- Integration APIs for existing APS systems
- Employee training modules
- Innovation challenge campaigns
- Cross-departmental collaboration tools
- Real-time notifications
- Advanced AI integration features

## Performance Optimizations

- Server-side rendering for initial page loads
- Component code-splitting for faster loading
- Optimized images and assets
- Efficient chart rendering with Recharts
- Lazy loading for modal dialogs
- Responsive image loading

## Maintenance

The codebase follows industry best practices:
- TypeScript for type safety
- Component-based architecture for reusability
- Consistent naming conventions
- Comprehensive inline documentation
- Modular structure for easy maintenance
- Clear separation of concerns

---

**Version**: 1.0.0
**Built with**: Next.js 15.5.2, TypeScript 5, Tailwind CSS 4
**Last Updated**: October 2024
