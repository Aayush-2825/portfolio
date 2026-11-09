"use client";

import { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { GithubIcon } from "@/components/ui/icons";
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  RotateCw,
  AlertTriangle,
  Unlock,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenNode {
  id: string;
  generation: number;
  status: "ACTIVE" | "CONSUMED" | "REVOKED";
  issuedAt: string;
}

interface RecoveryCode {
  code: string;
  used: boolean;
}

export function PjmbSecuritySimulator() {
  const [activeTab, setActiveTab] = useState<"tokens" | "totp">("tokens");

  // Token Family Simulator State
  const [generation, setGeneration] = useState(2);
  const [familyStatus, setFamilyStatus] = useState<"HEALTHY" | "COMPROMISED">("HEALTHY");
  const [tokenNodes, setTokenNodes] = useState<TokenNode[]>([
    { id: "rt_fam_001_gen0", generation: 0, status: "CONSUMED", issuedAt: "10:00:00" },
    { id: "rt_fam_001_gen1", generation: 1, status: "CONSUMED", issuedAt: "10:15:00" },
    { id: "rt_fam_001_gen2", generation: 2, status: "ACTIVE",   issuedAt: "10:30:00" },
  ]);
  const [securityLogs, setSecurityLogs] = useState<string[]>([
    "[AUTH] Session established. Token family fam_001 initialized.",
    "[ROTATION] Generation 1 rotated to Generation 2 (200 OK)",
  ]);

  // TOTP Simulator State
  const [totpCode, setTotpCode] = useState("842 190");
  const [totpSecondsLeft, setTotpSecondsLeft] = useState(24);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<RecoveryCode[]>([
    { code: "8201-4412", used: false },
    { code: "9931-0182", used: false },
    { code: "5543-9821", used: true },
    { code: "1148-3920", used: false },
  ]);

  // Dynamic TOTP countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTotpSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextRandomCode = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
          setTotpCode(nextRandomCode);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Normal Rotation
  const handleNormalRotation = () => {
    if (familyStatus === "COMPROMISED") return;
    sound.playClick(1100);

    const nextGen = generation + 1;
    setGeneration(nextGen);

    const nextNode: TokenNode = {
      id: `rt_fam_001_gen${nextGen}`,
      generation: nextGen,
      status: "ACTIVE",
      issuedAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    setTokenNodes((prev) => [
      ...prev.map((t) => (t.status === "ACTIVE" ? { ...t, status: "CONSUMED" as const } : t)),
      nextNode,
    ]);

    setSecurityLogs((prev) => [
      ...prev.slice(-3),
      `[ROTATION] Gen ${generation} consumed -> Gen ${nextGen} issued. Access token signed (15m exp).`,
    ]);
  };

  // 2. Replay Attack Simulation (Reusing Gen 0)
  const handleReplayAttack = () => {
    sound.playPacket(300);
    setFamilyStatus("COMPROMISED");

    // Revoke all tokens in family
    setTokenNodes((prev) =>
      prev.map((t) => ({ ...t, status: "REVOKED" as const }))
    );

    setSecurityLogs((prev) => [
      ...prev.slice(-3),
      "[ALERT] REPLAY ATTACK DETECTED: Invalidated token rt_fam_001_gen0 reused!",
      "[SECURITY ACTION] Entire family fam_001 invalidated. All active sessions terminated immediately.",
    ]);
  };

  // 3. Reset Token Family
  const handleResetFamily = () => {
    sound.playClick(900);
    setFamilyStatus("HEALTHY");
    setGeneration(1);
    setTokenNodes([
      { id: "rt_fam_002_gen0", generation: 0, status: "CONSUMED", issuedAt: "11:00:00" },
      { id: "rt_fam_002_gen1", generation: 1, status: "ACTIVE",   issuedAt: "11:15:00" },
    ]);
    setSecurityLogs([
      "[AUTH] New authenticated session established. Token family fam_002 initialized.",
    ]);
  };

  // 4. Test Invalid TOTP Code
  const handleFailTotp = () => {
    sound.playClick(400);
    const nextFails = failedAttempts + 1;
    setFailedAttempts(nextFails);

    if (nextFails >= 5) {
      setIsLockedOut(true);
      setSecurityLogs((prev) => [
        ...prev.slice(-3),
        "[LOCKOUT] 5 consecutive invalid 2FA attempts detected. 10-minute IP lockout enforced.",
      ]);
    } else {
      setSecurityLogs((prev) => [
        ...prev.slice(-3),
        `[2FA FAIL] Invalid TOTP token entered. Attempt ${nextFails}/5 before lockout.`,
      ]);
    }
  };

  // 5. Consume Recovery Code
  const handleUseRecoveryCode = (idx: number) => {
    if (recoveryCodes[idx].used || isLockedOut) return;
    sound.playSuccess();
    setRecoveryCodes((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, used: true } : c))
    );
    setFailedAttempts(0);
    setSecurityLogs((prev) => [
      ...prev.slice(-3),
      `[RECOVERY] Emergency code ${recoveryCodes[idx].code} consumed and permanently invalidated. Session unlocked.`,
    ]);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#07080c] p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-accent">
            <KeyRound size={15} />
          </div>
          <div>
            <span className="font-heading text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>pjmb · Threat Mitigation & Auth Simulator</span>
              <span className="rounded bg-accent/15 border border-accent/30 px-1.5 py-0.2 font-mono text-[9px] text-accent font-semibold">
                Express 5 · Zero-Trust
              </span>
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0c0d12] p-1 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => {
              sound.playClick(1000, 0.01);
              setActiveTab("tokens");
            }}
            className={cn(
              "rounded px-2.5 py-1 transition-all",
              activeTab === "tokens"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Token Family Replay
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick(1000, 0.01);
              setActiveTab("totp");
            }}
            className={cn(
              "rounded px-2.5 py-1 transition-all",
              activeTab === "totp"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Speakeasy 2FA & Lockout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {activeTab === "tokens" ? (
          <div>
            {/* Status Callout */}
            <div className="flex items-center justify-between rounded-xl border p-3 font-mono text-xs mb-4"
              style={{
                borderColor: familyStatus === "HEALTHY" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.4)",
                backgroundColor: familyStatus === "HEALTHY" ? "rgba(16, 185, 129, 0.06)" : "rgba(239, 68, 68, 0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                {familyStatus === "HEALTHY" ? (
                  <ShieldCheck size={16} className="text-emerald-400" />
                ) : (
                  <ShieldAlert size={16} className="text-rose-400 animate-pulse" />
                )}
                <span className={familyStatus === "HEALTHY" ? "text-emerald-300 font-semibold" : "text-rose-300 font-bold"}>
                  Family Status: {familyStatus === "HEALTHY" ? "VALID & ACTIVE" : "COMPROMISED (REVOKED)"}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                Active Gen: {familyStatus === "HEALTHY" ? `Gen ${generation}` : "None (Terminated)"}
              </span>
            </div>

            {/* Token Family Tree Visualization */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                MongoDB Token Family Graph:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {tokenNodes.slice(-3).map((token) => (
                  <div
                    key={token.id}
                    className={cn(
                      "rounded-xl border p-2.5 font-mono text-[10px] transition-all",
                      token.status === "ACTIVE"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-sm"
                        : token.status === "REVOKED"
                        ? "border-rose-500/40 bg-rose-500/15 text-rose-300 line-through"
                        : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{token.id}</span>
                      <span className="text-[9px] uppercase">{token.status}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[9px] text-muted-foreground">
                      <span>Generation {token.generation}</span>
                      <span>{token.issuedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Triggers */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleNormalRotation}
                disabled={familyStatus === "COMPROMISED"}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 px-3 py-2 font-mono text-xs text-accent font-semibold hover:bg-accent hover:text-black disabled:opacity-30 transition-all active:scale-[0.97]"
              >
                <RotateCw size={12} />
                <span>Simulate Token Rotation</span>
              </button>

              <button
                type="button"
                onClick={handleReplayAttack}
                disabled={familyStatus === "COMPROMISED"}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/15 px-3 py-2 font-mono text-xs text-rose-400 font-semibold hover:bg-rose-500 hover:text-white disabled:opacity-30 transition-all active:scale-[0.97]"
              >
                <AlertTriangle size={12} />
                <span>Replay Consumed Token (Trigger Attack)</span>
              </button>

              {familyStatus === "COMPROMISED" && (
                <button
                  type="button"
                  onClick={handleResetFamily}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 font-mono text-xs text-foreground font-semibold hover:bg-white/20 transition-all active:scale-[0.97]"
                >
                  <Unlock size={12} />
                  <span>Re-Authenticate & Reset</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* TOTP 2FA Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* TOTP Authenticator Display */}
              <div className="sm:col-span-6 rounded-xl border border-white/[0.08] bg-[#0c0d12] p-3.5 font-mono">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Speakeasy TOTP HMAC-SHA1</span>
                  <span className="text-accent">{totpSecondsLeft}s left</span>
                </div>
                <div className="text-2xl font-bold tracking-widest text-foreground font-mono">
                  {totpCode}
                </div>
                {/* 30s Countdown Bar */}
                <div className="mt-2 h-1 w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-1000 ease-linear"
                    style={{ width: `${(totpSecondsLeft / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Brute-force Attempt Shield */}
              <div className="sm:col-span-6 rounded-xl border border-white/[0.08] bg-[#0c0d12] p-3.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Brute-Force Guard:</span>
                  <span className={isLockedOut ? "text-rose-400 font-bold" : "text-emerald-400"}>
                    {isLockedOut ? "LOCKED OUT (10m)" : `${failedAttempts} / 5 Fails`}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground leading-normal">
                  Tiered token bucket enforces 10-minute lockout after 5 consecutive failed verification attempts.
                </p>
                <button
                  type="button"
                  onClick={handleFailTotp}
                  disabled={isLockedOut}
                  className="mt-2 text-[10px] text-rose-400 hover:underline disabled:opacity-30"
                >
                  [Simulate Invalid Code Attempt]
                </button>
              </div>
            </div>

            {/* Emergency Single-Use Recovery Codes */}
            <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#090a0f] p-3 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                Single-Use Emergency Recovery Codes (Click to Burn):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {recoveryCodes.map((code, idx) => (
                  <button
                    key={code.code}
                    type="button"
                    onClick={() => handleUseRecoveryCode(idx)}
                    disabled={code.used || isLockedOut}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-center transition-all",
                      code.used
                        ? "border-white/[0.06] bg-white/[0.02] text-muted-foreground line-through opacity-50 cursor-not-allowed"
                        : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 active:scale-95"
                    )}
                  >
                    <span className="text-[11px] font-semibold">{code.code}</span>
                    <span className="block text-[8px] uppercase mt-0.5">
                      {code.used ? "Used" : "Active"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Security Audit Log Stream */}
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#040507] p-3 font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-2 text-muted-foreground uppercase tracking-wider text-[9px]">
            <span className="flex items-center gap-1.5 text-accent font-semibold">
              <Terminal size={11} /> Winston Audit Log Stream (daily-rotate)
            </span>
            <span className="text-emerald-400">Zero-Trust Active</span>
          </div>
          <div className="space-y-1">
            {securityLogs.map((log, i) => (
              <div key={i} className="text-foreground/80 truncate">
                <span className="text-accent">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Technical Copy & Genuine GitHub Link */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3 font-mono text-xs">
          <span className="text-[10px] text-muted-foreground">
            Invariants: Express 5 · MongoDB Mongoose · Speakeasy TOTP · Helmet · Winston Daily-Rotate
          </span>

          <a
            href="https://github.com/Aayush-2825/pjmb"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground hover:border-white/30 transition-all active:scale-[0.97]"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
