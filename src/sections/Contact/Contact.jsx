import { useState } from "react";
import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const notifyPending = () =>
    toast.info("Sending Email", {
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
    toast.success("Email sent successfully!", {
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
    toast.error("Error Sending Email", {
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
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: 50 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Contact
      </motion.h1>
      <form onSubmit={handleContactFormSubmit}>
        <motion.div
          className="formGroup"
          initial={{ opacity: 0, x: 50 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <label htmlFor="name" hidden>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
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
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </motion.div>
        <input type="submit" value="Submit" className="hover btn" />
      </form>
      <ToastContainer />
    </section>
  );
}

export default Contact;
