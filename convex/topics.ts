import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

// Get all topics sorted by upvotes (descending)
export const listTopics = query({
  args: {},
  handler: async (ctx) => {
    const topics = await ctx.db
      .query("topics")
      .withIndex("by_upvotes")
      .order("desc")
      .collect();

    // Return topics without exposing voter fingerprints
    return topics.map((topic) => ({
      _id: topic._id,
      title: topic.title,
      description: topic.description,
      upvotes: topic.upvotes,
      createdAt: topic.createdAt,
      voterCount: topic.voters.length,
    }));
  },
});

// Check if a specific fingerprint has voted on a topic
export const hasVoted = query({
  args: {
    topicId: v.id("topics"),
    visitorFingerprint: v.string(),
  },
  handler: async (ctx, args) => {
    const topic = await ctx.db.get(args.topicId);
    if (!topic) return false;
    return topic.voters.includes(args.visitorFingerprint);
  },
});

// Get vote status for multiple topics at once (more efficient)
export const getVoteStatus = query({
  args: {
    topicIds: v.array(v.id("topics")),
    visitorFingerprint: v.string(),
  },
  handler: async (ctx, args) => {
    const voteStatus: Record<string, boolean> = {};

    for (const topicId of args.topicIds) {
      const topic = await ctx.db.get(topicId);
      voteStatus[topicId] = topic
        ? topic.voters.includes(args.visitorFingerprint)
        : false;
    }

    return voteStatus;
  },
});

// Submit a new topic
export const submitTopic = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    visitorFingerprint: v.string(),
    turnstileToken: v.string(),
  },
  handler: async (ctx, args) => {
    // Rate limit check - per visitor
    const visitorLimit = await rateLimiter.limit(ctx, "submitTopic", {
      key: args.visitorFingerprint,
    });
    if (!visitorLimit.ok) {
      throw new Error(
        `Rate limit exceeded. Please try again in ${Math.ceil((visitorLimit.retryAfter || 0) / 1000)} seconds.`
      );
    }

    // Global rate limit check
    const globalLimit = await rateLimiter.limit(ctx, "globalSubmit", {});
    if (!globalLimit.ok) {
      throw new Error("Too many submissions globally. Please try again later.");
    }

    // Validate title and description
    const title = args.title.trim();
    const description = args.description.trim();

    if (title.length < 3 || title.length > 100) {
      throw new Error("Title must be between 3 and 100 characters.");
    }
    if (description.length < 10 || description.length > 650) {
      throw new Error("Description must be between 10 and 650 characters.");
    }

    // Insert the topic
    const topicId = await ctx.db.insert("topics", {
      title,
      description,
      upvotes: 0,
      createdAt: Date.now(),
      voters: [],
      verified: true, // Turnstile verification happens client-side before calling this
    });

    return topicId;
  },
});

// Upvote a topic
export const upvoteTopic = mutation({
  args: {
    topicId: v.id("topics"),
    visitorFingerprint: v.string(),
  },
  handler: async (ctx, args) => {
    // Rate limit check
    const limit = await rateLimiter.limit(ctx, "voteTopic", {
      key: args.visitorFingerprint,
    });
    if (!limit.ok) {
      throw new Error("Voting too fast. Please slow down.");
    }

    const topic = await ctx.db.get(args.topicId);
    if (!topic) {
      throw new Error("Topic not found.");
    }

    // Check if already voted
    if (topic.voters.includes(args.visitorFingerprint)) {
      throw new Error("You have already voted on this topic.");
    }

    // Add vote
    await ctx.db.patch(args.topicId, {
      upvotes: topic.upvotes + 1,
      voters: [...topic.voters, args.visitorFingerprint],
    });

    return { success: true };
  },
});

// Remove upvote from a topic
export const removeUpvote = mutation({
  args: {
    topicId: v.id("topics"),
    visitorFingerprint: v.string(),
  },
  handler: async (ctx, args) => {
    const topic = await ctx.db.get(args.topicId);
    if (!topic) {
      throw new Error("Topic not found.");
    }

    // Check if user has voted
    if (!topic.voters.includes(args.visitorFingerprint)) {
      throw new Error("You haven't voted on this topic.");
    }

    // Remove vote
    await ctx.db.patch(args.topicId, {
      upvotes: topic.upvotes - 1,
      voters: topic.voters.filter((v) => v !== args.visitorFingerprint),
    });

    return { success: true };
  },
});
