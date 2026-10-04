"use client";

import { useState } from "react";
import { User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileForm from "./ProfileForm";
import UsersManager from "./UsersManager";

interface UserItem {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastSignIn: string | null;
  isCurrent: boolean;
}

interface Props {
  currentEmail: string;
  currentName: string;
  users: UserItem[];
}

export default function SettingsTabs({
  currentEmail,
  currentName,
  users,
}: Props) {
  const [tab, setTab] = useState<"profile" | "users">("profile");

  return (
    <div>
      {/* Onglets */}
      <div className="mb-8 flex border-b border-zinc-200">
        <button
          type="button"
          onClick={() => setTab("profile")}
          className={cn(
            "relative flex items-center gap-2 px-5 py-3 text-[13px] font-semibold transition",
            tab === "profile"
              ? "text-navy-900"
              : "text-zinc-500 hover:text-navy-900",
          )}
        >
          <User className="h-4 w-4" strokeWidth={1.75} />
          Mon profil
          {tab === "profile" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-express-600" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setTab("users")}
          className={cn(
            "relative flex items-center gap-2 px-5 py-3 text-[13px] font-semibold transition",
            tab === "users"
              ? "text-navy-900"
              : "text-zinc-500 hover:text-navy-900",
          )}
        >
          <Users className="h-4 w-4" strokeWidth={1.75} />
          Utilisateurs
          <span className="ml-1 border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-zinc-500">
            {users.length}
          </span>
          {tab === "users" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-express-600" />
          )}
        </button>
      </div>

      {/* Contenu */}
      {tab === "profile" && (
        <ProfileForm
          currentEmail={currentEmail}
          currentName={currentName}
        />
      )}

      {tab === "users" && <UsersManager users={users} />}
    </div>
  );
}