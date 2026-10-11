import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { isValidExternalUrl } from "@/lib/content/urls";
import { projectCategoryLabels, type Project } from "@/lib/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="content-card">
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
        <h2>{project.title}</h2>
        <p>{project.excerpt}</p>
        <TagList items={project.technologies} label="Tecnologias" />
        <div className="content-card__links">
          <Link href={`/projetos/${project.slug}`}>Ver detalhes <span aria-hidden="true">→</span></Link>
          {isValidExternalUrl(project.repositoryUrl) ? <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a> : null}
          {isValidExternalUrl(project.demoUrl) ? <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demonstração <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a> : null}
        </div>
      </div>
    </article>
  );
}
