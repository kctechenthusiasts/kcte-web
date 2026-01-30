import { useState, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

interface TopicCardProps {
  id: Id<"topics">;
  title: string;
  description: string;
  upvotes: number;
  hasVoted: boolean;
  visitorFingerprint: string;
  onVoteChange?: () => void;
}

export function TopicCard({
  id,
  title,
  description,
  upvotes,
  hasVoted,
  visitorFingerprint,
  onVoteChange,
}: TopicCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const upvoteTopic = useMutation(api.topics.upvoteTopic);
  const removeUpvote = useMutation(api.topics.removeUpvote);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const handleVote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    setError(null);

    try {
      if (hasVoted) {
        await removeUpvote({ topicId: id, visitorFingerprint });
      } else {
        await upvoteTopic({ topicId: id, visitorFingerprint });
      }
      onVoteChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to vote");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        setIsExpanded(!isExpanded);
      }}
      className={`
        bg-white rounded-lg border border-gray-200 p-4 cursor-pointer
        transition-all duration-300 ease-out
        ${isExpanded
          ? "shadow-xl scale-[1.02] z-10 relative"
          : "shadow-md hover:shadow-lg"
        }
      `}
    >
      <div className="flex gap-4">
        {/* Upvote button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleVote}
            disabled={isVoting}
            className={`p-2 rounded-lg transition-colors ${
              hasVoted
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600"
            } ${isVoting ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={hasVoted ? "Remove upvote" : "Upvote"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <span
            className={`text-lg font-bold mt-1 ${hasVoted ? "text-primary-600" : "text-gray-700"}`}
          >
            {upvotes}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className={`text-gray-600 text-sm transition-all duration-300 ${
            isExpanded ? "" : "line-clamp-2"
          }`}>
            {description}
          </p>
          {!isExpanded && description.length > 100 && (
            <span className="text-primary-500 text-xs mt-1 block">
              Click to read more
            </span>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
