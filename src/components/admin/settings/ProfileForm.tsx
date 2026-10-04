"use client";

import { useState } from "react";
import { Check, Save, AlertCircle } from "lucide-react";
import PasswordInput from "@/components/admin/PasswordInput";
import {
  updateProfileNameAction,
  updateProfileEmailAction,
  updateProfilePasswordAction,
} from "@/app/admin/actions";

interface Props {
  currentEmail: string;
  currentName: string;
}

export default function ProfileForm({ currentEmail, currentName }: Props) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <NameSection currentName={currentName} />
      <EmailSection currentEmail={currentEmail} />
      <PasswordSection />
    </div>
  );
}

/* ---------- Nom ---------- */

function NameSection({ currentName }: { currentName: string }) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  async function handleSubmit(formData: FormData) {
    setState({ loading: true, error: null, success: null });
    const result = await updateProfileNameAction(formData);
    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Enregistré.",
      });
    }
  }

  return (
    <Section
      title="Nom affiché"
      description="Le nom qui apparaît dans le tableau de bord (ex. « Bonjour, Da Olivier »)."
    >
      <form action={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            Nom complet
          </span>
          <input
            type="text"
            name="name"
            required
            defaultValue={currentName}
            placeholder="Ex. Da Olivier"
            className="w-full border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
          />
        </label>

        <Feedback state={state} />

        <div className="flex justify-end">
          <SaveButton loading={state.loading} />
        </div>
      </form>
    </Section>
  );
}

/* ---------- Email ---------- */

function EmailSection({ currentEmail }: { currentEmail: string }) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  async function handleSubmit(formData: FormData) {
    setState({ loading: true, error: null, success: null });
    const result = await updateProfileEmailAction(formData);
    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Email mis à jour.",
      });
    }
  }

  return (
    <Section
      title="Adresse email"
      description="Utilisée pour vous connecter. Un email de confirmation sera envoyé."
    >
      <form action={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            Email actuel
          </span>
          <input
            type="email"
            name="email"
            required
            defaultValue={currentEmail}
            className="w-full border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700"
          />
        </label>

        <Feedback state={state} />

        <div className="flex justify-end">
          <SaveButton loading={state.loading} />
        </div>
      </form>
    </Section>
  );
}

/* ---------- Mot de passe (2 étapes) ---------- */

function PasswordSection() {
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
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

    if (password !== confirm) {
      setState({
        loading: false,
        error: "Les deux mots de passe ne correspondent pas.",
        success: null,
      });
      return;
    }

    setState({ loading: true, error: null, success: null });

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirm", confirm);

    const result = await updateProfilePasswordAction(formData);

    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
      setStep(1);
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Mot de passe mis à jour.",
      });
      setPassword("");
      setConfirm("");
      setStep(1);
    }
  }

  function cancel() {
    setPassword("");
    setConfirm("");
    setState({ loading: false, error: null, success: null });
    setStep(1);
  }

  return (
    <Section
      title="Mot de passe"
      description="Minimum 8 caractères. En 2 étapes : saisie puis confirmation."
    >
      {/* Indicateur d'étapes */}
      <div className="mb-5 flex items-center gap-3">
        <StepIndicator active={step === 1} done={step === 2} number={1} label="Nouveau" />
        <span className="h-px flex-1 bg-zinc-200" />
        <StepIndicator active={step === 2} done={false} number={2} label="Confirmation" />
      </div>

      {step === 1 ? (
        <form onSubmit={goToStep2} className="space-y-4">
          <PasswordInput
            name="password"
            label="Nouveau mot de passe"
            required
            minLength={8}
            hint="8 caractères minimum"
          />

          {state.error && <Feedback state={state} />}

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
      ) : (
        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="border border-zinc-200 bg-zinc-50/60 px-4 py-3 text-[12px] text-zinc-600">
            Vous confirmez le mot de passe saisi à l&apos;étape 1.
          </div>

          <PasswordInput
            name="confirm"
            label="Confirmer le mot de passe"
            required
            minLength={8}
            hint="Retapez le même mot de passe"
          />

          {state.error && <Feedback state={state} />}
          {state.success && <Feedback state={state} />}

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
              <Save className="h-3.5 w-3.5" strokeWidth={2} />
              {state.loading ? "Enregistrement..." : "Confirmer et enregistrer"}
            </button>
          </div>
        </form>
      )}

      {/* Message succès après étape 2 */}
      {step === 1 && state.success && (
        <div className="mt-4">
          <Feedback state={state} />
        </div>
      )}
    </Section>
  );
}

/* ---------- Indicateur d'étape ---------- */

function StepIndicator({
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

/* ---------- UI helpers ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-5">
        <p className="text-[14px] font-bold tracking-tight text-navy-900">
          {title}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">
          {description}
        </p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function SaveButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800 disabled:opacity-60"
    >
      <Save className="h-3.5 w-3.5" strokeWidth={2} />
      {loading ? "Enregistrement..." : "Enregistrer"}
    </button>
  );
}

function Feedback({
  state,
}: {
  state: { error: string | null; success: string | null };
}) {
  if (state.error) {
    return (
      <div className="flex items-start gap-2.5 border border-red-200 bg-red-50 px-4 py-3">
        <AlertCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
          strokeWidth={2}
        />
        <p className="text-[12.5px] text-red-800">{state.error}</p>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="flex items-start gap-2.5 border border-emerald-200 bg-emerald-50 px-4 py-3">
        <Check
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
          strokeWidth={2.5}
        />
        <p className="text-[12.5px] text-emerald-800">{state.success}</p>
      </div>
    );
  }

  return null;
}