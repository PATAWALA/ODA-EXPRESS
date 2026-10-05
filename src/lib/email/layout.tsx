import * as React from "react";
import { SITE_URL } from "./resend";

interface LayoutProps {
  preview: string;
  /** Texte affiché tout en bas. Si absent, aucun texte n'apparaît. */
  footerNote?: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, footerNote, children }: LayoutProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{preview}</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#F8FAFC",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <span style={{ display: "none", fontSize: "1px", color: "#F8FAFC" }}>
          {preview}
        </span>

        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#F8FAFC", padding: "40px 16px" }}
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  maxWidth: "560px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E4E4E7",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                {/* En-tête */}
                <tr>
                  <td
                    style={{
                      padding: "28px 32px",
                      borderBottom: "1px solid #E4E4E7",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#01215B",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ODA SOURCES
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#71717A",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        marginTop: "4px",
                      }}
                    >
                      Import &amp; Export
                    </div>
                  </td>
                </tr>

                {/* Contenu */}
                <tr>
                  <td style={{ padding: "40px 32px", color: "#27272A" }}>
                    {children}
                  </td>
                </tr>

                {/* Pied */}
                <tr>
                  <td
                    style={{
                      padding: "28px 32px",
                      borderTop: "1px solid #E4E4E7",
                      backgroundColor: "#FAFAFA",
                      color: "#71717A",
                      fontSize: "12px",
                      lineHeight: "1.6",
                    }}
                  >
                    <p style={{ margin: "0 0 12px" }}>
                      <strong style={{ color: "#01215B" }}>ODA SOURCES</strong>
                      <br />
                      Chine 🇨🇳
                    </p>
                    <p style={{ margin: "0 0 12px" }}>
                      Sourcing · Contrôle qualité · Fret maritime Chine — Afrique
                    </p>
                    <p style={{ margin: footerNote ? "0 0 12px" : "0" }}>
                      <a
                        href="https://wa.me/8619515660197"
                        style={{ color: "#01215B", textDecoration: "none" }}
                      >
                        WhatsApp
                      </a>
                      {" · "}
                      <a
                        href="mailto:contact@odasources.com"
                        style={{ color: "#01215B", textDecoration: "none" }}
                      >
                        contact@odasources.com
                      </a>
                      {" · "}
                      <a
                        href={SITE_URL}
                        style={{ color: "#01215B", textDecoration: "none" }}
                      >
                        odasources.com
                      </a>
                    </p>

                    {footerNote && (
                      <p
                        style={{
                          margin: "16px 0 0",
                          fontSize: "11px",
                          color: "#A1A1AA",
                        }}
                      >
                        {footerNote}
                      </p>
                    )}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}