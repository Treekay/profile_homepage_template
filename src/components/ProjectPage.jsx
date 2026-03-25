import ProjectSection from "./ProjectSection";
import projects from "../data/projects";

const ProjectsPage = () => {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectSection key={project.id} {...project} index={index} />
      ))}
    </>
  );
};

export default ProjectsPage;
