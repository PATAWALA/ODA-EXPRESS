import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // La page de login gère son propre style plein écran
  // (le middleware a déjà redirigé les utilisateurs non connectés ailleurs)

  return <>{children}</>;
}