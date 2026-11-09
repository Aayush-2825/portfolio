"use client";

import React from "react";

interface SchematicProps {
  slug: string;
}

export function ProjectSchematic({ slug }: SchematicProps) {
  switch (slug) {
    case "dozo":
      return <DozoSchematic />;
    case "viewproof":
      return <ViewProofSchematic />;
    case "swabhimaan":
      return <SwabhimaanSchematic />;
    case "auth-backend":
    case "pjmb":
      return <AuthBackendSchematic />;
    default:
      return <AuthBackendSchematic />;
  }
}

/**
 * 1. DOZO: 1-to-Many WebSocket Fan-Out Mesh
 * Topology: [Client App] -> [Fastify / Zod / Redis] -> Fan-out to 3 WSS Helper Nodes + Razorpay
 */
function DozoSchematic() {
  return (
    <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080c]/85 p-2">
      <svg
        viewBox="0 0 400 110"
        className="h-full w-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dozo-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff4d1f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8c42" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 1. Client App (Left) */}
        <rect x="10" y="28" width="85" height="54" rx="6" stroke="rgba(255, 77, 31, 0.35)" strokeWidth="1" fill="rgba(255, 77, 31, 0.03)" />
        <text x="18" y="44" fill="#ff4d1f" fontSize="7" fontFamily="monospace" fontWeight="700">CLIENT APP</text>
        <text x="18" y="56" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">Next.js Client</text>
        <text x="18" y="66" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">Live Coords</text>
        <text x="18" y="74" fill="#ff4d1f" fontSize="5.5" fontFamily="monospace">WSS Handshake</text>

        {/* Center Node: Fastify + Redis + Postgres */}
        <rect x="125" y="20" width="115" height="70" rx="6" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1" fill="rgba(255, 255, 255, 0.02)" />
        <text x="133" y="36" fill="rgba(255,255,255,0.95)" fontSize="7" fontFamily="monospace" fontWeight="700">FASTIFY / ZOD</text>
        <text x="133" y="48" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">Schema Validation</text>
        <text x="133" y="58" fill="#38bdf8" fontSize="5.5" fontFamily="monospace">Redis Spatial Index</text>
        <text x="133" y="68" fill="#a78bfa" fontSize="5.5" fontFamily="monospace">Postgres SERIALIZABLE</text>
        <text x="133" y="78" fill="#10b981" fontSize="5.5" fontFamily="monospace">Concurrency Mutex Lock</text>

        {/* Fan-Out Radiating Connector Curves */}
        <path d="M 95 55 L 125 55" stroke="url(#dozo-grad)" strokeWidth="1.5" />
        <circle cx="110" cy="55" r="2.5" fill="#ff4d1f" className="animate-pulse" />

        <path d="M 240 45 C 255 45, 255 24, 270 24" stroke="#ff4d1f" strokeWidth="1.2" strokeDasharray="3 2" />
        <path d="M 240 55 L 270 55" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M 240 65 C 255 65, 255 86, 270 86" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* 3. Fan-out Subscriber Nodes (Right) */}
        {/* Helper 1 */}
        <rect x="270" y="10" width="120" height="28" rx="4" stroke="rgba(255, 77, 31, 0.3)" strokeWidth="1" fill="rgba(255, 77, 31, 0.03)" />
        <text x="276" y="22" fill="#ff4d1f" fontSize="6.5" fontFamily="monospace" fontWeight="700">HELPER 01 · WSS</text>
        <text x="276" y="32" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace">Plumbing Dispatch (ACK)</text>

        {/* Helper 2 */}
        <rect x="270" y="41" width="120" height="28" rx="4" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" fill="rgba(56, 189, 248, 0.03)" />
        <text x="276" y="53" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" fontWeight="700">HELPER 02 · WSS</text>
        <text x="276" y="63" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace">Electrician Live Stream</text>

        {/* Razorpay Settlement */}
        <rect x="270" y="72" width="120" height="28" rx="4" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" fill="rgba(16, 185, 129, 0.03)" />
        <text x="276" y="84" fill="#10b981" fontSize="6.5" fontFamily="monospace" fontWeight="700">RAZORPAY WEBHOOK</text>
        <text x="276" y="94" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace">Automated Escrow Pay</text>
      </svg>
    </div>
  );
}

/**
 * 2. ViewProof: Branching Dual-Pipeline
 * Topology: [Photographer Upload] -> [Upper: Cloudinary CDN] + [Lower: Firestore State] -> Reconverge to [Client Approval Lock]
 */
