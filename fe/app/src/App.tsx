import React from "react";

const App: React.FC = () => {
  return (
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              backgroundColor: "#f8f8f8",
              borderBottom: "1px solid #ddd",
            }}
        >
          <h1 style={{ margin: 0 }}>
            <span style={{ color: "red" }}>Leban</span>
            <span style={{ color: "green" }}>on</span>
          </h1>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            &#9776; {/* Burger menu icon */}
          </button>
        </nav>
        <div style={{ textAlign: "center", margin: "50px 20px" }}>
          <h2 style={{ fontSize: "2em", margin: "0" }}>
            Visiting Lebanon couldn't be any easier
          </h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "30px 20px" }}>
          <div
              style={{
                padding: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
              }}
          >
            Touristic Sites
          </div>
          <div
              style={{
                padding: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
              }}
          >
            Restaurants
          </div>
          <div
              style={{
                padding: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
              }}
          >
            Events
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "50px 20px" }}>
          <div
              style={{
                display: "inline-block",
                padding: "40px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
          >
            EDUCATION
          </div>
        </div>
      </div>
  );
};

export default App;
