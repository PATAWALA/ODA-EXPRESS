import * as React from "react";
import { EmailLayout } from "../layout";
import { SITE_URL } from "../resend";

interface Props {
  firstName?: string;
}

export function NewsletterWelcomeEmail({ firstName }: Props) {
  return (
    <EmailLayout
      preview="Bienvenue dans la veille import ODA Sources."
      footerNote="Vous recevez cet email parce que vous vous êtes inscrit à la newsletter ODA Sources. Pour vous désinscrire, répondez simplement à cet email."
    >
      <p
        style={{
          margin: "0 0 20px",
          display: "inline-block",
          border: "1px solid #E4E4E7",
          borderRadius: "16px",
          padding: "4px 10px",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#71717A",
        }}
      >
        Bienvenue à bord
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
        {firstName ? `Bonjour ${firstName},` : "Bonjour,"}
        <br />
        bienvenue dans notre veille import.
      </h1>

      <p style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: 1.65 }}>
        Vous recevrez désormais <strong>une fois par mois</strong> notre veille
        import : opportunités produits, prix du fret Chine — Afrique et conseils
        pratiques pour importer sans vous faire piéger.
      </p>

      <p style={{ margin: "0 0 24px", fontSize: "15px", lineHeight: 1.65 }}>
        Rien de plus : pas de spam, pas de pub, juste du concret. Et si un jour
        vous voulez arrêter, un simple clic suffit.
      </p>

      <hr
        style={{
          border: 0,
          borderTop: "1px solid #E4E4E7",
          margin: "24px 0",
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
        Ce que vous allez recevoir
      </p>

      <ul
        style={{
          paddingLeft: "20px",
          margin: "0 0 28px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#3F3F46",
        }}
      >
        <li style={{ marginBottom: "8px" }}>
          <strong>Opportunités produits</strong> — les nouvelles usines et
          produits que nous sourçons.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Prix & délais de fret</strong> — l&apos;évolution des tarifs
          maritimes et aériens.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Guides pratiques</strong> — les pièges à éviter et les bonnes
          pratiques d&apos;import.
        </li>
      </ul>

      <p
        style={{
          margin: "0 0 24px",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#3F3F46",
        }}
      >
        Un projet d&apos;import en cours ? Vous pouvez nous écrire directement
        sur WhatsApp, nous répondons sous 24 heures ouvrées.
      </p>

      <p style={{ margin: "0 0 8px" }}>
        <a
          href="https://wa.me/8619515660197?text=Bonjour%20ODA%20SOURCES%2C%20je%20viens%20de%20m%27inscrire%20%C3%A0%20votre%20newsletter."
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
          Discuter sur WhatsApp
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
          margin: "0 0 8px",
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
        Transmettez-lui notre contact. Plus on est nombreux, plus notre réseau
        s&apos;agrandit.
      </p>

      <p style={{ margin: 0, fontSize: "13px", color: "#52525B" }}>
        <a
          href={SITE_URL}
          style={{ color: "#BF0808", textDecoration: "none", fontWeight: 600 }}
        >
          odasources.com
        </a>
      </p>
    </EmailLayout>
  );
}