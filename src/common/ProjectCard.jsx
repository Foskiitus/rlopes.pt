function ProjectCard({ src, link, title, description }) {
  link && link !== "" ? link : "#";
  return (
    <div>
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
    </div>
  );
}

export default ProjectCard;
