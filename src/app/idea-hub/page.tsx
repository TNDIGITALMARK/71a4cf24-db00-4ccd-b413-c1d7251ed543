'use client';

import { useState } from 'react';
import { APSLayout } from '@/components/aps/layout';
import { StatusBadge } from '@/components/aps/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockIdeas, departments, impactAreas } from '@/lib/mock-data';
import { Idea, IdeaStatus } from '@/lib/types';
import { PlusIcon, SearchIcon, FilterIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

export default function IdeaHubPage() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  // Filter ideas
  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || idea.status === statusFilter;
    const matchesDepartment =
      departmentFilter === 'all' || idea.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <APSLayout title="Idea Hub">
      <div className="space-y-6">
        {/* Hero Banner with Collaboration Imagery */}
        <div
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--primary))] p-8"
          style={{
            backgroundImage: 'url(/generated/collaboration-banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">Idea Hub</h2>
            <p className="text-white/90 max-w-2xl">
              Share your innovative AI and operational improvement ideas
            </p>
          </div>
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--secondary))]/85 to-[hsl(var(--primary))]/70" />
        </div>

        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Collaborate, innovate, and transform ideas into action
            </p>
          </div>

          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" aria-label="Submit new idea">
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                Submit New Idea
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submit New Idea</DialogTitle>
                <DialogDescription>
                  Share your innovative proposal with the APS team. All fields are required.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="idea-title">Idea Title *</Label>
                  <Input
                    id="idea-title"
                    placeholder="e.g., AI Chatbot for Member Services"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idea-description">Detailed Description *</Label>
                  <Textarea
                    id="idea-description"
                    placeholder="Describe your idea in detail, including expected benefits and implementation approach..."
                    rows={6}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select required>
                      <SelectTrigger id="department" aria-required="true">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="impact-area">Impact Area *</Label>
                    <Select required>
                      <SelectTrigger id="impact-area" aria-required="true">
                        <SelectValue placeholder="Select impact area" />
                      </SelectTrigger>
                      <SelectContent>
                        {impactAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., AI, Automation, Customer Service"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSubmitDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Idea</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">
                  Search ideas
                </Label>
                <div className="relative">
                  <SearchIcon
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                    aria-hidden="true"
                  />
                  <Input
                    id="search"
                    type="search"
                    placeholder="Search by keyword, tag, or description..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search ideas"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as IdeaStatus | 'all')}
                >
                  <SelectTrigger className="w-[180px]" aria-label="Filter by status">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="implemented">Implemented</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-[180px]" aria-label="Filter by department">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideas List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Recent Ideas ({filteredIdeas.length})
            </h2>
          </div>

          <div className="grid gap-4">
            {filteredIdeas.map((idea) => (
              <Card key={idea.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-base">{idea.title}</CardTitle>
                      <CardDescription className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                        <span>{idea.department}</span>
                        <span className="text-[hsl(var(--muted-foreground))]">•</span>
                        <span>{idea.submitted_by}</span>
                        <span className="text-[hsl(var(--muted-foreground))]">•</span>
                        <span>
                          {new Date(idea.submitted_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </CardDescription>
                    </div>
                    <StatusBadge status={idea.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{idea.impact_area}</Badge>
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 border-t pt-3">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUpIcon className="h-4 w-4" aria-hidden="true" />
                      <span>Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquareIcon className="h-4 w-4" aria-hidden="true" />
                      <span>Comment</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-48 h-48 mb-4">
                  <img
                    src="/generated/empty-state.png"
                    alt="No results found"
                    className="w-full h-full object-contain opacity-50"
                  />
                </div>
                <p className="text-[hsl(var(--muted-foreground))] text-lg font-medium">
                  No ideas found matching your filters
                </p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm mt-2">
                  Try adjusting your search criteria or submit a new idea
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </APSLayout>
  );
}
