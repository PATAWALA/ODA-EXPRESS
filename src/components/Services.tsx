import { SERVICES } from "@/data/oda";

export default function Services() {
  return (
    <section id="services" className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
            Trois services, un seul contact
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
            Chaque étape est réalisée par notre propre équipe en Chine.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-zinc-100 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-700">
                <service.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>

              <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500">
                {service.line}
              </p>

              <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-5">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="text-[12.5px] leading-relaxed text-zinc-600"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}