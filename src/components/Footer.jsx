import React from "react";

function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#f1f1f1",
        fontSize: "16px", // Tamaño de fuente aumentado
        color: "#555",
        fontWeight: "bold", // Texto en negrita
      }}
    >
      © 2024 Jeison Cardona. Todos los derechos de autor son reservados.
    </footer>
  );
}

export default Footer;
