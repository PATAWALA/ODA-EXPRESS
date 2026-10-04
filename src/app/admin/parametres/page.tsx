import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import SettingsTabs from "@/components/admin/settings/SettingsTabs";

export default async function ParametresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Liste des utilisateurs (admin seulement)
  const admin = createAdminClient();
  const { data: usersData } = await admin.auth.admin.listUsers();

  const users = (usersData?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? "",
    name: (u.user_metadata?.name as string | undefined) ?? "",
    createdAt: u.created_at,
    lastSignIn: u.last_sign_in_at ?? null,
    isCurrent: u.id === user?.id,
  }));

  const currentUserName =
    (user?.user_metadata?.name as string | undefined) ?? "";

  return (
    <div>
      {/* En-tête */}
      <div className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Configuration
        </p>
        <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[32px]">
          Paramètres
        </h1>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-zinc-500">
          Gérez votre profil personnel et les accès au back-office.
        </p>
      </div>

      <SettingsTabs
        currentEmail={user?.email ?? ""}
        currentName={currentUserName}
        users={users}
      />
    </div>
  );
}