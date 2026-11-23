"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import ConfettiButton from "@/components/ruixen/confetti-button";

// The Kenney cube panda sitting in a blocky basket. Until it loads (or if WebGL
// or the model fails) the drawn basket shows instead.
export function PandaStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const party = useRef(() => {});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (err) {
      console.warn("WebGL is unavailable, so the drawn basket stays.", err);
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 1.7, 7);
    camera.lookAt(0, 0.42, 0);

    scene.add(new THREE.HemisphereLight(0xc4d2ff, 0x2a2140, 1.3));
    const lamp = new THREE.DirectionalLight(0xffd28a, 2.8);
    lamp.position.set(-3, 4, 3);
    const rim = new THREE.DirectionalLight(0x8fa8ff, 1.8);
    rim.position.set(3, 2.5, -3);
    scene.add(lamp, rim, contactShadow());

    const rig = new THREE.Group();
    rig.rotation.y = -0.3;
    rig.add(basket());
    scene.add(rig);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const sizer = new ResizeObserver(resize);
    sizer.observe(canvas);

    let alive = true;
    const undo: (() => void)[] = [];

    new GLTFLoader().load(
      "/models/animal-panda.glb",
      (gltf) => {
        if (!alive) return;
        const panda = gltf.scene;
        panda.position.y = -0.25; // the model's feet sit 0.3 below its origin; this puts them on the basket floor
        rig.add(panda);

        const mixer = new THREE.AnimationMixer(panda);
        const action = (name: string) =>
          mixer.clipAction(THREE.AnimationClip.findByName(gltf.animations, name)!);
        const idle = action("idle").play();
        const dance = action("dance").setLoop(THREE.LoopRepeat, 3); // the clip is only 0.5s, so play it three times
        dance.clampWhenFinished = true;
        idle.paused = still;

        mixer.addEventListener("finished", () => {
          idle.reset().play();
          idle.paused = still;
          dance.crossFadeTo(idle, 0.35, false);
        });
        // No "already dancing" guard: a click mid-dance simply restarts it, so it can never get stuck
        party.current = () => {
          dance.reset().play();
          idle.crossFadeTo(dance, 0.25, false);
        };
        // The panda turns to face the pointer; the rig's own turn is cancelled so it faces you at rest
        let aim = 0;
        const onPointer = (e: PointerEvent) => {
          aim = e.clientX / innerWidth - 0.5;
        };
        addEventListener("pointermove", onPointer, { passive: true });
        undo.push(() => removeEventListener("pointermove", onPointer));

        const timer = new THREE.Timer();
        const tick = (time: number) => {
          timer.update(time);
          const dt = Math.min(timer.getDelta(), 0.05); // a resume after a pause counts as one short frame
          mixer.update(dt);
          panda.rotation.y += (0.3 + aim * 0.9 - panda.rotation.y) * 0.06;
          if (!still) rig.rotation.y = -0.3 + Math.sin(timer.getElapsed() * 0.4) * 0.08;
          renderer.render(scene, camera);
        };

        // Only render while the stage is on screen and the tab is visible
        let onScreen = true;
        const run = () => renderer.setAnimationLoop(onScreen && !document.hidden ? tick : null);
        const seen = new IntersectionObserver(([entry]) => {
          onScreen = entry.isIntersecting;
          run();
        });
        seen.observe(stage);
        document.addEventListener("visibilitychange", run);
        undo.push(() => seen.disconnect());
        undo.push(() => document.removeEventListener("visibilitychange", run));
        run();
        setReady(true);
      },
      undefined,
      (err) => console.warn("The 3D panda did not load, so the drawn basket stays.", err),
    );

    return () => {
      alive = false;
      party.current = () => {};
      renderer.setAnimationLoop(null);
      sizer.disconnect();
      undo.forEach((fn) => fn());
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          for (const m of [obj.material].flat() as THREE.MeshStandardMaterial[]) {
            m.map?.dispose();
            m.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`stage${ready ? " is-ready" : ""}`} ref={stageRef}>
      <div className="glow" aria-hidden="true" />
      <svg className="stage-fallback" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <path d="M30 55 Q30 25 60 25 Q90 25 90 55" stroke="#ffcf6e" strokeWidth="6" strokeLinecap="round" />
        <rect x="15" y="55" width="90" height="50" rx="14" fill="#c68a4e" stroke="#ffcf6e" strokeWidth="2.5" />
        <line x1="15" y1="70" x2="105" y2="70" stroke="#a96c38" strokeWidth="2" />
        <line x1="15" y1="83" x2="105" y2="83" stroke="#a96c38" strokeWidth="2" />
        <line x1="35" y1="55" x2="35" y2="105" stroke="#a96c38" strokeWidth="2" />
        <line x1="55" y1="55" x2="55" y2="105" stroke="#a96c38" strokeWidth="2" />
        <line x1="75" y1="55" x2="75" y2="105" stroke="#a96c38" strokeWidth="2" />
        <circle cx="42" cy="48" r="10" fill="#ffb38a" />
        <circle cx="60" cy="44" r="12" fill="#fff6d6" />
        <circle cx="78" cy="48" r="10" fill="#e8505b" />
        <path d="M57 42 C57 40.3 58.1 39.5 59 39.5 C60 39.5 61 40 61 40 C61 40 62 39.5 63 39.5 C63.9 39.5 65 40.3 65 42 C65 44 61 47 61 47 C61 47 57 44 57 42Z" fill="#e8505b" />
      </svg>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A 3D panda sitting in a care basket"
        onClick={() => party.current()}
      />
      {ready && (
        <div className="stage-btn">
          <ConfettiButton
            label="Make the panda dance"
            onClick={() => party.current()}
            style={{ minHeight: 44, padding: "10px 20px", fontSize: 15, fontWeight: 600, borderRadius: 999 }}
          />
        </div>
      )}
    </div>
  );
}

