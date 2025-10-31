'use client';

import { useState } from 'react';
import { APSLayout } from '@/components/aps/layout';
import { StatusBadge } from '@/components/aps/status-badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { mockIdeas, mockReviews, mockComments } from '@/lib/mock-data';
import { Idea } from '@/lib/types';
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  MessageSquareIcon,
  AlertCircleIcon,
  ClipboardListIcon,
} from 'lucide-react';

export default function ReviewerConsolePage() {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  // Filter ideas that need review
  const pendingReviews = mockIdeas.filter(
    (idea) => idea.status === 'submitted' || idea.status === 'under_review'
  );

  const handleOpenReview = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsReviewDialogOpen(true);
  };

  return (
    <APSLayout title="Reviewer Console">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold">
                    {pendingReviews.length}
                  </p>
                </div>
                <ClockIcon className="h-8 w-8 text-[hsl(var(--warning))]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                    Approved
                  </p>
                  <p className="text-2xl font-bold">
                    {mockIdeas.filter((i) => i.status === 'accepted').length}
                  </p>
                </div>
                <CheckCircle2Icon className="h-8 w-8 text-[hsl(var(--success))]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                    Rejected
                  </p>
                  <p className="text-2xl font-bold">
                    {mockIdeas.filter((i) => i.status === 'rejected').length}
                  </p>
                </div>
                <XCircleIcon className="h-8 w-8 text-[hsl(var(--destructive))]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                    Implemented
                  </p>
                  <p className="text-2xl font-bold">
                    {mockIdeas.filter((i) => i.status === 'implemented').length}
                  </p>
                </div>
                <CheckCircle2Icon className="h-8 w-8 text-[hsl(var(--accent))]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Queue */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingReviews.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
            </TabsTrigger>
            <TabsTrigger value="all">
              All Ideas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2Icon className="h-12 w-12 text-[hsl(var(--success))] mb-4" />
                  <p className="text-lg font-medium">All caught up!</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    No ideas pending review at the moment
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingReviews.map((idea) => {
                const existingReview = mockReviews.find((r) => r.idea_id === idea.id);
                const ideaComments = mockComments.filter((c) => c.idea_id === idea.id);

                return (
                  <Card key={idea.id} className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base">{idea.title}</CardTitle>
                          <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                            <span>{idea.department}</span>
                            <span>•</span>
                            <span>{idea.submitted_by}</span>
                            <span>•</span>
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
                      <p className="text-sm leading-relaxed">
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

                      {existingReview && (
                        <div className="rounded-lg bg-[hsl(var(--muted))] p-4">
                          <p className="text-sm font-medium mb-2">Previous Review</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-[hsl(var(--muted-foreground))]">Feasibility:</span>
                              <span className="ml-2 font-medium">{existingReview.feasibility_score}/10</span>
                            </div>
                            <div>
                              <span className="text-[hsl(var(--muted-foreground))]">Impact:</span>
                              <span className="ml-2 font-medium">{existingReview.impact_score}/10</span>
                            </div>
                            <div>
                              <span className="text-[hsl(var(--muted-foreground))]">Alignment:</span>
                              <span className="ml-2 font-medium">{existingReview.alignment_score}/10</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 border-t pt-3">
                        <Button
                          onClick={() => handleOpenReview(idea)}
                          className="gap-2"
                        >
                          <ClipboardListIcon className="h-4 w-4" />
                          Review Idea
                        </Button>

                        <Button variant="outline" size="sm" className="gap-2">
                          <MessageSquareIcon className="h-4 w-4" />
                          {ideaComments.length} Comments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {mockIdeas
              .filter((idea) => idea.status === 'accepted' || idea.status === 'rejected')
              .map((idea) => (
                <Card key={idea.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{idea.title}</CardTitle>
                      <StatusBadge status={idea.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      Reviewed on{' '}
                      {new Date(idea.updated_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {mockIdeas.map((idea) => (
              <Card key={idea.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{idea.title}</CardTitle>
                    <StatusBadge status={idea.status} />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Idea</DialogTitle>
              <DialogDescription>
                Evaluate this idea based on feasibility, impact, and strategic alignment
              </DialogDescription>
            </DialogHeader>

            {selectedIdea && (
              <div className="space-y-6 mt-4">
                {/* Idea Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold">{selectedIdea.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {selectedIdea.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">{selectedIdea.department}</Badge>
                    <Badge variant="secondary">{selectedIdea.impact_area}</Badge>
                  </div>
                </div>

                {/* Scoring Criteria */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Feasibility Score</Label>
                      <span className="text-sm font-medium">8/10</span>
                    </div>
                    <Slider
                      defaultValue={[8]}
                      max={10}
                      step={1}
                      className="w-full"
                      aria-label="Feasibility score"
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      How practical is this idea to implement?
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Impact Score</Label>
                      <span className="text-sm font-medium">9/10</span>
                    </div>
                    <Slider
                      defaultValue={[9]}
                      max={10}
                      step={1}
                      className="w-full"
                      aria-label="Impact score"
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      What is the potential benefit to APS?
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Strategic Alignment Score</Label>
                      <span className="text-sm font-medium">8/10</span>
                    </div>
                    <Slider
                      defaultValue={[8]}
                      max={10}
                      step={1}
                      className="w-full"
                      aria-label="Strategic alignment score"
                    />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      How well does this align with our AI strategy?
                    </p>
                  </div>
                </div>

                {/* Review Notes */}
                <div className="space-y-2">
                  <Label htmlFor="review-notes">Review Notes</Label>
                  <Textarea
                    id="review-notes"
                    placeholder="Provide feedback and recommendations..."
                    rows={4}
                  />
                </div>

                {/* Revision Request */}
                <div className="flex items-start space-x-2 rounded-lg border p-4">
                  <Checkbox id="revision" />
                  <div className="space-y-1">
                    <label
                      htmlFor="revision"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Request revisions
                    </label>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      Ask the submitter to provide more details or make changes
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsReviewDialogOpen(false)}
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    className="text-[hsl(var(--destructive))]"
                  >
                    <XCircleIcon className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button>
                    <CheckCircle2Icon className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </APSLayout>
  );
}
