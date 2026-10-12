import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { isValidExternalUrl } from "@/lib/content/urls";
import { projectCategoryLabels, type Project } from "@/lib/content/types";

export function FeaturedProjectCard({ project, position, lead }: {
  project: Project;
  position: number;
  lead: boolean;
}) {
  const category = projectCategoryLabels[project.category];
  const detailHref = `/projetos/${project.slug}`;
  const index = String(position).padStart(2, "0");
  const hasDistinctDemo = isValidExternalUrl(project.demoUrl) && project.demoUrl !== project.repositoryUrl;

  return (
    <article className={`home-project ${lead ? "home-project--lead" : "home-project--support"}`}>
      <div className="home-project__visual">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes={lead ? "(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 600px" : "(max-width: 767px) 100vw, (max-width: 1023px) 45vw, 450px"}
          />
        ) : (
          <div className="home-project__fallback" aria-hidden="true">
            <span className="home-project__fallback-index">{index}</span>
            <span className="home-project__fallback-label">{category}</span>
          </div>
        )}
      </div>

      <div className="home-project__body">
        <div className="home-project__meta">
          <span>{index} / {lead ? "Destaque" : "Projeto"}</span>
          <span>{category}</span>
          {project.isExample ? <span className="example-label">Exemplo fictício</span> : null}
        </div>
        <h3>{project.title}</h3>
        <p>{project.excerpt}</p>
        <TagList items={project.technologies} label="Tecnologias" />
        <div className="home-project__links">
          <Link className="action-link home-project__detail-link" href={detailHref} aria-label={`Ver detalhes de ${project.title}`}>Ver detalhes</Link>
          {isValidExternalUrl(project.repositoryUrl) ? <a className="action-link home-project__external-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (abre em nova aba)</span></a> : null}
          {hasDistinctDemo ? <a className="action-link home-project__external-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demonstração<span className="sr-only"> (abre em nova aba)</span></a> : null}
        </div>
      </div>
    </article>
  );
}