// A woven basket made of blocks, to match the blocky Kenney pets
function basket() {
  const group = new THREE.Group();
  const mats: Record<number, THREE.MeshStandardMaterial> = {};
  const block = (w: number, h: number, d: number, color: number, x: number, y: number, z: number) => {
    mats[color] ??= new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats[color]);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };
  const W = 2.1, D = 1.75, T = 0.12, floor = -0.6;
  block(W, 0.1, D, 0x8a5530, 0, floor, 0);
  for (let i = 0; i < 4; i++) {
    const y = floor + 0.15 + i * 0.2;
    const c = i % 2 ? 0xc68a4e : 0xa96c38;
    block(W, 0.17, T, c, 0, y, D / 2);
    block(W, 0.17, T, c, 0, y, -D / 2);
    block(T, 0.17, D, c, W / 2, y, 0);
    block(T, 0.17, D, c, -W / 2, y, 0);
  }
  const rimY = 0.27;
  block(W + 0.1, 0.1, T + 0.08, 0xdba26a, 0, rimY, D / 2);
  block(W + 0.1, 0.1, T + 0.08, 0xdba26a, 0, rimY, -D / 2);
  block(T + 0.08, 0.1, D + 0.1, 0xdba26a, W / 2, rimY, 0);
  block(T + 0.08, 0.1, D + 0.1, 0xdba26a, -W / 2, rimY, 0);
  // Handle: an arch just behind the panda; the blocks overlap so it reads as one solid band
  for (let i = 0; i <= 24; i++) {
    const a = (Math.PI * i) / 24;
    block(0.16, 0.16, 0.14, 0xc68a4e, Math.cos(a) * (W / 2 - 0.06), rimY + Math.sin(a) * 1.25, -D / 2 + 0.02).rotation.z = a;
  }
  // Pixel heart on the front
  const heart = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];
  const s = 0.075;
  heart.forEach((row, r) =>
    [...row].forEach((ch, c) => {
      if (ch === "X") block(s, s, 0.04, 0xe8505b, (c - 3) * s, 0.04 - r * s, D / 2 + T / 2 + 0.02);
    }),
  );
  return group;
}

function contactShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(0, 0, 0, .5)");
  grd.addColorStop(1, "rgba(0, 0, 0, 0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.8),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.66;
  return mesh;
}
