import { motion } from "framer-motion";

function ProjectCard({ src, link, title, description }) {
  link && link !== "" ? link : "#";
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ delay: 0.25, duration: 0.5 }}
    >
      <a
        href={link}
        target="_blank"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img className="hover" src={src} alt={`${title} logo`} />
        <h3>{title}</h3>
        <p>{description}</p>
      </a>
    </motion.div>
  );
}

export default ProjectCard;
