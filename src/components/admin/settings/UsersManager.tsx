"use client";

import { useState } from "react";
import {
  Plus,
  UserPlus,
  AlertCircle,
  Check,
  X,
  Shield,
} from "lucide-react";
import PasswordInput from "@/components/admin/PasswordInput";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  createUserAction,
  deleteUserAction,
} from "@/app/admin/actions";

interface UserItem {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastSignIn: string | null;
  isCurrent: boolean;
}

export default function UsersManager({ users }: { users: UserItem[] }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[14px] font-bold tracking-tight text-navy-900">
            Utilisateurs du back-office
          </p>
          <p className="mt-1 text-[12px] text-zinc-500">
            {users.length} personne{users.length > 1 ? "s" : ""} peut accéder à
            cet espace.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
        >
          {showForm ? (
            <>
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              Annuler
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              Ajouter un utilisateur
            </>
          )}
        </button>
      </div>

      {/* Formulaire création */}
      {showForm && <CreateUserForm onDone={() => setShowForm(false)} />}

      {/* Liste */}
      <div className="border border-zinc-200 bg-white">
        <ul className="divide-y divide-zinc-100">
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Création en 2 étapes ---------- */

function CreateUserForm({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setState({
        loading: false,
        error: "Merci de saisir un email valide.",
        success: null,
      });
      return;
    }
    if (form.password.length < 8) {
      setState({
        loading: false,
        error: "Le mot de passe doit contenir au moins 8 caractères.",
        success: null,
      });
      return;
    }

    setState({ loading: false, error: null, success: null });
    setStep(2);
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setState({
        loading: false,
        error: "Les deux mots de passe ne correspondent pas.",
        success: null,
      });
      return;
    }

    setState({ loading: true, error: null, success: null });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);

    const result = await createUserAction(formData);

    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
      setStep(1);
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Utilisateur créé.",
      });
      setTimeout(() => {
        reset();
        onDone();
      }, 2000);
    }
  }

  function cancel() {
    setForm({ name: "", email: "", password: "", confirm: "" });
    setState({ loading: false, error: null, success: null });
    setStep(1);
  }

  function reset() {
    setForm({ name: "", email: "", password: "", confirm: "" });
    setState({ loading: false, error: null, success: null });
    setStep(1);
  }

  return (
    <div className="border border-zinc-200 bg-white">
      {/* En-tête */}
      <div className="border-b border-zinc-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-navy-900 text-white">
            <UserPlus className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[14px] font-bold tracking-tight text-navy-900">
              Nouvel utilisateur
            </p>
            <p className="mt-0.5 text-[12px] text-zinc-500">
              En 2 étapes : informations puis confirmation du mot de passe.
            </p>
          </div>
        </div>
      </div>

      {/* Étapes */}
      <div className="border-b border-zinc-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <StepBadge
            active={step === 1}
            done={step === 2}
            number={1}
            label="Informations"
          />
          <span className="h-px flex-1 bg-zinc-200" />
          <StepBadge
            active={step === 2}
            done={false}
            number={2}
            label="Confirmation"
          />
        </div>
      </div>

      {/* Étape 1 */}
      {step === 1 && (
        <form onSubmit={goToStep2} className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                Nom complet
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ex. Jean Mbala"
                className="w-full border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                Email <span className="text-express-600">*</span>
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                placeholder="utilisateur@exemple.com"
                className="w-full border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
              />
            </label>
          </div>

          <PasswordInput
            name="password"
            label="Mot de passe provisoire *"
            required
            minLength={8}
            placeholder="Minimum 8 caractères"
            hint="Notez ce mot de passe et transmettez-le à la personne concernée."
          />

          {/* Erreur */}
          {state.error && (
            <div className="flex items-start gap-2.5 border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                strokeWidth={2}
              />
              <p className="text-[12.5px] text-red-800">{state.error}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
            >
              Continuer
              <span className="text-[14px] leading-none">→</span>
            </button>
          </div>
        </form>
      )}

      {/* Étape 2 */}
      {step === 2 && (
        <form onSubmit={handleConfirm} className="space-y-4 p-6">
          {/* Récap étape 1 */}
          <div className="border border-zinc-200 bg-zinc-50/60 p-4">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Récapitulatif
            </p>
            <dl className="mt-3 space-y-2 text-[12.5px]">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-500">Nom</dt>
                <dd className="text-right font-semibold text-navy-900">
                  {form.name || "—"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-500">Email</dt>
                <dd className="break-all text-right font-semibold text-navy-900">
                  {form.email}
                </dd>
              </div>
            </dl>
          </div>

          <PasswordInput
            name="confirm"
            label="Confirmer le mot de passe *"
            required
            minLength={8}
            placeholder="Retapez le mot de passe"
            hint="Le mot de passe doit être identique à celui saisi à l'étape 1."
          />

          {/* Erreur */}
          {state.error && (
            <div className="flex items-start gap-2.5 border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                strokeWidth={2}
              />
              <p className="text-[12.5px] text-red-800">{state.error}</p>
            </div>
          )}

          {/* Succès */}
          {state.success && (
            <div className="flex items-start gap-2.5 border border-emerald-200 bg-emerald-50 px-4 py-3">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                strokeWidth={2.5}
              />
              <p className="text-[12.5px] text-emerald-800">{state.success}</p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={cancel}
              disabled={state.loading}
              className="inline-flex items-center justify-center border border-zinc-200 bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50 disabled:opacity-60"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={state.loading}
              className="inline-flex items-center gap-2 bg-express-600 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60"
            >
              <UserPlus className="h-3.5 w-3.5" strokeWidth={2} />
              {state.loading ? "Création..." : "Créer l'utilisateur"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ---------- Indicateur d'étape ---------- */

function StepBadge({
  active,
  done,
  number,
  label,
}: {
  active: boolean;
  done: boolean;
  number: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={
          "flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-bold transition " +
          (done
            ? "bg-emerald-600 text-white"
            : active
              ? "bg-navy-900 text-white"
              : "border border-zinc-200 bg-white text-zinc-400")
        }
      >
        {done ? <Check className="h-3 w-3" strokeWidth={3} /> : number}
      </span>
      <span
        className={
          "text-[11.5px] font-semibold " +
          (active || done ? "text-navy-900" : "text-zinc-400")
        }
      >
        {label}
      </span>
    </div>
  );
}

/* ---------- Ligne utilisateur ---------- */

function UserRow({ user }: { user: UserItem }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const initial = (user.name || user.email).charAt(0).toUpperCase();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteUserAction(user.id);
    } finally {
      setLoading(false);
      setOpenConfirm(false);
    }
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return "Jamais connecté";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <li className="flex items-center gap-4 px-6 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-zinc-100 text-[13px] font-bold text-navy-900">
          {initial}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-[14px] font-bold tracking-tight text-navy-900">
              {user.name || user.email}
            </p>
            {user.isCurrent && (
              <span className="border border-express-600 bg-express-600/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-express-600">
                Vous
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-[12px] text-zinc-500">
            {user.email}
          </p>
        </div>

        <div className="hidden shrink-0 text-right md:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
            Dernière connexion
          </p>
          <p className="mt-0.5 text-[12px] text-zinc-700">
            {formatDate(user.lastSignIn)}
          </p>
        </div>

        <div className="shrink-0">
          {user.isCurrent ? (
            <span
              className="flex h-8 w-8 items-center justify-center text-zinc-300"
              title="Vous ne pouvez pas supprimer votre propre compte"
            >
              <Shield className="h-4 w-4" strokeWidth={1.75} />
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setOpenConfirm(true)}
              title="Supprimer cet utilisateur"
              className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </li>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => !loading && setOpenConfirm(false)}
        onConfirm={handleDelete}
        title="Supprimer cet utilisateur ?"
        message={`${user.name || user.email} ne pourra plus se connecter au back-office.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        loading={loading}
      />
    </>
  );
}