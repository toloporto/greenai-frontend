import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      <h1 style={{ color: "#22c55e", fontSize: "3rem" }}>GreenAI Control</h1>
      <p style={{ fontSize: "1.2rem" }}>Gesti?n de invernaderos de suelo con mantas t?rmicas.</p>
      <p style={{ color: "#16a34a", fontWeight: "bold" }}>Frontend desplegado con ?xito!</p>
      <button
        onClick={() => alert("?Bot?n funcionando!")}
        style={{
          background: "#22c55e",
          color: "white",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "1rem",
          fontSize: "1rem"
        }}
      >
        Probar Bot?n
      </button>
    </div>
  </React.StrictMode>
);
