import PropTypes from "prop-types";
import { motion } from "framer-motion";

function ProjectCard({ src, link, title, description }) {
  const hasLink = Boolean(link);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ delay: 0.25, duration: 0.5 }}
    >
      <Wrapper
        {...wrapperProps}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <img
          className={hasLink ? "hover" : undefined}
          src={src}
          alt={`${title} logo`}
          loading="lazy"
          decoding="async"
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </Wrapper>
    </motion.div>
  );
}

ProjectCard.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectCard;
