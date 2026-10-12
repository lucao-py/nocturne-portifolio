import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { isValidExternalUrl } from "@/lib/content/urls";
import { projectCategoryLabels, type Project } from "@/lib/content/types";

export function ProjectCard({ project, headingLevel = 2 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const hasDistinctDemo = isValidExternalUrl(project.demoUrl) && project.demoUrl !== project.repositoryUrl;

  return (
    <article className="content-card content-card--project">
      <div className="content-card__cover">
        {project.coverImage
          ? <Image src={project.coverImage.src} alt={project.coverImage.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
          : <span className="content-card__cover-label">Sem imagem de capa</span>}
      </div>
      <div className="content-card__body">
        <div className="content-card__meta">
          <span>{projectCategoryLabels[project.category]}</span>
          {project.isExample ? <span className="example-label">Exemplo fictício</span> : null}
        </div>
        <Heading>{project.title}</Heading>
        <p>{project.excerpt}</p>
        <TagList items={project.technologies} label="Tecnologias" />
        <div className="content-card__links">
          <Link className="action-link content-card__detail-link" href={`/projetos/${project.slug}`} aria-label={`Ver detalhes de ${project.title}`}>Ver detalhes</Link>
          {isValidExternalUrl(project.repositoryUrl) ? <a className="action-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (abre em nova aba)</span></a> : null}
          {hasDistinctDemo ? <a className="action-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demonstração<span className="sr-only"> (abre em nova aba)</span></a> : null}
        </div>
      </div>
    </article>
  );
}
