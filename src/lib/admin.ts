/**
 * Nom de l'administrateur affiché dans le back-office.
 * Modifiable ici si besoin (ou à brancher sur Supabase metadata plus tard).
 */
export const ADMIN_NAME = "Da Olivier";

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 18) return "Bonjour";
  return "Bonsoir";
}