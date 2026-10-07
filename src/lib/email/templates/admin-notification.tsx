import * as React from "react";
import { EmailLayout } from "../layout";
import { SITE_URL } from "../resend";

interface Props {
  name: string | null;
  email: string;
  phone: string | null;
  source: string;
  message: string | null;
  /** URLs publiques des images du projet (optionnel) */
  images?: string[];
}

export function AdminNotificationEmail({
  name,
  email,
  phone,
  source,
  message,
  images = [],
}: Props) {
  return (
    <EmailLayout
      preview={`Nouvelle demande de ${name ?? email}`}
      footerNote="Notification interne — ODA Sources. Ne pas répondre à cet email : utilisez le bouton ci-dessus pour accéder au back-office."
    >
      <p
        style={{
          margin: "0 0 20px",
          display: "inline-block",
          backgroundColor: "#BF0808",
          color: "#FFFFFF",
          padding: "4px 10px",
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          borderRadius: "16px",
        }}
      >
        Nouvelle demande
      </p>

      <h1
        style={{
          margin: "0 0 24px",
          fontSize: "22px",
          fontWeight: 700,
          color: "#01215B",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        {name ?? "Nouveau contact"}
      </h1>

      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ margin: "0 0 24px", borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #E4E4E7",
                color: "#71717A",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                width: "120px",
              }}
            >
              Email
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #E4E4E7",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              <a
                href={`mailto:${email}`}
                style={{ color: "#01215B", textDecoration: "none" }}
              >
                {email}
              </a>
            </td>
          </tr>

          {phone && (
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #E4E4E7",
                  color: "#71717A",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Téléphone
              </td>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #E4E4E7",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                <a
                  href={`tel:${phone}`}
                  style={{ color: "#01215B", textDecoration: "none" }}
                >
                  {phone}
                </a>
              </td>
            </tr>
          )}

          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #E4E4E7",
                color: "#71717A",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Source
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #E4E4E7",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {source}
            </td>
          </tr>
        </tbody>
      </table>

      {message && (
        <>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#01215B",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Message
          </p>
          <div
            style={{
              backgroundColor: "#F8FAFC",
              padding: "16px",
              borderLeft: "3px solid #BF0808",
              borderRadius: "16px",
              margin: "0 0 28px",
              whiteSpace: "pre-wrap",
              fontSize: "14px",
              lineHeight: 1.65,
              color: "#27272A",
            }}
          >
            {message}
          </div>
        </>
      )}

      {images.length > 0 && (
        <>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#01215B",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Photos du projet ({images.length})
          </p>
          <table
            role="presentation"
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            style={{ margin: "0 0 28px" }}
          >
            <tbody>
              {images.map((url, index) => (
                <tr key={url}>
                  <td style={{ padding: "0 0 16px 0" }}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "block", textDecoration: "none" }}
                    >
                      <img
                        src={url}
                        alt={`Photo projet ${index + 1}`}
                        width="496"
                        style={{
                          display: "block",
                          width: "100%",
                          maxWidth: "496px",
                          height: "auto",
                          borderRadius: "16px",
                          border: "1px solid #E4E4E7",
                        }}
                      />
                    </a>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: "12px",
                        color: "#71717A",
                      }}
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#01215B", textDecoration: "none" }}
                      >
                        Ouvrir l&apos;image en grand ↗
                      </a>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <a
        href={`${SITE_URL}/admin/login`}
        style={{
          display: "inline-block",
          backgroundColor: "#01215B",
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
        Se connecter au back-office
      </a>
    </EmailLayout>
  );
}