"use client";
import { useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import {
  projectTypes,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<ContactErrors>({});
  const status = useRef<HTMLDivElement>(null);
  const locked = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const validation = validateContact(data);
    setErrors(validation);
    const first = Object.keys(validation)[0];
    if (first) {
      // Let React expose the error text and ARIA association before focus.
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[name="' + first + '"]')?.focus(),
      );
      return;
    }
    locked.current = true;
    setState("pending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const body = new URLSearchParams();
      data.forEach((value, key) => body.append(key, String(value).trim()));
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      form.reset();
      requestAnimationFrame(() => status.current?.focus());
    } catch {
      setState("error");
    } finally {
      clearTimeout(timeout);
      locked.current = false;
    }
  }
  function props(field: ContactField) {
    return {
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field]
        ? field + "-error"
        : field === "message"
          ? "message-hint"
          : undefined,
    };
  }
  function error(field: ContactField) {
    return errors[field] ? (
      <p className="field-error" id={field + "-error"}>
        {t(errors[field]!)}
      </p>
    ) : null;
  }
  return (
    <>
      <noscript>
        <style>{".contact-form{display:none}"}</style>
        <p>{t("nojs")}</p>
      </noscript>
      <form
        className="contact-form"
        name="project-enquiry"
        method="POST"
        action="/__forms.html"
        onSubmit={submit}
        noValidate
        aria-busy={state === "pending"}
      >
        <input type="hidden" name="form-name" value="project-enquiry" />
        <input type="hidden" name="locale" value={locale} />
        <div hidden>
          <label htmlFor="bot-field">{t("honeypot")}</label>
          <input
            id="bot-field"
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        {state !== "success" && (
          <>
            <p className="required-note">{t("requiredNote")}</p>
            <fieldset disabled={state === "pending"}>
              <legend className="sr-only">{t("type")}</legend>
              <div className="form-two">
                <div className="field">
                  <label htmlFor="name">{t("name")}</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
                    required
                    {...props("name")}
                  />
                  {error("name")}
                </div>
                <div className="field">
                  <label htmlFor="email">{t("email")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    {...props("email")}
                  />
                  {error("email")}
                </div>
              </div>
              <div className="field">
                <label htmlFor="project-type">{t("type")}</label>
                <select
                  id="project-type"
                  name="project-type"
                  required
                  defaultValue=""
                  {...props("project-type")}
                >
                  <option value="" disabled>
                    {t("choose")}
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {t("types." + type)}
                    </option>
                  ))}
                </select>
                {error("project-type")}
              </div>
              <div className="field">
                <label htmlFor="message">{t("description")}</label>
                <p className="field-hint" id="message-hint">
                  {t("descriptionHint")}
                </p>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  minLength={20}
                  maxLength={5000}
                  required
                  {...props("message")}
                />
                {error("message")}
              </div>
              <div className="form-submit">
                <p>
                  {t("privacy")}{" "}
                  <a href={"/" + locale + "/privacy"}>{t("privacyLink")}</a>
                </p>
                <button className="button button-dark" type="submit">
                  {t(state === "pending" ? "sending" : "submit")}
                  {state === "pending" ? (
                    <LoaderCircle
                      className="spinner"
                      aria-hidden="true"
                      size={18}
                    />
                  ) : (
                    <ArrowUpRight aria-hidden="true" size={19} />
                  )}
                </button>
              </div>
            </fieldset>
          </>
        )}
        <div
          className={"form-status " + state}
          ref={status}
          tabIndex={-1}
          role={state === "error" ? "alert" : "status"}
          aria-live={state === "error" ? "assertive" : "polite"}
        >
          {state === "success" ? (
            <>
              <Check size={30} aria-hidden="true" />
              <p>{t("success")}</p>
              <button
                type="button"
                className="text-link"
                onClick={(event) => {
                  const form = event.currentTarget.closest("form");
                  setState("idle");
                  requestAnimationFrame(() =>
                    form?.querySelector<HTMLInputElement>("#name")?.focus(),
                  );
                }}
              >
                {t("newMessage")}
              </button>
            </>
          ) : state === "error" ? (
            <p>{t("error")}</p>
          ) : state === "pending" ? (
            <span className="sr-only">{t("sending")}</span>
          ) : null}
        </div>
      </form>
    </>
  );
}
