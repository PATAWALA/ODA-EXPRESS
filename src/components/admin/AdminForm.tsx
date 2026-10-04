"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Input, Textarea, Select } from "@/components/ui/Input";
import SlugField from "./SlugField";
import ImageUploader from "./ImageUploader";

interface Field {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "slug"
    | "image";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  hint?: string;
  defaultValue?: string | number | boolean;
  prefix?: string;
}

interface AdminFormProps {
  title: string;
  backHref: string;
  fields: Field[];
  saveAction: (formData: FormData) => Promise<{ error?: string } | void>;
}

export default function AdminForm({
  title,
  backHref,
  fields,
  saveAction,
}: AdminFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await saveAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition hover:text-navy-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Retour
          </Link>
          <h1 className="mt-3 text-[24px] font-bold tracking-tight text-navy-900">
            {title}
          </h1>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl bg-express-600 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>

      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        {fields.map((field) => {
          if (field.type === "image") {
            return (
              <ImageUploader
                key={field.name}
                name={field.name}
                label={field.label}
                folder={field.prefix ?? "general"}
                defaultValue={String(field.defaultValue ?? "")}
                hint={field.hint}
              />
            );
          }

          if (field.type === "slug") {
            return (
              <SlugField
                key={field.name}
                name={field.name}
                label={field.label}
                prefix={field.prefix ?? "/"}
                defaultValue={String(field.defaultValue ?? "")}
                required={field.required}
              />
            );
          }

          if (field.type === "textarea") {
            return (
              <Textarea
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                rows={6}
                defaultValue={String(field.defaultValue ?? "")}
                hint={field.hint}
              />
            );
          }

          if (field.type === "select") {
            return (
              <Select
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                options={field.options ?? []}
                defaultValue={String(field.defaultValue ?? "")}
                hint={field.hint}
              />
            );
          }

          if (field.type === "checkbox") {
            return (
              <label
                key={field.name}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  name={field.name}
                  defaultChecked={Boolean(field.defaultValue)}
                  className="h-4 w-4 rounded-2xl border-zinc-300"
                />
                <span className="text-[13.5px] font-medium text-navy-900">
                  {field.label}
                </span>
                {field.hint && (
                  <span className="text-[11.5px] text-zinc-500">
                    — {field.hint}
                  </span>
                )}
              </label>
            );
          }

          return (
            <Input
              key={field.name}
              name={field.name}
              type={field.type ?? "text"}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              defaultValue={String(field.defaultValue ?? "")}
              hint={field.hint}
            />
          );
        })}

        {error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[12.5px] text-red-700">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}