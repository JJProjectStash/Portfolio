/**
 * @fileoverview GitHub Activity Component
 * @description Displays recent GitHub activity including contribution graph
 * and latest commits fetched from the GitHub API
 */

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { GitCommit, GitBranch, Star, GitPullRequest, ExternalLink } from 'lucide-react';

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
    action?: string;
    ref?: string;
    ref_type?: string;
    size?: number;
    distinct_size?: number;
    before?: string;
    head?: string;
  };
  created_at: string;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubActivityProps {
  username: string;
  maxEvents?: number;
}

/**
 * Formats a date string to a relative time (e.g., "2 hours ago")
 */
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Gets the icon for a specific event type
 */
const getEventIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'PushEvent':
      return <GitCommit size={16} />;
    case 'CreateEvent':
      return <GitBranch size={16} />;
    case 'WatchEvent':
      return <Star size={16} />;
    case 'PullRequestEvent':
      return <GitPullRequest size={16} />;
    default:
      return <GitCommit size={16} />;
  }
};

/**
 * GitHub Activity Component
 * Displays recent GitHub activity and stats
 */
const GitHubActivity: React.FC<GitHubActivityProps> = ({ username, maxEvents = 5 }) => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [commitCounts, setCommitCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user stats and events in parallel
        const [userResponse, eventsResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=${maxEvents * 2}`),
        ]);

        if (!userResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const userData = await userResponse.json();
        const eventsData: GitHubEvent[] = await eventsResponse.json();

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        });

        // Filter to get unique events and limit to maxEvents
        const filteredEvents = eventsData.slice(0, maxEvents);
        setEvents(filteredEvents);

        // Fetch commit counts for PushEvents using Compare API
        const pushEvents = filteredEvents.filter(
          (e) => e.type === 'PushEvent' && e.payload.before && e.payload.head
        );

        const counts: Record<string, number> = {};

        // Fetch commit counts in parallel (with rate limit consideration)
        await Promise.all(
          pushEvents.map(async (event) => {
            try {
              const compareResponse = await fetch(
                `https://api.github.com/repos/${event.repo.name}/compare/${event.payload.before}...${event.payload.head}`
              );
              if (compareResponse.ok) {
                const compareData = await compareResponse.json();
                counts[event.id] = compareData.total_commits || compareData.commits?.length || 1;
              } else {
                counts[event.id] = 1; // Default to 1 if compare fails
              }
            } catch {
              counts[event.id] = 1; // Default to 1 on error
            }
          })
        );

        setCommitCounts(counts);
      } catch (err) {
        setError('Unable to load GitHub activity');
        console.error('GitHub API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, maxEvents]);

  /**
   * Gets the commit count for a push event
   */
  const getCommitCount = (event: GitHubEvent): number => {
    if (event.type !== 'PushEvent') return 0;
    return commitCounts[event.id] || event.payload.size || event.payload.distinct_size || 1;
  };

  /**
   * Formats the event description with dynamic commit count
   */
  const getEventDescription = (event: GitHubEvent): string => {
    switch (event.type) {
      case 'PushEvent':
        const count = getCommitCount(event);
        return `Pushed ${count} ${count === 1 ? 'commit' : 'commits'}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} ${event.payload.ref || ''}`.trim();
      case 'WatchEvent':
        return 'Starred repository';
      case 'PullRequestEvent':
        return `${event.payload.action} pull request`;
      case 'IssuesEvent':
        return `${event.payload.action} issue`;
      case 'ForkEvent':
        return 'Forked repository';
      default:
        return event.type.replace('Event', '');
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  if (loading) {
    return (
      <div className="bg-theme-secondary border border-theme-primary rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-theme-tertiary rounded-lg animate-pulse" />
          <div className="h-6 w-40 bg-theme-tertiary rounded-lg animate-pulse" />
        </div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-theme-tertiary rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-theme-tertiary rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-theme-tertiary rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-theme-secondary border border-theme-primary rounded-2xl p-6 text-center">
        <p className="text-theme-tertiary">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-theme-secondary border border-theme-primary rounded-2xl overflow-hidden shadow-theme-sm hover:shadow-theme-lg transition-shadow duration-300"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-theme-primary bg-theme-tertiary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 btn-theme-primary rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-primary">GitHub Activity</h3>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-theme-tertiary hover:text-theme-primary transition-colors flex items-center gap-1"
              >
                @{username}
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-theme-primary">{stats.public_repos}</div>
                <div className="text-xs text-theme-tertiary">Repos</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-theme-primary">{stats.followers}</div>
                <div className="text-xs text-theme-tertiary">Followers</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Contribution Graph Image */}
      <div className="px-6 py-4 border-b border-theme-primary overflow-x-auto">
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          className="w-full min-w-[600px] h-auto rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Activity Feed */}
      <div className="p-6">
        <h4 className="text-sm font-bold text-theme-tertiary uppercase tracking-wider mb-4">
          Recent Activity
        </h4>
        <motion.div variants={containerVariants} className="space-y-3">
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-theme-tertiary transition-colors group"
              >
                <div className="w-8 h-8 bg-theme-tertiary group-hover:btn-theme-primary rounded-full flex items-center justify-center text-theme-tertiary group-hover:text-theme-inverse transition-colors flex-shrink-0">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-theme-primary font-medium truncate">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-theme-tertiary truncate">
                    <a
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-theme-primary transition-colors"
                    >
                      {event.repo.name}
                    </a>
                  </p>
                </div>
                <span className="text-xs text-theme-tertiary whitespace-nowrap">
                  {formatRelativeTime(event.created_at)}
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-theme-tertiary text-sm text-center py-4">No recent activity</p>
          )}
        </motion.div>
      </div>

      {/* Footer Link */}
      <div className="px-6 py-4 border-t border-theme-primary">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm font-bold text-theme-tertiary hover:text-theme-primary transition-colors"
        >
          View Full Profile
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default GitHubActivity;
