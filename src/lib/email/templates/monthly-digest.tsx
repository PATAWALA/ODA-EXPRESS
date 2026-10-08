import * as React from "react";
import { EmailLayout } from "../layout";
import { SITE_URL } from "../resend";

interface Props {
  month: string;
  productHighlight: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  freightUpdate: string;
  tip: string;
}

export function MonthlyDigestEmail({
  month,
  productHighlight,
  freightUpdate,
  tip,
}: Props) {
  return (
    <EmailLayout
      preview={`Veille import ${month} — Nouveautés & conseils`}
      footerNote="Vous recevez cet email car vous êtes inscrit à la newsletter ODA Sources. Pour vous désinscrire, répondez simplement à cet email."
    >
      <p
        style={{
          margin: "0 0 20px",
          display: "inline-block",
          backgroundColor: "#01215B",
          color: "#FFFFFF",
          padding: "4px 10px",
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          borderRadius: "16px",
        }}
      >
        Veille import · {month}
      </p>

      <h1
        style={{
          margin: "0 0 24px",
          fontSize: "24px",
          fontWeight: 700,
          color: "#01215B",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        Vos opportunités d&apos;import ce mois-ci.
      </h1>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#BF0808",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        🆕 Nouveauté
      </p>
      <h2
        style={{
          margin: "0 0 8px",
          fontSize: "18px",
          fontWeight: 700,
          color: "#01215B",
        }}
      >
        {productHighlight.title}
      </h2>
      {productHighlight.imageUrl && (
        <img
          src={productHighlight.imageUrl}
          alt={productHighlight.title}
          width="496"
          style={{
            width: "100%",
            height: "auto",
            margin: "0 0 12px",
            display: "block",
            borderRadius: "16px",
            border: "1px solid #E4E4E7",
          }}
        />
      )}
      <p style={{ margin: "0 0 28px", fontSize: "14px", lineHeight: 1.65 }}>
        {productHighlight.description}
      </p>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#BF0808",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        📊 Info fret
      </p>
      <p style={{ margin: "0 0 28px", fontSize: "14px", lineHeight: 1.65 }}>
        {freightUpdate}
      </p>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#BF0808",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        💡 Conseil pratique
      </p>
      <div
        style={{
          backgroundColor: "#F8FAFC",
          padding: "16px",
          borderLeft: "3px solid #01215B",
          borderRadius: "16px",
          margin: "0 0 28px",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#27272A",
        }}
      >
        {tip}
      </div>

      <p style={{ margin: "0 0 8px" }}>
        <a
          href={`${SITE_URL}/contact`}
          style={{
            display: "inline-block",
            backgroundColor: "#BF0808",
            color: "#FFFFFF",
            padding: "14px 28px",
            textDecoration: "none",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "12px",
            letterSpacing: "0.1em",
            borderRadius: "16px",
          }}
        >
          Démarrer mon projet
        </a>
      </p>

      <hr
        style={{
          border: 0,
          borderTop: "1px solid #E4E4E7",
          margin: "32px 0 24px",
        }}
      />

      <p
        style={{
          margin: "0 0 12px",
          fontSize: "14px",
          fontWeight: 700,
          color: "#01215B",
        }}
      >
        Vous connaissez quelqu&apos;un qui importe de Chine ?
      </p>
      <p
        style={{
          margin: "0 0 16px",
          fontSize: "13px",
          color: "#52525B",
          lineHeight: 1.65,
        }}
      >
        Transmettez-lui cet email. Notre mission est de rendre l&apos;import
        depuis la Chine plus simple, plus sûr et plus transparent pour tous les
        commerçants et industriels africains.
      </p>

      <p
        style={{
          margin: "24px 0 0",
          fontSize: "12px",
          color: "#A1A1AA",
          textAlign: "center",
        }}
      >
        ODA SOURCES · Sourcing, contrôle qualité et logistique Chine — Afrique
      </p>
    </EmailLayout>
  );
}