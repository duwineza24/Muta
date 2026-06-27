
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const steps = (studentName) => [
  {
    icon: "👨‍💻",
    title: "Hello, Mutangana!",
    sub: ["You taught me that every great program starts with a ", "single click", ". This is yours. Are you ready?"],
    btn: "Run the program →",
    code: null,
  },
  {
    icon: "💡",
    title: "Loading something special...",
    sub: ["You always said: ", "a good function does one thing well.", " This one was built with care — just for you."],
    btn: "Continue →",
    code: `function openSurprise(teacher) {\n  // called with love by your student\n  return teacher.clickNext();\n}`,
  },
  {
    icon: "🌸",
    title: "Almost there...",
    sub: ["You also taught me: ", "patience is the best debugger.", " One more step. Trust the process."],
    btn: "Keep going →",
    code: `while (!arrived()) {\n  keepGoing(); // you taught us this\n}`,
  },
  {
    icon: "🎁",
    title: `Message from ${studentName}...`,
    sub: ["Teacher, this is ", "the gift I have prepared for you.", " I compiled it myself. One final click to open it."],
    btn: "Open the gift 💌",
    code: `// Ecclesiastes 3:1\nconst time = God.appoint("wedding");\n// Output: the perfect moment`,
  },
  { isFinal: true },
];

// ── Song Dedication Popup ─────────────────────────────────────────────────────
function SongDedication({ onClose }) {
  const [typed, setTyped] = useState("");
  const fullText = "Now close your eyes... and dedicate this song to Esther. 🎶";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(3,6,10,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(8px)",
      animation: "fadeInOverlay 0.5s ease",
    }}>
      <div style={{
        maxWidth: 500, width: "90%", textAlign: "center",
        padding: "2.5rem 2rem",
        background: "rgba(15,25,40,0.95)",
        border: "1px solid rgba(240,192,96,0.3)",
        borderRadius: 24,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        animation: "slideIn 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Animated music note */}
        <div style={{ fontSize: 52, marginBottom: "1.2rem", animation: "noteBounce 1.2s ease-in-out infinite" }}>
          🎵
        </div>

        {/* Typewriter message */}
        <p style={{
          fontSize: "1.15rem", color: "#fff", lineHeight: 1.8,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic", minHeight: 60, marginBottom: "1.5rem",
        }}>
          {typed}<span style={{ opacity: typed.length < fullText.length ? 1 : 0, animation: "blink 0.7s step-end infinite", color: "#f0c060" }}>|</span>
        </p>

        {/* The dedication card */}
        <div style={{
          background: "rgba(240,192,96,0.06)",
          border: "1px solid rgba(240,192,96,0.25)",
          borderRadius: 16, padding: "1.4rem 1.6rem",
          marginBottom: "1.8rem",
        }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
            A message for Esther
          </div>
          <p style={{
            fontSize: "1rem", color: "rgba(255,255,255,0.88)",
            lineHeight: 1.85, fontStyle: "italic", margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            "Esther, this song is playing for you.<br />
            From the moment I heard it, I knew it was yours.<br />
            <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>
              Let every note remind you how deeply you are loved
            </span>{" "}
            — not just today, but every Sabbath morning, every quiet evening,
            and every moment God gives us together."
          </p>
          <div style={{ marginTop: "1.2rem", fontSize: "0.85rem", color: "#9fe1cb", fontStyle: "italic" }}>
            ✝️ "I am my beloved's and my beloved is mine." — Song of Solomon 6:3
          </div>
        </div>

        {/* Instruction */}
        <div style={{
          fontSize: "0.9rem", color: "rgba(255,255,255,0.5)",
          marginBottom: "1.5rem", lineHeight: 1.6,
        }}>
          Turn to Esther right now 👉 <span style={{ color: "#f0c060" }}>show her this screen</span> and let the music play for her. 💛
        </div>

        <button
          onClick={onClose}
          style={{
            padding: "12px 36px",
            background: "#f0c060", color: "#1a1100",
            border: "none", borderRadius: 50,
            fontSize: "0.95rem", fontWeight: 700,
            cursor: "pointer", letterSpacing: ".02em",
            boxShadow: "0 4px 15px rgba(240,192,96,0.3)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          I shared it with her 💍
        </button>
      </div>
    </div>
  );
}

// ── Music Button ──────────────────────────────────────────────────────────────
function MusicButton({ audioRef, onDedicate }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 100,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10,
      }}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {showVolume && (
        <div style={{
          background: "rgba(10,18,30,0.95)", border: "1px solid rgba(240,192,96,0.3)",
          borderRadius: 14, padding: "14px 16px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {/* Dedicate to Esther button */}
          <button
            onClick={onDedicate}
            style={{
              background: "rgba(240,192,96,0.1)", border: "1px solid rgba(240,192,96,0.4)",
              borderRadius: 8, padding: "7px 12px",
              color: "#f0c060", fontSize: 11, fontWeight: 600,
              cursor: "pointer", letterSpacing: 0.5,
              whiteSpace: "nowrap", marginBottom: 4,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(240,192,96,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(240,192,96,0.1)")}
          >
            💌 Dedicate to Esther
          </button>

          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>VOLUME</span>
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={handleVolume}
            style={{
              writingMode: "vertical-lr", direction: "rtl",
              width: 6, height: 80, cursor: "pointer", accentColor: "#f0c060",
            }}
          />
          <span style={{ fontSize: 11, color: "#f0c060" }}>{Math.round(volume * 100)}%</span>
        </div>
      )}

      <button
        onClick={toggle}
        title={playing ? "Pause music" : "Play music"}
        style={{
          width: 52, height: 52, borderRadius: "50%",
          background: playing ? "#f0c060" : "rgba(10,18,30,0.85)",
          border: "1.5px solid rgba(240,192,96,0.5)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
          backdropFilter: "blur(10px)",
          boxShadow: playing ? "0 0 18px rgba(240,192,96,0.4)" : "0 4px 14px rgba(0,0,0,0.4)",
          transition: "all 0.25s ease",
          color: playing ? "#1a1100" : "#f0c060",
        }}
      >
        {playing ? "⏸" : "🎵"}
      </button>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textAlign: "center", letterSpacing: 0.5 }}>
        {playing ? "Pause" : "Music"}
      </span>
    </div>
  );
}

// ── Dots ──────────────────────────────────────────────────────────────────────
function Dots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "1.5rem" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: 9, height: 9, borderRadius: "50%",
          background: i < current ? "#5dcaa5" : i === current ? "#f0c060" : "rgba(255,255,255,0.2)",
          transform: i === current ? "scale(1.3)" : "scale(1)",
          transition: "all 0.3s",
        }} />
      ))}
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ pct }) {
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: "2rem", overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "#f0c060", borderRadius: 2, transition: "width 0.5s ease" }} />
    </div>
  );
}

