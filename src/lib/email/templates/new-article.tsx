import * as React from "react";
import { EmailLayout } from "../layout";
import { SITE_URL } from "../resend";

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string | null;
}

export function NewArticleEmail({
  title,
  excerpt,
  slug,
  imageUrl,
}: Props) {
  return (
    <EmailLayout
      preview={title}
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
        }}
      >
        Nouveauté ODA Sources
      </p>

      <h1
        style={{
          margin: "0 0 24px",
          fontSize: "22px",
          fontWeight: 700,
          color: "#01215B",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          width="496"
          style={{
            width: "100%",
            height: "auto",
            margin: "0 0 24px",
            display: "block",
            border: "1px solid #E4E4E7",
          }}
        />
      )}

      <p style={{ margin: "0 0 28px", fontSize: "15px", lineHeight: 1.65 }}>
        {excerpt}
      </p>

      <p style={{ margin: "0 0 32px" }}>
        <a
          href={`${SITE_URL}/actualites/${slug}`}
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
          }}
        >
          Lire l&apos;article
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
        Vous connaissez quelqu&apos;un que ça pourrait intéresser ?
      </p>

      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#52525B",
          lineHeight: 1.65,
        }}
      >
        Transférez-lui cet email. Notre mission est de rendre l&apos;import
        depuis la Chine plus simple, plus sûr et plus transparent pour tous les
        commerçants, distributeurs et industriels africains.
      </p>
    </EmailLayout>
  );
}