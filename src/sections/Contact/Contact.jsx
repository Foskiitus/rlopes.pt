import { useState } from "react";
import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useTranslation } from "../../i18n/LocaleContext";

function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const notifyPending = () =>
    toast.info(t.contact.sending, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifySuccessful = () =>
    toast.success(t.contact.success, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error(t.contact.error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  function handleContactFormSubmit(e) {
    e.preventDefault(); // prevent reload

    notifyPending();

    // EmailJS template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "RLopes Form",
      message: message,
    };

    // Send email
    emailjs.init(publicKey);
    emailjs
      .send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setName("");
        setEmail("");
        setMessage("");
        notifySuccessful();
      })
      .catch((error) => {
        console.error("Failed to send email. Error: ", error);
        notifyError();
      });
  }
  return (
    <section id="contact" className={styles.container}>
      <motion.h2
        className="sectionTitle"
        initial={{ opacity: 0, y: 50 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {t.contact.title}
      </motion.h2>
      <form onSubmit={handleContactFormSubmit}>
        <motion.div
          className="formGroup"
          initial={{ opacity: 0, x: 50 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <label htmlFor="name" hidden>
            {t.contact.namePlaceholder}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={t.contact.namePlaceholder}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>
        <motion.div
          className="formGroup"
          initial={{ opacity: 0, x: -50 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <label htmlFor="email" hidden>
            {t.contact.emailPlaceholder}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t.contact.emailPlaceholder}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>
        <motion.div
          className="formGroup"
          initial={{ opacity: 0, x: 50 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <label htmlFor="message" hidden>
            {t.contact.messagePlaceholder}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={t.contact.messagePlaceholder}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </motion.div>
        <input type="submit" value={t.contact.submit} className="hover btn" />
      </form>
      <ToastContainer />
    </section>
  );
}

export default Contact;
