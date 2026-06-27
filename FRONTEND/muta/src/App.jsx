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

function Dots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "1.5rem" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 9, height: 9, borderRadius: "50%",
            background: i < current ? "#5dcaa5" : i === current ? "#f0c060" : "rgba(255,255,255,0.2)",
            transform: i === current ? "scale(1.3)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ pct }) {
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: "2rem", overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "#f0c060", borderRadius: 2, transition: "width 0.5s ease" }} />
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <div style={{
      background: "rgba(0,0,0,0.5)", borderRadius: 12, padding: "1rem 1.2rem",
      textAlign: "left", marginBottom: "1.4rem", border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)", width: "100%", boxSizing: "border-box"
    }}>
      <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.7, color: "#e2e8f0", whiteSpace: "pre-wrap", margin: 0 }}>
        {code}
      </pre>
    </div>
  );
}

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

    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.15, bevelThickness: 0.15 };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0dd, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const heartCount = 35;
    const heartsArray = [];
    const colors = [0xf0c060, 0xff6b9d, 0x5dcaa5, 0xc792ea];

    for (let i = 0; i < heartCount; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.3,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 10
      );

      const scale = Math.random() * 0.4 + 0.2;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        speedY: Math.random() * 0.03 + 0.01,
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
      };

      scene.add(mesh);
      heartsArray.push(mesh);
    }

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      heartsArray.forEach((heart) => {
        heart.position.y += heart.userData.speedY;
        heart.rotation.x += heart.userData.rotSpeedX;
        heart.rotation.y += heart.userData.rotSpeedY;

        if (heart.position.y > 25) {
          heart.position.y = -25;
          heart.position.x = (Math.random() - 0.5) * 50;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      heartsArray.forEach((heart) => heart.material.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

function PhotoCard({ label, icon, photo, onUpload, height = 240 }) {
  return (
    <label 
      className="photo-upload-card"
      style={{
        flex: "1 1 200px",
        height: height,
        border: "1px dashed rgba(240, 192, 96, 0.4)",
        borderRadius: 16,
        background: "rgba(255, 255, 255, 0.03)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
      }}
    >
      <input 
        type="file" 
        accept="image/*" 
        style={{ display: "none" }} 
        onChange={onUpload} 
      />
      {photo ? (
        <img 
          src={photo} 
          alt={label} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      ) : (
        <div style={{ padding: "1.5rem", textAlign: "center", zIndex: 2 }}>
          <div style={{ fontSize: 32, marginBottom: 8, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>{icon}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'Segoe UI', sans-serif", fontWeight: 500 }}>{label}</div>
        </div>
      )}
    </label>
  );
}

function FinalScreen({ onRestart, studentName, totalSteps }) {
  const [groomPic, setGroomPic] = useState(() => localStorage.getItem("groom_pic") || null);
  const [couplePic, setCouplePic] = useState(() => localStorage.getItem("couple_pic") || null);
  const [bridePic, setBridePic] = useState(() => localStorage.getItem("bride_pic") || null);

  const handleFileChange = (e, setPic, storageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPic(reader.result);
        localStorage.setItem(storageKey, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const colors = ["#f0c060", "#ff6b9d", "#c792ea", "#82aaff", "#c3e88d", "#5dcaa5"];
    const container = document.getElementById("wedding-root");
    if (!container) return;
    
    const activeElements = [];

    for (let i = 0; i < 70; i++) {
      const el = document.createElement("div");
      const dx = (Math.random() - 0.5) * 400;
      const dy = -(Math.random() * 300 + 100);
      el.style.cssText = `
        position: absolute;
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: ${40 + Math.random() * 20}%;
        top: 40%;
        z-index: 10;
        pointer-events: none;
      `;
      container.appendChild(el);
      activeElements.push(el);

      el.animate(
        [
          { opacity: 1, transform: "translate(0,0) scale(1) rotate(0deg)" },
          { opacity: 0, transform: `translate(${dx}px,${dy}px) scale(0.5) rotate(${Math.random() * 1080}deg)` },
        ],
        { duration: 1500 + Math.random() * 800, easing: "cubic-bezier(0.1, 1, 0.1, 1)", delay: Math.random() * 200 }
      ).finished.then(() => {
        el.remove();
      });
    }

    return () => {
      activeElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 840, textAlign: "center", animation: "slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)", padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Dots current={totalSteps - 1} total={totalSteps} />
      <ProgressBar pct={100} />
      
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", border: "1px solid rgba(240,192,96,0.5)", color: "#f0c060", padding: "6px 24px", borderRadius: 50, fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1.5rem", background: "rgba(240,192,96,0.05)" }}>
        <span style={{ fontSize: 12 }}>💍</span> Wedding Celebration
      </div>

      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 400, color: "#fff", margin: "0.5rem 0 1rem 0", letterSpacing: "0.5px" }}>
        Mutangana <span style={{ color: "#f0c060", fontFamily: "sans-serif", fontStyle: "italic", fontWeight: 300 }}>&</span> Esther
      </h1>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 280, gap: 16, marginBottom: "2.5rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2))", flex: 1 }} />
        <span style={{ fontSize: 16, color: "#f0c060" }}>💍</span>
        <div style={{ height: "1px", background: "linear-gradient(to left, transparent, rgba(255,255,255,0.2))", flex: 1 }} />
      </div>

      <div style={{ display: "flex", gap: "1.5rem", width: "100%", flexWrap: "wrap", alignItems: "center", marginBottom: "3rem" }}>
        <PhotoCard 
          label="Add photo of Mutangana" 
          icon="🤵" 
          photo={groomPic} 
          onUpload={(e) => handleFileChange(e, setGroomPic, "groom_pic")} 
          height={240}
        />
        <PhotoCard 
          label="Add a couple photo here" 
          icon="🥂" 
          photo={couplePic} 
          onUpload={(e) => handleFileChange(e, setCouplePic, "couple_pic")} 
          height={300}
        />
        <PhotoCard 
          label="Add photo of Esther" 
          icon="👰‍♀️" 
          photo={bridePic} 
          onUpload={(e) => handleFileChange(e, setBridePic, "bride_pic")} 
          height={240}
        />
      </div>

      <div style={{
        background: "rgba(15, 23, 42, 0.4)", border: "1px solid rgba(240,192,96,0.25)",
        borderRadius: 20, padding: "2rem", marginBottom: "2rem", backdropFilter: "blur(12px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)", width: "100%", boxSizing: "border-box"
      }}>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.9, fontStyle: "italic", margin: 0 }}>
          Justin, you gave me more than code  you gave me{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>
            discipline, clarity, and a love for getting things right.
          </span>{" "}
          Today, as you write the most beautiful program of your life with{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>Esther</span> by your side,
          we pray that your marriage is like the best code you ever wrote:{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>
            clean, purposeful, and built to last.
          </span>
          <br /><br />
          May the Lord who blessed the first wedding in Cana{" "}
          <span style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>
            bless yours abundantly.
          </span>{" "}
          May your home be filled with His peace, laughter, and Sabbath rest  every week, together.
        </p>
        <p style={{ fontSize: ".85rem", color: "#9fe1cb", marginTop: "1.5rem", fontStyle: "italic", margin: "1.5rem 0 0 0" }}>
          ✝️ "Two are better than one… for if they fall, the one will lift up the other." — Eccl. 4:9–10
        </p>
      </div>

      <CodeBlock
        code={`// Devothe's wedding gift in code\nconst marriage = {\n  groom:  "Mutangana",\n  bride:  "Esther",\n  love:   Infinity,\n  faith:  "Adventist — strong",\n  bugs:   0\n};\n// May God compile this perfectly 🙏`}
      />
      
      <div style={{ fontSize: ".9rem", color: "rgba(255,255,255,0.4)", marginTop: "1rem", letterSpacing: "0.5px" }}>
        — with love from your student, {studentName} 🎓
      </div>

      <button 
        onClick={onRestart}
        style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.35)", 
          textDecoration: "underline", fontSize: "0.85rem", cursor: "pointer", 
          marginTop: "2.5rem", fontFamily: "inherit"
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#f0c060"}
        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
      >
        🔄 Restart Experience
      </button>
    </div>
  );
}

export default function WeddingWish() {
  const studentName = "Devothe"; 
  
  const [step, setStep] = useState(0);
  const currentSteps = steps(studentName);
  const s = currentSteps[step];
  const pct = Math.round((step / (currentSteps.length - 1)) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        body { margin: 0; padding: 0; background: #04080e; overflow-x: hidden; }
        @keyframes slideIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .photo-upload-card:hover {
          border-color: #f0c060 !important;
          transform: translateY(-5px);
          background: rgba(240, 192, 96, 0.04) !important;
          box-shadow: 0 12px 30px rgba(240, 192, 96, 0.15) !important;
        }
      `}</style>
      
      <div
        id="wedding-root"
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem max(1rem, 5vw)",
          position: "relative",
          overflowX: "hidden",
          background: "radial-gradient(ellipse at center, #0f1c2c 0%, #060e17 75%, #03060a 100%)",
          boxSizing: "border-box"
        }}
      >
        <ThreeBackground />

        {s.isFinal ? (
          <FinalScreen onRestart={() => setStep(0)} studentName={studentName} totalSteps={currentSteps.length} />
        ) : (
          <div key={step} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 540, textAlign: "center", animation: "slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <Dots current={step} total={currentSteps.length} />
            <ProgressBar pct={pct} />
            <span style={{ fontSize: 56, marginBottom: "1.5rem", display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>{s.icon}</span>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 600, color: "#fff", lineHeight: 1.4, marginBottom: "1rem", letterSpacing: "-0.3px" }}>
              {s.title}
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem" }}>
              {s.sub[0]}
              <em style={{ color: "#f0c060", fontStyle: "normal", fontWeight: 600 }}>{s.sub[1]}</em>
              {s.sub[2]}
            </p>
            {s.code && <CodeBlock code={s.code} />}
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => setStep((p) => p + 1)}
                style={{
                  padding: "14px 40px", background: "#f0c060", color: "#1a1100",
                  border: "none", borderRadius: 50, fontSize: "1rem", fontWeight: 600,
                  cursor: "pointer", letterSpacing: ".02em", boxShadow: "0 4px 15px rgba(240,192,96,0.2)",
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {s.btn}
              </button>

              {step > 0 && (
                <button
                  onClick={() => setStep((p) => p - 1)}
                  style={{
                    background: "none", border: "none", color: "rgba(255,255,255,0.4)",
                    cursor: "pointer", fontSize: "0.9rem", textDecoration: "none",
                    padding: "4px 12px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                >
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