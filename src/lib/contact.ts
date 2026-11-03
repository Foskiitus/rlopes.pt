export const projectTypes = [
  "website",
  "application",
  "shop",
  "redesign",
  "other",
] as const;
export type ContactField = "name" | "email" | "project-type" | "message";
export type ContactErrors = Partial<
  Record<
    ContactField,
    "required" | "invalidEmail" | "invalidType" | "tooShort" | "tooLong"
  >
>;
export function validateContact(data: FormData): ContactErrors {
  const value = (field: string) => String(data.get(field) || "").trim();
  const errors: ContactErrors = {};
  if (!value("name")) errors.name = "required";
  const email = value("email");
  if (!email) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "invalidEmail";
  if (
    !projectTypes.includes(
      value("project-type") as (typeof projectTypes)[number],
    )
  )
    errors["project-type"] = "invalidType";
  const message = value("message");
  if (!message) errors.message = "required";
  else if (message.length < 20) errors.message = "tooShort";
  else if (message.length > 5000) errors.message = "tooLong";
  return errors;
}
