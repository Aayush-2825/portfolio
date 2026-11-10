"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionOK } from "@/lib/motion";
import { sound } from "@/lib/sound";
import {
  RotateCw,
  Maximize2,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface NodeMetadata {
  id: string;
  name: string;
  category: string;
  stack: string;
  role: string;
  position: [number, number, number];
  color: number;
  hex: string;
  orbitRadius: number;
  geometryType: "icosahedron" | "octahedron" | "dodecahedron" | "box" | "tetrahedron";
  repo: string;
  live?: string;
}

export const ARCHITECTURE_NODES: NodeMetadata[] = [
  {
    id: "dozo",
    name: "DOZO",
    category: "Real-Time Dispatch Engine",
    stack: "Fastify 5 · Drizzle ORM · PostgreSQL · Redis · WebSockets",
    role: "Core real-time dispatch state machine & geohash clustering engine with PostgreSQL row locks.",
    position: [-2.1, 0.4, 0.2],
    color: 0xff4d1f, // Brand Vermillion
    hex: "#FF4D1F",
    orbitRadius: 0.9,
    geometryType: "icosahedron",
    repo: "https://github.com/Aayush-2825/dozo",
    live: "https://dozo.work",
  },
  {
    id: "viewproof",
    name: "ViewProof",
    category: "Photo Proofing & Media Engine",
    stack: "React 19 · Router 7 · Firestore · Cloudinary CDN",
    role: "Reactive client proofing with onSnapshot listeners & dynamic edge watermarking transforms.",
    position: [2.1, 1.2, -0.4],
    color: 0x38bdf8, // Sky Blue
    hex: "#38BDF8",
    orbitRadius: 0.75,
    geometryType: "octahedron",
    repo: "https://github.com/Aayush-2825/ViewProof",
    live: "https://view-proof.vercel.app",
  },
  {
    id: "pjmb",
    name: "pjmb Auth",
    category: "Threat Mitigation Microservice",
    stack: "Express 5 · MongoDB · Speakeasy TOTP · Winston",
    role: "Rotating refresh token families with automatic replay attack revocation & 10-min lockouts.",
    position: [-1.6, -1.3, 0.5],
    color: 0x34d399, // Emerald
    hex: "#34D399",
    orbitRadius: 0.8,
    geometryType: "dodecahedron",
    repo: "https://github.com/Aayush-2825/pjmb",
  },
  {
    id: "swabhimaan",
    name: "Swabhimaan-2",
    category: "Headless Publishing Platform",
    stack: "Next.js 15.5 · Payload CMS 3.64 · Cloudflare R2",
    role: "13 structured collections with zero-egress R2 media storage & server-side WebP generation.",
    position: [1.8, -1.1, 0.3],
    color: 0xfbbf24, // Amber
    hex: "#FBBF24",
    orbitRadius: 0.7,
    geometryType: "box",
    repo: "https://github.com/Aayush-2825/Swabhimaan-2",
    live: "https://swabhimaan-2.vercel.app",
  },
  {
    id: "blog",
    name: "Engineering Blog",
    category: "Relational Knowledge Graph",
    stack: "Next.js 15.3 · Prisma 6.6 · PostgreSQL · Kinde Auth",
    role: "Relational schema flow with UUID primary keys & sub-20ms static edge distribution.",
    position: [0.0, 1.7, -0.1],
    color: 0xa855f7, // Purple
    hex: "#A855F7",
    orbitRadius: 0.65,
    geometryType: "tetrahedron",
    repo: "https://github.com/Aayush-2825/blog",
  },
];

export function Architectural3DCanvas({
  className,
  onInspectProject,
}: {
  className?: string;
  onInspectProject?: (slug: string) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const motionOK = useMotionOK();
  const [activeNode, setActiveNode] = useState<NodeMetadata>(ARCHITECTURE_NODES[0]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: NodeMetadata } | null>(null);
  const [isRenderPaused, setIsRenderPaused] = useState(false);
  const [userModeOverride, setUserModeOverride] = useState<"3D" | "FALLBACK" | null>(null);
  const mode = userModeOverride ?? (motionOK ? "3D" : "FALLBACK");

  useEffect(() => {
    const container = mountRef.current;
    if (!container || mode === "FALLBACK") return;

    let animationFrameId: number;
    let isVisible = true;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.08);

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Blueprint Coordinate Grid Floor & Range Rings
    const gridHelper = new THREE.GridHelper(10, 20, 0x22222b, 0x141418);
    gridHelper.position.y = -1.8;
    scene.add(gridHelper);

    // Coordinate concentric range rings
    const ringGroup = new THREE.Group();
    [1.8, 3.2, 4.6].forEach((radius) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.015, radius, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x272730,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -1.79;
      ringGroup.add(ringMesh);
    });
    scene.add(ringGroup);

    // 3. Node Meshes & Wireframe Enclosures
    const nodeObjects: {
      metadata: NodeMetadata;
      mesh: THREE.Mesh;
      ring: THREE.Line;
      core: THREE.Mesh;
    }[] = [];

    const nodesGroup = new THREE.Group();

    ARCHITECTURE_NODES.forEach((node) => {
      let geo: THREE.BufferGeometry;
      switch (node.geometryType) {
        case "icosahedron":
          geo = new THREE.IcosahedronGeometry(0.38, 0);
          break;
        case "octahedron":
          geo = new THREE.OctahedronGeometry(0.38, 0);
          break;
        case "dodecahedron":
          geo = new THREE.DodecahedronGeometry(0.36, 0);
          break;
        case "box":
          geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          break;
        case "tetrahedron":
          geo = new THREE.TetrahedronGeometry(0.42, 0);
          break;
      }

      // Outer Wireframe
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, wireframeMat);
      mesh.position.set(...node.position);

      // Inner glowing core
      const coreGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.95,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      mesh.add(core);

      // Orbital Telemetry Halo
      const haloGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * node.orbitRadius, 0, Math.sin(theta) * node.orbitRadius));
      }
      haloGeo.setFromPoints(points);
      const haloMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.3,
      });
      const ring = new THREE.Line(haloGeo, haloMat);
      ring.position.set(...node.position);
      ring.rotation.x = Math.PI * 0.15;

      nodesGroup.add(mesh);
      nodesGroup.add(ring);

      nodeObjects.push({ metadata: node, mesh, ring, core });
    });

    scene.add(nodesGroup);

    // 4. Data Flow Beams (Curves connecting systems)
    const curveConnections = [
      [0, 1], // DOZO <-> ViewProof
      [0, 2], // DOZO <-> pjmb
      [0, 4], // DOZO <-> Blog
      [1, 3], // ViewProof <-> Swabhimaan
      [2, 3], // pjmb <-> Swabhimaan
    ];

    const linesGroup = new THREE.Group();
    const packetMeshes: { curve: THREE.CatmullRomCurve3; mesh: THREE.Mesh; speed: number; offset: number }[] = [];

    curveConnections.forEach(([fromIdx, toIdx], cIdx) => {
      const fromNode = ARCHITECTURE_NODES[fromIdx];
      const toNode = ARCHITECTURE_NODES[toIdx];

      const p1 = new THREE.Vector3(...fromNode.position);
      const p2 = new THREE.Vector3(...toNode.position);
      const mid = new THREE.Vector3()
        .addVectors(p1, p2)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.4 + (cIdx % 2) * 0.2, 0.2));

      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x3b3d4a,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      linesGroup.add(line);

      // Data packet satellite traveling on curve
      const packetGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({
        color: fromNode.color,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      linesGroup.add(packetMesh);

      packetMeshes.push({
        curve,
        mesh: packetMesh,
        speed: 0.003 + (cIdx * 0.001),
        offset: (cIdx * 0.2) % 1,
      });
    });

    scene.add(linesGroup);

    // 5. Mouse Parallax & Normalized Coordinates
    let targetCameraX = 0;
    let targetCameraY = 1.2;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetCameraX = x * 0.8;
      targetCameraY = 1.2 + y * 0.4;

      // Raycasting for interactive hover feedback
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(nodeObjects.map((n) => n.mesh));

      if (intersects.length > 0) {
        const hit = nodeObjects.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          container.style.cursor = "pointer";
          setTooltip({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            node: hit.metadata,
          });
          return;
        }
      }
      container.style.cursor = "default";
      setTooltip(null);
    };

    container.addEventListener("mousemove", handlePointerMove);

    // Raycast click
    const handlePointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(nodeObjects.map((n) => n.mesh));

      if (intersects.length > 0) {
        const hit = nodeObjects.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          sound.playClick(1400, 0.02);
          focusNode(hit.metadata);
          onInspectProject?.(hit.metadata.id);
        }
      }
    };

    container.addEventListener("click", handlePointerClick);

    // 6. Camera Focus Animation via GSAP
    const focusNode = (node: NodeMetadata) => {
      setActiveNode(node);
      const [nx, ny, nz] = node.position;
      gsap.to(camera.position, {
        x: nx * 0.7,
        y: ny * 0.7 + 0.4,
        z: nz + 2.8,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(nx * 0.4, ny * 0.4, 0);
        },
      });
    };

    // 7. Global Custom Event Listener (Triggered by TerminalDrawer CLI commands)
    const handleFocusEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ project: string }>;
      const targetSlug = customEvent.detail?.project?.toLowerCase();
      if (!targetSlug) return;

      const found = ARCHITECTURE_NODES.find(
        (n) => n.id === targetSlug || n.name.toLowerCase().includes(targetSlug)
      );
      if (found) {
        focusNode(found);
        container.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("focus-3d-node", handleFocusEvent as EventListener);

    // 8. GSAP ScrollTrigger Integration
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        // Subtle cinematic camera pitch & orbit based on page scroll
        nodesGroup.rotation.y = self.progress * Math.PI * 0.6;
        gridHelper.rotation.y = self.progress * 0.4;
      },
    });

    // 9. Intersection Observer (Pause rendering when off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          setIsRenderPaused(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 400;
      const nh = container.clientHeight || 340;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener("resize", handleResize);

    // 10. Main WebGL Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards target
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Animate node rotations
      nodeObjects.forEach(({ mesh, ring, core }, idx) => {
        mesh.rotation.x += 0.01 + idx * 0.002;
        mesh.rotation.y += 0.015 + idx * 0.002;
        ring.rotation.z += 0.005;

        // Subtle hover float
        mesh.position.y = ARCHITECTURE_NODES[idx].position[1] + Math.sin(elapsed * 2 + idx) * 0.06;

        // Core pulse
        const pulse = 1 + Math.sin(elapsed * 4 + idx) * 0.2;
        core.scale.set(pulse, pulse, pulse);
      });

      // Animate data packet pulses
      packetMeshes.forEach((item) => {
        item.offset = (item.offset + item.speed) % 1;
        const pt = item.curve.getPoint(item.offset);
        item.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("focus-3d-node", handleFocusEvent as EventListener);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handlePointerClick);
      scrollTriggerInstance.kill();

      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, onInspectProject]);

  return (
    <div
      data-lenis-prevent
      className={cn(
        "relative rounded-2xl border border-white/[0.12] bg-[#08080a] p-4 sm:p-5 shadow-2xl overflow-hidden backdrop-blur-md select-none transition-all",
        className
      )}
    >
      {/* Chrome Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-semibold uppercase tracking-wider text-foreground">
              3D Blueprint Topology
            </span>
          </div>
          <span className="hidden sm:inline-block rounded bg-accent/15 px-2 py-0.5 text-[10px] text-accent font-bold">
            WebGL · 60 FPS
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          {isRenderPaused ? (
            <span className="text-amber-400 font-mono text-[10px]">PAUSED (OFFSCREEN)</span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE RENDER</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              sound.playClick(1100);
              setUserModeOverride(mode === "3D" ? "FALLBACK" : "3D");
            }}
            className="rounded border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 hover:text-foreground text-[10px]"
            title="Toggle WebGL / 2D Schematic"
          >
            {mode === "3D" ? "2D View" : "3D View"}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport / Reduced-Motion Fallback */}
      <div className="relative mt-3 h-[280px] sm:h-[320px] w-full overflow-hidden rounded-xl bg-[#050507] border border-white/[0.05]">
        {mode === "3D" ? (
          <div ref={mountRef} className="h-full w-full touch-none" />
        ) : (
          /* Reduced-Motion / 2D CAD Blueprint Fallback */
          <div className="h-full w-full p-4 flex flex-col justify-between font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[11px] text-muted-foreground">
              <span>Static CAD Schematic (Reduced-Motion Mode)</span>
              <span>5 Verified Subsystems</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-auto">
              {ARCHITECTURE_NODES.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    sound.playClick(1000);
                    setActiveNode(n);
                  }}
                  className={cn(
                    "p-2.5 rounded-lg border text-left cursor-pointer transition-all",
                    activeNode.id === n.id
                      ? "border-accent bg-accent/15 text-foreground"
                      : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-[10px] uppercase font-bold" style={{ color: n.hex }}>
                    {n.name}
                  </span>
                  <p className="text-[9px] mt-1 text-muted-foreground line-clamp-1">{n.category}</p>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground/60">
              Zero layout shifts. Accessible high-contrast presentation.
            </span>
          </div>
        )}

        {/* Floating Tooltip on Node Hover */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-lg border border-white/20 bg-black/90 p-2.5 shadow-2xl backdrop-blur-md font-mono text-[10px] transition-transform duration-75"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y - 12}px` }}
          >
            <div className="flex items-center gap-1.5 font-bold" style={{ color: tooltip.node.hex }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tooltip.node.hex }} />
              <span>{tooltip.node.name}</span>
            </div>
            <span className="text-white/80 mt-0.5 block">{tooltip.node.category}</span>
            <span className="text-muted-foreground/90 mt-1 block text-[9px] truncate max-w-[200px]">
              {tooltip.node.stack}
            </span>
          </div>
        )}

        {/* Orbit Helper Prompt */}
        <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/60 px-2.5 py-1 font-mono text-[9px] text-muted-foreground/80 backdrop-blur-sm">
          <RotateCw size={9} className="text-accent animate-spin" style={{ animationDuration: "8s" }} />
          <span>Move mouse to orbit · Click node to inspect</span>
        </div>
      </div>

      {/* Selected Node Telemetry Strip */}
      <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0c0d12] p-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeNode.hex }} />
            <span className="font-bold text-foreground text-sm">{activeNode.name}</span>
            <span className="text-[10px] uppercase text-muted-foreground">({activeNode.category})</span>
          </div>

          <div className="flex items-center gap-2">
            {activeNode.live && (
              <a
                href={activeNode.live}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(1000)}
                className="text-[10px] text-accent hover:underline flex items-center gap-1"
              >
                <span>Live App</span>
                <Maximize2 size={10} />
              </a>
            )}
            <a
              href={activeNode.repo}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              className="text-[10px] text-foreground/80 hover:text-accent hover:underline flex items-center gap-1"
            >
              <span>GitHub</span>
              <Cpu size={10} />
            </a>
          </div>
        </div>

        <p className="mt-2 text-xs text-foreground/85 leading-relaxed font-sans">
          {activeNode.role}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="text-accent font-semibold">Stack:</span>
          <span>{activeNode.stack}</span>
        </div>
      </div>

      {/* Quick Navigation Node Buttons */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono scrollbar-none pb-0.5">
        <span className="text-muted-foreground/60 shrink-0 uppercase tracking-wider text-[9px]">Focus:</span>
        {ARCHITECTURE_NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                sound.playClick(1200);
                setActiveNode(node);
                // Dispatch event so 3D camera animates
                window.dispatchEvent(
                  new CustomEvent("focus-3d-node", { detail: { project: node.id } })
                );
              }}
              className={cn(
                "inline-flex items-center gap-1 shrink-0 rounded-md border px-2 py-1 font-semibold transition-all active:scale-95",
                isSelected
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: node.hex }} />
              <span>{node.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
