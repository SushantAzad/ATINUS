import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AssessmentProgressGrid = () => {
  const [sessions, setSessions] = useState([]);
  const [sortBy, setSortBy] = useState("timeRemaining");
  const [filterBy, setFilterBy] = useState("all");

  const mockSessions = [
    {
      id: "AS-2024-001",
      studentName: "Sarah Chen",
      studentAvatar:
        "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      studentAvatarAlt:
        "Professional headshot of Asian woman with shoulder-length black hair in white blouse",
      institution: "MIT College",
      assessmentType: "Coding Assessment",
      assessmentRound: "Round 2",
      progress: 75,
      timeElapsed: 68,
      timeTotal: 90,
      currentQuestion: 8,
      totalQuestions: 12,
      status: "active",
      lastActivity: new Date(Date.now() - 120000),
      needsIntervention: false,
      difficulty: "Medium",
      score: 82,
    },
    {
      id: "AS-2024-002",
      studentName: "Alex Rodriguez",
      studentAvatar:
        "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
      studentAvatarAlt:
        "Professional headshot of Hispanic man with short dark hair in navy suit",
      institution: "Stanford University",
      assessmentType: "AI Interview",
      assessmentRound: "Round 3",
      progress: 45,
      timeElapsed: 15,
      timeTotal: 30,
      currentQuestion: 3,
      totalQuestions: 8,
      status: "active",
      lastActivity: new Date(Date.now() - 30000),
      needsIntervention: true,
      difficulty: "Hard",
      score: 65,
    },
    {
      id: "AS-2024-003",
      studentName: "Emma Wilson",
      studentAvatar:
        "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      studentAvatarAlt:
        "Professional headshot of Caucasian woman with blonde hair in blue blazer",
      institution: "Harvard College",
      assessmentType: "Aptitude Test",
      assessmentRound: "Round 1",
      progress: 90,
      timeElapsed: 54,
      timeTotal: 60,
      currentQuestion: 27,
      totalQuestions: 30,
      status: "active",
      lastActivity: new Date(Date.now() - 45000),
      needsIntervention: false,
      difficulty: "Easy",
      score: 94,
    },
    {
      id: "AS-2024-004",
      studentName: "Michael Park",
      studentAvatar:
        "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      studentAvatarAlt:
        "Professional headshot of Asian man with glasses and dark hair in gray suit",
      institution: "UC Berkeley",
      assessmentType: "Coding Assessment",
      assessmentRound: "Round 2",
      progress: 30,
      timeElapsed: 25,
      timeTotal: 90,
      currentQuestion: 4,
      totalQuestions: 12,
      status: "struggling",
      lastActivity: new Date(Date.now() - 300000),
      needsIntervention: true,
      difficulty: "Hard",
      score: 45,
    },
    {
      id: "AS-2024-005",
      studentName: "Jessica Brown",
      studentAvatar:
        "https://images.unsplash.com/photo-1643921330459-6fb64282f467",
      studentAvatarAlt:
        "Professional headshot of African American woman with curly hair in white shirt",
      institution: "Yale University",
      assessmentType: "AI Interview",
      assessmentRound: "Round 3",
      progress: 100,
      timeElapsed: 28,
      timeTotal: 30,
      currentQuestion: 8,
      totalQuestions: 8,
      status: "completed",
      lastActivity: new Date(Date.now() - 600000),
      needsIntervention: false,
      difficulty: "Medium",
      score: 88,
    },
    {
      id: "AS-2024-006",
      studentName: "David Kim",
      studentAvatar:
        "https://images.unsplash.com/photo-1629272039203-7d76fdaf1324",
      studentAvatarAlt:
        "Professional headshot of Asian man with short black hair in dark suit",
      institution: "Princeton University",
      assessmentType: "Aptitude Test",
      assessmentRound: "Round 1",
      progress: 60,
      timeElapsed: 36,
      timeTotal: 60,
      currentQuestion: 18,
      totalQuestions: 30,
      status: "active",
      lastActivity: new Date(Date.now() - 90000),
      needsIntervention: false,
      difficulty: "Medium",
      score: 78,
    },
  ];

  useEffect(() => {
    setSessions(mockSessions);

    // Simulate real-time progress updates
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev?.map((session) => {
          if (session?.status === "active" && session?.progress < 100) {
            const progressIncrement = Math.random() * 5;
            const newProgress = Math.min(
              100,
              session?.progress + progressIncrement
            );
            const newTimeElapsed = Math.min(
              session?.timeTotal,
              session?.timeElapsed + 1
            );

            return {
              ...session,
              progress: newProgress,
              timeElapsed: newTimeElapsed,
              lastActivity: new Date(),
              status: newProgress >= 100 ? "completed" : session?.status,
            };
          }
          return session;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-primary";
      case "completed":
        return "text-success";
      case "struggling":
        return "text-warning";
      case "paused":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "active":
        return "bg-primary/10";
      case "completed":
        return "bg-success/10";
      case "struggling":
        return "bg-warning/10";
      case "paused":
        return "bg-muted/10";
      default:
        return "bg-muted/10";
    }
  };

  const getProgressColor = (progress, status) => {
    if (status === "completed") return "bg-success";
    if (status === "struggling") return "bg-warning";
    if (progress > 75) return "bg-success";
    if (progress > 50) return "bg-primary";
    if (progress > 25) return "bg-warning";
    return "bg-error";
  };

  const formatTimeRemaining = (elapsed, total) => {
    const remaining = Math.max(0, total - elapsed);
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatLastActivity = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  const sortedAndFilteredSessions = sessions
    ?.filter((session) => filterBy === "all" || session?.status === filterBy)
    ?.sort((a, b) => {
      switch (sortBy) {
        case "timeRemaining":
          return (
            a?.timeTotal - a?.timeElapsed - (b?.timeTotal - b?.timeElapsed)
          );
        case "progress":
          return b?.progress - a?.progress;
        case "lastActivity":
          return b?.lastActivity - a?.lastActivity;
        case "score":
          return b?.score - a?.score;
        default:
          return 0;
      }
    });

  const handleIntervention = (sessionId) => {
    // Simulate intervention action
    setSessions((prev) =>
      prev?.map((session) =>
        session?.id === sessionId
          ? { ...session, needsIntervention: false, status: "active" }
          : session
      )
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Monitor" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Active Assessment Sessions
            </h3>
            <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
              {sessions?.filter((s) => s?.status === "active")?.length} Active
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e?.target?.value)}
              className="px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Sessions</option>
              <option value="active">Active</option>
              <option value="struggling">Struggling</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
            >
              <option value="timeRemaining">Time Remaining</option>
              <option value="progress">Progress</option>
              <option value="lastActivity">Last Activity</option>
              <option value="score">Score</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconSize={14}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Sessions Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedAndFilteredSessions?.map((session) => (
            <div
              key={session?.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                session?.needsIntervention
                  ? "border-warning bg-warning/5"
                  : "border-border"
              }`}
            >
              {/* Student Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <img
                    src={session?.studentAvatar}
                    alt={session?.studentAvatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusBg(
                      session?.status
                    )}`}
                  >
                    <div
                      className={`w-full h-full rounded-full ${
                        session?.status === "active"
                          ? "bg-success animate-pulse"
                          : session?.status === "completed"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {session?.studentName}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.institution}
                  </p>
                </div>

                {session?.needsIntervention && (
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                )}
              </div>

              {/* Assessment Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {session?.assessmentType}
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                    {session?.assessmentRound}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>
                    Question {session?.currentQuestion}/
                    {session?.totalQuestions}
                  </span>
                  <span>Score: {session?.score}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress: {Math.round(session?.progress)}%</span>
                  <span>
                    Time:{" "}
                    {formatTimeRemaining(
                      session?.timeElapsed,
                      session?.timeTotal
                    )}{" "}
                    left
                  </span>
                </div>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getProgressColor(
                      session?.progress,
                      session?.status
                    )}`}
                    style={{ width: `${session?.progress}%` }}
                  />
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${getStatusBg(
                      session?.status
                    )} ${getStatusColor(session?.status)}`}
                  >
                    {session?.status?.charAt(0)?.toUpperCase() +
                      session?.status?.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatLastActivity(session?.lastActivity)}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {session?.needsIntervention && (
                    <Button
                      variant="warning"
                      size="xs"
                      onClick={() => handleIntervention(session?.id)}
                      iconName="UserCheck"
                      iconSize={12}
                    >
                      Assist
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Eye"
                    iconSize={12}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedAndFilteredSessions?.length === 0 && (
          <div className="text-center py-12">
            <Icon
              name="Monitor"
              size={48}
              className="text-muted-foreground mx-auto mb-3"
            />
            <p className="text-muted-foreground">
              No active sessions to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentProgressGrid;