// ── Code Block ────────────────────────────────────────────────────────────────
function CodeBlock({ code }) {
  return (
    <div style={{
      background: "rgba(0,0,0,0.5)", borderRadius: 12, padding: "1rem 1.2rem",
      textAlign: "left", marginBottom: "1.4rem", border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)", width: "100%", boxSizing: "border-box",
    }}>
      <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.7, color: "#e2e8f0", whiteSpace: "pre-wrap", margin: 0 }}>
        {code}
      </pre>
    </div>
  );
}

// ── Three.js Background ───────────────────────────────────────────────────────
function ThreeBackground() {
  const mountRef = useRef(null);
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0.5, 0.5, 1, 1, 1);
    heartShape.bezierCurveTo(1.8, 1, 2, 0.3, 2, 0);
    heartShape.bezierCurveTo(2, -0.5, 1.3, -1.3, 0, -2.2);
    heartShape.bezierCurveTo(-1.3, -1.3, -2, -0.5, -2, 0);
    heartShape.bezierCurveTo(-2, 0.3, -1.8, 1, -1, 1);
    heartShape.bezierCurveTo(-0.5, 1, 0, 0.5, 0, 0);
    const geometry = new THREE.ExtrudeGeometry(heartShape, { depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.15, bevelThickness: 0.15 });
    geometry.center();
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xfff0dd, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const colors = [0xf0c060, 0xff6b9d, 0x5dcaa5, 0xc792ea];
    const heartsArray = [];
    for (let i = 0; i < 35; i++) {
      const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.3, metalness: 0.1 }));
      mesh.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20 - 10);
      const scale = Math.random() * 0.4 + 0.2;
      mesh.scale.set(scale, scale, scale);
      mesh.userData = { speedY: Math.random() * 0.03 + 0.01, rotSpeedX: (Math.random() - 0.5) * 0.01, rotSpeedY: (Math.random() - 0.5) * 0.01 };
      scene.add(mesh);
      heartsArray.push(mesh);
    }
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      heartsArray.forEach((h) => {
        h.position.y += h.userData.speedY;
        h.rotation.x += h.userData.rotSpeedX;
        h.rotation.y += h.userData.rotSpeedY;
        if (h.position.y > 25) { h.position.y = -25; h.position.x = (Math.random() - 0.5) * 50; }
      });
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      heartsArray.forEach((h) => h.material.dispose());
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// ── Photo Card ────────────────────────────────────────────────────────────────
function PhotoCard({ label, icon, photo, onUpload, height = 240 }) {
  return (
    <label className="photo-upload-card" style={{ flex: "1 1 200px", height, border: "1px dashed rgba(240,192,96,0.4)", borderRadius: 16, background: "rgba(255,255,255,0.03)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
      <input type="file" accept="image/*" style={{ display: "none" }} onChange={onUpload} />
      {photo ? <img src={photo} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
        <div style={{ padding: "1.5rem", textAlign: "center", zIndex: 2 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'Segoe UI',sans-serif", fontWeight: 500 }}>{label}</div>
        </div>
      )}
    </label>
  );
}

// ── Final Screen ──────────────────────────────────────────────────────────────
function FinalScreen({ onRestart, studentName, totalSteps, onDedicate }) {
  const [groomPic, setGroomPic] = useState(() => localStorage.getItem("groom_pic") || null);
  const [couplePic, setCouplePic] = useState(() => localStorage.getItem("couple_pic") || null);
  const [bridePic, setBridePic] = useState(() => localStorage.getItem("bride_pic") || null);

  const handleFileChange = (e, setPic, storageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setPic(reader.result); localStorage.setItem(storageKey, reader.result); };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const colors = ["#f0c060", "#ff6b9d", "#c792ea", "#82aaff", "#c3e88d", "#5dcaa5"];
    const container = document.getElementById("wedding-root");
    if (!container) return;
    const els = [];
    for (let i = 0; i < 70; i++) {
      const el = document.createElement("div");
      const dx = (Math.random() - 0.5) * 400, dy = -(Math.random() * 300 + 100);
      el.style.cssText = `position:absolute;width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:50%;left:${40 + Math.random() * 20}%;top:40%;z-index:10;pointer-events:none`;
      container.appendChild(el);
      els.push(el);
      el.animate([{ opacity: 1, transform: "translate(0,0) scale(1) rotate(0deg)" }, { opacity: 0, transform: `translate(${dx}px,${dy}px) scale(0.5) rotate(${Math.random() * 1080}deg)` }], { duration: 1500 + Math.random() * 800, easing: "cubic-bezier(0.1,1,0.1,1)", delay: Math.random() * 200 }).finished.then(() => el.remove());
    }
    return () => els.forEach((el) => el.remove());
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 840, textAlign: "center", animation: "slideIn 0.6s cubic-bezier(0.16,1,0.3,1)", padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Dots current={totalSteps - 1} total={totalSteps} />
      <ProgressBar pct={100} />

      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(240,192,96,0.5)", color: "#f0c060", padding: "6px 24px", borderRadius: 50, fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1.5rem", background: "rgba(240,192,96,0.05)" }}>
        <span>💍</span> Wedding Celebration
      </div>

      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 400, color: "#fff", margin: "0.5rem 0 1rem 0" }}>
        Mutangana <span style={{ color: "#f0c060", fontFamily: "sans-serif", fontStyle: "italic", fontWeight: 300 }}>&</span> Esther
      </h1>

      <div style={{ display: "flex", alignItems: "center", maxWidth: 280, gap: 16, marginBottom: "2.5rem", width: "100%" }}>
        <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.2))", flex: 1 }} />
        <span style={{ fontSize: 16, color: "#f0c060" }}>💍</span>
        <div style={{ height: 1, background: "linear-gradient(to left,transparent,rgba(255,255,255,0.2))", flex: 1 }} />
      </div>

      <div style={{ display: "flex", gap: "1.5rem", width: "100%", flexWrap: "wrap", alignItems: "center", marginBottom: "3rem" }}>
        <PhotoCard label="Add photo of Mutangana" icon="🤵" photo={groomPic} onUpload={(e) => handleFileChange(e, setGroomPic, "groom_pic")} height={240} />
        <PhotoCard label="Add a couple photo here" icon="🥂" photo={couplePic} onUpload={(e) => handleFileChange(e, setCouplePic, "couple_pic")} height={300} />
        <PhotoCard label="Add photo of Esther" icon="👰‍♀️" photo={bridePic} onUpload={(e) => handleFileChange(e, setBridePic, "bride_pic")} height={240} />
      </div>

      <div style={{ background: "rgba(15,23,42,0.4)", border: "1px solid rgba(240,192,96,0.25)", borderRadius: 20, padding: "2rem", marginBottom: "1.5rem", backdropFilter: "blur(12px)", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", width: "100%", boxSizing: "border-box" }}>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.9, fontStyle: "italic", margin: 0 }}>
          Teacher, you gave me more than code — you gave me{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>discipline, clarity, and a love for getting things right.</span>{" "}
          Today, as you write the most beautiful program of your life with{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>Esther</span> by your side,
          we pray your marriage is like the best code you ever wrote:{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>clean, purposeful, and built to last.</span>
          <br /><br />
          May the Lord who blessed the first wedding in Cana{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>bless yours abundantly.</span>{" "}
          May your home be filled with His peace, laughter, and Sabbath rest — every week, together.
        </p>
        <p style={{ fontSize: ".85rem", color: "#9fe1cb", marginTop: "1.5rem", fontStyle: "italic", margin: "1.5rem 0 0 0" }}>
          ✝️ "Two are better than one… for if they fall, the one will lift up the other." — Eccl. 4:9–10
        </p>
      </div>

      {/* ── Song Dedication Banner ── */}
      <div
        onClick={onDedicate}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "rgba(240,192,96,0.07)",
          border: "1px solid rgba(240,192,96,0.35)",
          borderRadius: 16, padding: "1.2rem 1.6rem",
          marginBottom: "1.5rem", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 16,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,192,96,0.13)"; e.currentTarget.style.borderColor = "rgba(240,192,96,0.6)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,192,96,0.07)"; e.currentTarget.style.borderColor = "rgba(240,192,96,0.35)"; }}
      >
        <div style={{ fontSize: 32, flexShrink: 0 }}>🎵</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "#f0c060", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>
            This song playing right now...
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.5 }}>
            Mutangana — tap here to dedicate it to Esther. She deserves to hear it. 💛
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: "#f0c060", fontSize: 20, flexShrink: 0 }}>›</div>
      </div>

      <CodeBlock code={`// Devothe's wedding gift in code\nconst marriage = {\n  groom:  "Mutangana",\n  bride:  "Esther",\n  love:   Infinity,\n  faith:  "Adventist — strong",\n  bugs:   0\n};\n// May God compile this perfectly 🙏`} />

      <div style={{ fontSize: ".9rem", color: "rgba(255,255,255,0.4)", marginTop: "1rem", letterSpacing: "0.5px" }}>
        — with love from your student, {studentName} 🎓
      </div>

      <button onClick={onRestart} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", textDecoration: "underline", fontSize: "0.85rem", cursor: "pointer", marginTop: "2.5rem", fontFamily: "inherit" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f0c060")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
        🔄 Restart Experience
      </button>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function WeddingWish() {
  const studentName = "Devothe";
  const [step, setStep] = useState(0);
  const [showDedication, setShowDedication] = useState(false);
  const audioRef = useRef(null);
  const currentSteps = steps(studentName);
  const s = currentSteps[step];
  const pct = Math.round((step / (currentSteps.length - 1)) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        body { margin: 0; padding: 0; background: #04080e; overflow-x: hidden; }
        @keyframes slideIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInOverlay { from { opacity:0; } to { opacity:1; } }
        @keyframes noteBounce { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .photo-upload-card:hover {
          border-color: #f0c060 !important;
          transform: translateY(-5px);
          background: rgba(240,192,96,0.04) !important;
          box-shadow: 0 12px 30px rgba(240,192,96,0.15) !important;
        }
      `}</style>

      {/*
        🎵 MUSIC SETUP:
        Place music.mp3 inside the /public folder of your project.
        It will be available at /music.mp3 automatically.
      */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Song dedication popup */}
      {showDedication && <SongDedication onClose={() => setShowDedication(false)} />}

      {/* Music button — hover to reveal volume + dedicate button */}
      <MusicButton audioRef={audioRef} onDedicate={() => setShowDedication(true)} />

      <div
        id="wedding-root"
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          minHeight: "100vh", width: "100vw",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "3rem max(1rem, 5vw)", position: "relative",
          overflowX: "hidden",
          background: "radial-gradient(ellipse at center,#0f1c2c 0%,#060e17 75%,#03060a 100%)",
          boxSizing: "border-box",
        }}
      >
        <ThreeBackground />

        {s.isFinal ? (
          <FinalScreen
            onRestart={() => setStep(0)}
            studentName={studentName}
            totalSteps={currentSteps.length}
            onDedicate={() => setShowDedication(true)}
          />
        ) : (
          <div key={step} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 540, textAlign: "center", animation: "slideIn 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
            <Dots current={step} total={currentSteps.length} />
            <ProgressBar pct={pct} />
            <span style={{ fontSize: 56, marginBottom: "1.5rem", display: "block" }}>{s.icon}</span>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 600, color: "#fff", lineHeight: 1.4, marginBottom: "1rem" }}>{s.title}</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem" }}>
              {s.sub[0]}
              <em style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>{s.sub[1]}</em>
              {s.sub[2]}
            </p>
            {s.code && <CodeBlock code={s.code} />}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => setStep((p) => p + 1)}
                style={{ padding: "14px 40px", background: "#f0c060", color: "#1a1100", border: "none", borderRadius: 50, fontSize: "1rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 15px rgba(240,192,96,0.2)", transition: "transform 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >{s.btn}</button>
              {step > 0 && (
                <button onClick={() => setStep((p) => p - 1)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.9rem", padding: "4px 12px", fontFamily: "inherit" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                  ← Back
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
