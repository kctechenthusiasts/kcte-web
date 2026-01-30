import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { ConvexClientProvider } from "../ConvexClientProvider";
import { TopicCard } from "./TopicCard";
import { TopicSubmitForm } from "./TopicSubmitForm";
import { getVisitorFingerprint } from "../../lib/fingerprint";
import { api } from "../../../convex/_generated/api";

const TOPICS_PER_PAGE = 20;

function TopicsPageContent() {
  const [visitorFingerprint, setVisitorFingerprint] = useState<string | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch topics
  const topics = useQuery(api.topics.listTopics);

  // Calculate pagination
  const totalTopics = topics?.length ?? 0;
  const totalPages = Math.ceil(totalTopics / TOPICS_PER_PAGE);
  const showPagination = totalTopics > TOPICS_PER_PAGE;
  const paginatedTopics = topics?.slice(
    (currentPage - 1) * TOPICS_PER_PAGE,
    currentPage * TOPICS_PER_PAGE
  );

  // Get vote status for all topics
  const topicIds = topics?.map((t) => t._id) ?? [];
  const voteStatus = useQuery(
    api.topics.getVoteStatus,
    visitorFingerprint && topicIds.length > 0
      ? { topicIds, visitorFingerprint }
      : "skip"
  );

  // Generate fingerprint on mount
  useEffect(() => {
    getVisitorFingerprint().then(setVisitorFingerprint);
  }, []);

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  if (!visitorFingerprint) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Topic Suggestions
        </h1>
        <p className="text-gray-600">
          What would you like us to cover at a future meetup? Browse suggestions
          below and upvote the ones you're interested in, or submit your own
          idea!
        </p>
      </div>

      {/* Submit button or form */}
      <div className="mb-8">
        {showForm ? (
          <>
            <TopicSubmitForm
              visitorFingerprint={visitorFingerprint}
              onSuccess={handleFormSuccess}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-gray-600 hover:text-gray-800 text-sm"
            >
              &larr; Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            + Suggest a Topic
          </button>
        )}
      </div>

      {/* Topics list */}
      <div className="space-y-4">
        {topics === undefined ? (
          // Loading state
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-4 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              No topics suggested yet. Be the first!
            </p>
          </div>
        ) : (
          paginatedTopics?.map((topic) => (
            <TopicCard
              key={topic._id}
              id={topic._id}
              title={topic.title}
              description={topic.description}
              upvotes={topic.upvotes}
              hasVoted={voteStatus?.[topic._id] ?? false}
              visitorFingerprint={visitorFingerprint}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// Wrap with Convex provider for Astro
export function TopicsPage() {
  return (
    <ConvexClientProvider>
      <TopicsPageContent />
    </ConvexClientProvider>
  );
}
