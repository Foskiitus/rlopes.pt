export const translations = {
  pt: {
    seo: {
      title: "Ricardo Lopes | Programador Full-Stack em Barcelos",
      description:
        "Ricardo Lopes, programador full-stack em Barcelos, Portugal. Desenvolvimento de websites e aplicações web modernas em React para empresas.",
    },
    hero: {
      role: "Programador Full-Stack",
      description:
        "Crio websites e aplicações web para empresas em Barcelos e na região do Minho, com React, Next.js e Node.js — do design à publicação.",
      resume: "Currículo",
    },
    skills: {
      title: "Competências",
    },
    theme: {
      switchToDark: "Ativar modo escuro",
      switchToLight: "Ativar modo claro",
    },
    projects: {
      title: "Projetos",
      viewAll: "Ver todos os projetos",
    },
    portfolio: {
      seoTitle: "Portfólio | Ricardo Lopes",
      seoDescription:
        "Portfólio de websites, aplicações mobile e projetos web desenvolvidos por Ricardo Lopes.",
      title: "Portfólio",
      filterAll: "Todos",
      filterWeb: "Web",
      filterMobile: "Mobile",
    },
    header: {
      backHome: "Ricardo Lopes",
    },
    contact: {
      title: "Contacto",
      namePlaceholder: "Nome",
      emailPlaceholder: "Email",
      messagePlaceholder: "Mensagem",
      submit: "Enviar",
      sending: "A enviar email...",
      success: "Email enviado com sucesso!",
      error: "Erro ao enviar o email",
    },
    footer: {
      rights: "Todos os direitos reservados",
    },
    languageSwitcher: {
      label: "Idioma",
    },
  },
  en: {
    seo: {
      title: "Ricardo Lopes | Full-Stack Developer",
      description:
        "Ricardo Lopes, full-stack developer based in Barcelos, Portugal. Building modern React websites and web applications for businesses.",
    },
    hero: {
      role: "Full-Stack Developer",
      description:
        "I build websites and web applications for businesses in Barcelos and Portugal's Minho region, using React, Next.js and Node.js — from design to launch.",
      resume: "Resume",
    },
    skills: {
      title: "Skills",
    },
    theme: {
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
    },
    projects: {
      title: "Projects",
      viewAll: "View all projects",
    },
    portfolio: {
      seoTitle: "Portfolio | Ricardo Lopes",
      seoDescription:
        "Portfolio of websites, mobile apps and web projects built by Ricardo Lopes.",
      title: "Portfolio",
      filterAll: "All",
      filterWeb: "Web",
      filterMobile: "Mobile",
    },
    header: {
      backHome: "Ricardo Lopes",
    },
    contact: {
      title: "Contact",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submit: "Submit",
      sending: "Sending Email",
      success: "Email sent successfully!",
      error: "Error Sending Email",
    },
    footer: {
      rights: "All rights Reserved",
    },
    languageSwitcher: {
      label: "Language",
    },
  },
};

export const locales = Object.keys(translations);
export const defaultLocale = "pt";

// BCP 47 language tags per locale, used for the <html lang>, hreflang and
// JSON-LD inLanguage values.
export const hreflangTags = { pt: "pt-PT", en: "en" };
