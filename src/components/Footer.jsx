import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#3E4A7A",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>&copy; 2025 EventBooker. All Rights Reserved.</p>
        <div style={{ marginTop: "10px" }}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "0 10px",
              fontSize: "14px",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "0 10px",
              fontSize: "14px",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "0 10px",
              fontSize: "14px",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
