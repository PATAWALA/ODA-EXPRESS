import * as React from "react";
import { EmailLayout } from "../layout";
import { SITE_URL } from "../resend";

interface Props {
  firstName?: string;
}

export function RecommendationEmail({ firstName }: Props) {
  return (
    <EmailLayout
      preview="Vous connaissez quelqu'un qui importe de Chine ?"
      footerNote="Vous recevez cet email parce que vous êtes inscrit à la newsletter ODA Sources. Pour vous désinscrire, répondez simplement à cet email."
    >
      <p
        style={{
          margin: "0 0 20px",
          display: "inline-block",
          border: "1px solid #E4E4E7",
          padding: "4px 10px",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#71717A",
          borderRadius: "16px",
        }}
      >
        Un service à partager
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
        vous connaissez quelqu&apos;un qui importe de Chine ?
      </h1>

      <p style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: 1.65 }}>
        Un proche commerçant, un distributeur, un industriel ou un
        investisseur qui cherche à{" "}
        <strong style={{ color: "#01215B" }}>
          augmenter ses marges en important directement depuis la Chine
        </strong>
        ?
      </p>

      <p style={{ margin: "0 0 24px", fontSize: "15px", lineHeight: 1.65 }}>
        Transmettez-lui notre contact. Nous accompagnons de A à Z les
        importateurs africains : sourcing, vérification, contrôle qualité,
        shipping et livraison finale.
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
        Ce que nous faisons pour vos proches
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
          <strong>Sourcing &amp; Achat</strong> — recherche de fournisseurs
          certifiés en Chine, négociation et achat direct à l&apos;usine.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Vérification &amp; Contrôle Qualité</strong> — visite
          d&apos;usine et rapport photo/vidéo sous 24 heures.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Shipping &amp; Logistique</strong> — fret maritime, aérien
          ou vrac, dédouanement et livraison finale.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Un seul interlocuteur</strong> — du sourcing à la livraison.
        </li>
      </ul>

      <p style={{ margin: "0 0 12px" }}>
        <a
          href="https://wa.me/8619515660197?text=Bonjour%20ODA%20SOURCES%2C%20je%20souhaite%20discuter%20d%27un%20projet%20d%27import."
          style={{
            display: "inline-block",
            backgroundColor: "#059669",
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
          Nous contacter sur WhatsApp
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
          fontSize: "13px",
          color: "#71717A",
          lineHeight: 1.65,
        }}
      >
        Vous voulez d&apos;abord découvrir qui nous sommes et comment nous
        travaillons ?
      </p>

      <p style={{ margin: "0 0 24px" }}>
        <a
          href={SITE_URL}
          style={{
            display: "inline-block",
            border: "1px solid #E4E4E7",
            color: "#01215B",
            padding: "10px 18px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.05em",
            borderRadius: "16px",
            backgroundColor: "#FFFFFF",
          }}
        >
          Découvrir notre société →
        </a>
      </p>

      <p
        style={{
          margin: "24px 0 0",
          fontSize: "12px",
          color: "#A1A1AA",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        ODA SOURCES · Sourcing, contrôle qualité et logistique Chine — Afrique
      </p>
    </EmailLayout>
  );
}