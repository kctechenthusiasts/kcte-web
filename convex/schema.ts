import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  topics: defineTable({
    title: v.string(),
    description: v.string(),
    upvotes: v.number(),
    createdAt: v.number(),
    // Store voter identifiers to prevent duplicate votes
    // Using browser fingerprint hash for anonymous voting
    voters: v.array(v.string()),
    // Optional: track if topic was suggested with valid Turnstile token
    verified: v.boolean(),
  })
    .index("by_upvotes", ["upvotes"])
    .index("by_createdAt", ["createdAt"]),
});