function ViewProofSchematic() {
  return (
    <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080c]/85 p-2">
      <svg
        viewBox="0 0 400 110"
        className="h-full w-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Source: Photographer Upload */}
        <rect x="10" y="28" width="90" height="54" rx="6" stroke="rgba(96, 165, 250, 0.35)" strokeWidth="1" fill="rgba(96, 165, 250, 0.03)" />
        <text x="18" y="44" fill="#60a5fa" fontSize="7" fontFamily="monospace" fontWeight="700">PHOTOGRAPHER</text>
        <text x="18" y="56" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">Batch Album Ingest</text>
        <text x="18" y="66" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">High-Res RAW / JPEG</text>
        <text x="18" y="74" fill="#60a5fa" fontSize="5.5" fontFamily="monospace">Auth Session</text>

        {/* Branching Connectors from Left to Dual-Pipeline */}
        <path d="M 100 45 C 115 45, 115 28, 130 28" stroke="#60a5fa" strokeWidth="1.5" />
        <circle cx="115" cy="36" r="2" fill="#60a5fa" />

        <path d="M 100 65 C 115 65, 115 82, 130 82" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="115" cy="74" r="2" fill="#fbbf24" />

        {/* Upper Pipeline: Cloudinary CDN Transform */}
        <rect x="130" y="10" width="135" height="38" rx="5" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" fill="rgba(255, 255, 255, 0.02)" />
        <text x="138" y="24" fill="rgba(255,255,255,0.95)" fontSize="6.8" fontFamily="monospace" fontWeight="700">CLOUDINARY CDN</text>
        <text x="138" y="34" fill="rgba(255,255,255,0.6)" fontSize="5.8" fontFamily="monospace">Dynamic WebP / Watermarking</text>
        <text x="138" y="42" fill="#38bdf8" fontSize="5.5" fontFamily="monospace">Fast Edge Media Delivery</text>

        {/* Lower Pipeline: Firebase Firestore State */}
        <rect x="130" y="62" width="135" height="38" rx="5" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" fill="rgba(245, 158, 11, 0.03)" />
        <text x="138" y="76" fill="#fbbf24" fontSize="6.8" fontFamily="monospace" fontWeight="700">FIRESTORE REAL-TIME</text>
        <text x="138" y="86" fill="rgba(255,255,255,0.6)" fontSize="5.8" fontFamily="monospace">Live onSnapshot() Sync</text>
        <text x="138" y="94" fill="#fbbf24" fontSize="5.5" fontFamily="monospace">Comment Threads (12ms)</text>

        {/* Reconvergence Connectors into Client Lock */}
        <path d="M 265 28 C 280 28, 280 45, 295 45" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M 265 82 C 280 82, 280 65, 295 65" stroke="#fbbf24" strokeWidth="1.5" />

        {/* Right Node: Client Approval Lock */}
        <rect x="295" y="28" width="95" height="54" rx="6" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" fill="rgba(16, 185, 129, 0.04)" />
        <text x="303" y="44" fill="#10b981" fontSize="7" fontFamily="monospace" fontWeight="700">APPROVAL LOCK</text>
        <text x="303" y="56" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">Single-Click Proof</text>
        <text x="303" y="66" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">Access Passcode</text>
        <text x="303" y="74" fill="#10b981" fontSize="5.5" fontFamily="monospace">ALBUM_FINALIZED</text>
      </svg>
    </div>
  );
}

/**
 * 3. Swabhimaan: Hub-and-Spoke CMS Architecture
 * Topology: Central Payload CMS core connected out to Next.js 15 Edge, MongoDB Atlas, and Cloudflare R2
 */
function SwabhimaanSchematic() {
  return (
    <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080c]/85 p-2">
      <svg
        viewBox="0 0 400 110"
        className="h-full w-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Spoke: Next.js 15 Edge */}
        <rect x="10" y="28" width="95" height="54" rx="6" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" fill="rgba(56, 189, 248, 0.03)" />
        <text x="18" y="44" fill="#38bdf8" fontSize="7" fontFamily="monospace" fontWeight="700">NEXT.JS 15 EDGE</text>
        <text x="18" y="56" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">React 19 Server</text>
        <text x="18" y="66" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">ISR Static Delivery</text>
        <text x="18" y="74" fill="#38bdf8" fontSize="5.5" fontFamily="monospace">TTFB &lt; 35ms</text>

        {/* Bidirectional Spoke Connector Left */}
        <path d="M 105 55 L 135 55" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="2.5" fill="#38bdf8" />

        {/* Central Core Hub: Payload Headless CMS */}
        <rect x="135" y="22" width="125" height="66" rx="8" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.2" fill="rgba(245, 158, 11, 0.04)" />
        <text x="143" y="38" fill="#fbbf24" fontSize="7.2" fontFamily="monospace" fontWeight="700">PAYLOAD CMS HUB</text>
        <text x="143" y="50" fill="rgba(255,255,255,0.8)" fontSize="6" fontFamily="monospace">Editorial Schema Engine</text>
        <text x="143" y="60" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace">Zod Typed Contracts</text>
        <text x="143" y="70" fill="#fbbf24" fontSize="5.5" fontFamily="monospace">Periodicals · Media · Forms</text>
        <text x="143" y="80" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace">Central Orchestrator</text>

        {/* Spokes Radiating Right */}
        <path d="M 260 45 L 285 28" stroke="#ff4d1f" strokeWidth="1.5" />
        <circle cx="272" cy="36" r="2" fill="#ff4d1f" />

        <path d="M 260 65 L 285 82" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="272" cy="74" r="2" fill="#10b981" />

        {/* Top-Right Spoke: Cloudflare R2 */}
        <rect x="285" y="10" width="105" height="38" rx="5" stroke="rgba(255, 77, 31, 0.3)" strokeWidth="1" fill="rgba(255, 77, 31, 0.03)" />
        <text x="293" y="24" fill="#ff4d1f" fontSize="6.8" fontFamily="monospace" fontWeight="700">CLOUDFLARE R2</text>
        <text x="293" y="34" fill="rgba(255,255,255,0.6)" fontSize="5.8" fontFamily="monospace">S3-Compatible Assets</text>
        <text x="293" y="42" fill="#ff4d1f" fontSize="5.5" fontFamily="monospace">Zero Egress Fees</text>

        {/* Bottom-Right Spoke: MongoDB Atlas */}
        <rect x="285" y="62" width="105" height="38" rx="5" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" fill="rgba(16, 185, 129, 0.03)" />
        <text x="293" y="76" fill="#10b981" fontSize="6.8" fontFamily="monospace" fontWeight="700">MONGODB ATLAS</text>
        <text x="293" y="86" fill="rgba(255,255,255,0.6)" fontSize="5.8" fontFamily="monospace">Document Stores</text>
        <text x="293" y="94" fill="#10b981" fontSize="5.5" fontFamily="monospace">Indexed Articles</text>
      </svg>
    </div>
  );
}

