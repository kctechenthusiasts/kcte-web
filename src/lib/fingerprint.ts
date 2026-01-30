// Simple browser fingerprint for vote tracking
// This is NOT cryptographically secure - just for basic duplicate prevention
export async function generateFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
    // Add canvas fingerprint for more uniqueness
    await getCanvasFingerprint(),
  ];

  const fingerprint = components.join("|");

  // Hash the fingerprint
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprint);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

async function getCanvasFingerprint(): Promise<string> {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no-canvas";

    canvas.width = 200;
    canvas.height = 50;

    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("KCTE fingerprint", 2, 15);

    return canvas.toDataURL().slice(-50);
  } catch {
    return "canvas-error";
  }
}

// Store fingerprint in memory and localStorage for persistence
let cachedFingerprint: string | null = null;

export async function getVisitorFingerprint(): Promise<string> {
  if (cachedFingerprint) return cachedFingerprint;

  // Check localStorage first
  const stored = localStorage.getItem("kcte_visitor_fp");
  if (stored) {
    cachedFingerprint = stored;
    return stored;
  }

  // Generate new fingerprint
  const fp = await generateFingerprint();
  localStorage.setItem("kcte_visitor_fp", fp);
  cachedFingerprint = fp;

  return fp;
}
