import { RateLimiter, MINUTE, HOUR } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // Limit topic submissions: 3 per hour per fingerprint
  submitTopic: {
    kind: "token bucket",
    rate: 3,
    period: HOUR,
    capacity: 3,
  },
  // Limit votes: 10 per minute per fingerprint (to prevent rapid clicking)
  voteTopic: {
    kind: "token bucket",
    rate: 10,
    period: MINUTE,
    capacity: 15,
  },
  // Global submission limit to prevent coordinated spam
  globalSubmit: {
    kind: "token bucket",
    rate: 20,
    period: HOUR,
  },
});