/**
 * 4. PJMB Auth Microservice: Cyclic Token Rotation Loop
 * Topology: [Client Request] -> [OAuth & 2FA Gate] -> Cyclic Token Ring: [Short-Lived Access JWT] <-> [Rotating Refresh + Argon2id]
 */
function AuthBackendSchematic() {
  return (
    <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080c]/85 p-2">
      <svg
        viewBox="0 0 400 110"
        className="h-full w-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Node: Client Request */}
        <rect x="10" y="28" width="85" height="54" rx="6" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" fill="rgba(255, 255, 255, 0.02)" />
        <text x="18" y="44" fill="rgba(255,255,255,0.95)" fontSize="7" fontFamily="monospace" fontWeight="700">CLIENT REQUEST</text>
        <text x="18" y="56" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">Helmet CSP Guard</text>
        <text x="18" y="66" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">IP Token Bucket</text>
        <text x="18" y="74" fill="#38bdf8" fontSize="5.5" fontFamily="monospace">Zod Validation</text>

        {/* Connector from Client to Gate */}
        <path d="M 95 55 L 115 55" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="105" cy="55" r="2" fill="#38bdf8" />

        {/* Center Node: OAuth 2.0 & 2FA Gate */}
        <rect x="115" y="28" width="95" height="54" rx="6" stroke="rgba(192, 132, 252, 0.35)" strokeWidth="1" fill="rgba(192, 132, 252, 0.03)" />
        <text x="123" y="44" fill="#c084fc" fontSize="7" fontFamily="monospace" fontWeight="700">OAUTH & 2FA GATE</text>
        <text x="123" y="56" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">Google OAuth 2.0</text>
        <text x="123" y="66" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">TOTP Authenticator</text>
        <text x="123" y="74" fill="#c084fc" fontSize="5.5" fontFamily="monospace">Passport.js Strategy</text>

        {/* Connectors from Gate to Cyclic Ring */}
        <path d="M 210 45 C 225 45, 225 28, 240 28" stroke="#c084fc" strokeWidth="1.5" />
        <path d="M 210 65 C 225 65, 225 82, 240 82" stroke="#ff4d1f" strokeWidth="1.5" />

        {/* Right Ring: Node 1 (Upper) - Access JWT */}
        <rect x="240" y="10" width="130" height="38" rx="5" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" fill="rgba(56, 189, 248, 0.03)" />
        <text x="248" y="24" fill="#38bdf8" fontSize="6.8" fontFamily="monospace" fontWeight="700">ACCESS TOKEN (JWT)</text>
        <text x="248" y="34" fill="rgba(255,255,255,0.6)" fontSize="5.8" fontFamily="monospace">15m Expiration · HttpOnly</text>
        <text x="248" y="42" fill="#38bdf8" fontSize="5.5" fontFamily="monospace">Stateless Auth Verification</text>

        {/* Right Ring: Node 2 (Lower) - Rotating Refresh */}
        <rect x="240" y="62" width="130" height="38" rx="5" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="1" fill="rgba(16, 185, 129, 0.03)" />
        <text x="248" y="76" fill="#10b981" fontSize="6.8" fontFamily="monospace" fontWeight="700">ROTATING REFRESH</text>
        <text x="248" y="86" fill="rgba(255,255,255,0.6)" fontSize="5.8" fontFamily="monospace">Argon2id Hash · MongoDB</text>
        <text x="248" y="94" fill="#10b981" fontSize="5.5" fontFamily="monospace">Reuse Invalidation Alert</text>

        {/* Cyclic Renewal Arrows between Access and Refresh */}
        {/* Downward spend line */}
        <path d="M 370 28 C 388 28, 388 82, 370 82" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="370,82 376,79 376,85" fill="#10b981" />

        {/* Upward renew line */}
        <path d="M 240 82 C 224 82, 224 28, 240 28" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="240,28 234,31 234,25" fill="#38bdf8" />
      </svg>
    </div>
  );
}
