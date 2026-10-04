import * as React from "react";
import { EmailLayout } from "../layout";
import { SITE_URL } from "../resend";

interface Props {
  firstName: string;
  sourceLabel: string;
}

export function WelcomeEmail({ firstName, sourceLabel }: Props) {
  return (
    <EmailLayout
      preview="Nous avons bien reçu votre demande."
      footerNote="Vous recevez cet email parce que vous avez soumis une demande sur odasources.com. Aucune action de votre part n'est requise."
    >
      <p
        style={{
          margin: "0 0 20px",
          display: "inline-block",
          border: "1px solid #E4E4E7",
          borderRadius: "8px",
          padding: "4px 10px",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#71717A",
        }}
      >
        Demande reçue
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
        Bonjour {firstName},
        <br />
        nous avons bien reçu votre demande.
      </h1>

      <p style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: 1.65 }}>
        Merci pour votre confiance. Votre demande via{" "}
        <strong>{sourceLabel}</strong> a été enregistrée et transmise à notre
        équipe à Guangzhou.
      </p>

      <p style={{ margin: "0 0 24px", fontSize: "15px", lineHeight: 1.65 }}>
        Nous revenons vers vous sous{" "}
        <strong style={{ color: "#01215B" }}>24 heures ouvrées</strong> avec une
        réponse claire et un devis précis.
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
        Ce que nous faisons pour vous
      </p>

      <ul
        style={{
          paddingLeft: "20px",
          margin: "0 0 24px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#3F3F46",
        }}
      >
        <li style={{ marginBottom: "8px" }}>
          <strong>Sourcing &amp; Achat</strong> — recherche de fournisseurs
          certifiés, négociation et achat direct.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Vérification &amp; Contrôle Qualité</strong> — visite d&apos;usine
          et rapport photo/vidéo sous 24 heures.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Shipping &amp; Logistique</strong> — fret maritime, dédouanement
          et livraison finale à votre entrepôt.
        </li>
      </ul>

      <p style={{ margin: "0 0 8px" }}>
        <a
          href="https://wa.me/8619515660197?text=Bonjour%20Mr%20ODA%2C%20je%20viens%20de%20recevoir%20votre%20email."
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
            borderRadius: "8px",
          }}
        >
          Discuter sur WhatsApp
        </a>
      </p>

      <p
        style={{
          margin: "24px 0 0",
          fontSize: "13px",
          color: "#71717A",
          lineHeight: 1.6,
        }}
      >
        Un projet urgent ? Écrivez-nous directement sur WhatsApp — nous
        répondons en général dans les 2 heures pendant nos horaires
        d&apos;ouverture (9h — 19h, heure de Chine).
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
        Vous connaissez quelqu&apos;un que nous pourrions aider ?
      </p>

      <p
        style={{
          margin: "0 0 16px",
          fontSize: "13px",
          color: "#52525B",
          lineHeight: 1.65,
        }}
      >
        Transmettez notre contact à vos amis commerçants, distributeurs ou
        industriels. Nous accompagnons les importateurs africains de la
        recherche du fournisseur jusqu&apos;à la livraison finale.
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