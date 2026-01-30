import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { api } from "../../../convex/_generated/api";

interface TopicSubmitFormProps {
  visitorFingerprint: string;
  onSuccess?: () => void;
}

export function TopicSubmitForm({
  visitorFingerprint,
  onSuccess,
}: TopicSubmitFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);
  const submitTopic = useMutation(api.topics.submitTopic);

  const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setError("Please complete the verification challenge.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Verify Turnstile token server-side
      const verifyResponse = await fetch(
        "/.netlify/functions/verify-turnstile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: turnstileToken }),
        }
      );

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        throw new Error("Verification failed. Please try again.");
      }

      // Submit to Convex
      await submitTopic({
        title: title.trim(),
        description: description.trim(),
        visitorFingerprint,
        turnstileToken,
      });

      setSuccess(true);
      setTitle("");
      setDescription("");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit topic");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Suggest a Topic</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Topic Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Introduction to Kubernetes"
            maxLength={100}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">{title.length}/100 characters</p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What would you like to learn or discuss about this topic?"
            maxLength={500}
            rows={3}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            {description.length}/500 characters
          </p>
        </div>

        {/* Cloudflare Turnstile */}
        <div className="flex justify-center">
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => {
              setError("Verification failed. Please try again.");
              setTurnstileToken(null);
            }}
            onExpire={() => setTurnstileToken(null)}
            options={{
              theme: "light",
              size: "normal",
            }}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              Topic submitted successfully! Thank you for your suggestion.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting || !turnstileToken
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary-500 text-white hover:bg-primary-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Topic"}
        </button>
      </div>
    </form>
  );
}
