import Image from "next/image";
import Link from "next/link";
import { isValidContentUrl, isValidExternalUrl } from "@/lib/content/urls";
import type { ContentBlock, TextSpan } from "@/lib/content/types";

function InlineSpan({ span }: { span: TextSpan }) {
  let content: React.ReactNode = span.text;
  if (span.strong) content = <strong>{content}</strong>;
  if (span.emphasis) content = <em>{content}</em>;

  if (isValidContentUrl(span.href)) {
    content = isValidExternalUrl(span.href)
      ? <a href={span.href} target="_blank" rel="noopener noreferrer">{content}<span className="sr-only"> (abre em nova aba)</span></a>
      : <Link href={span.href}>{content}</Link>;
  }

  return <span>{content}</span>;
}

export function ContentBody({ blocks }: { blocks: readonly ContentBlock[] }) {
  return (
    <div className="content-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.spans.map((span, spanIndex) => <InlineSpan key={spanIndex} span={span} />)}</p>;
          case "heading":
            return block.level === 2 ? <h2 key={index}>{block.text}</h2> : <h3 key={index}>{block.text}</h3>;
          case "list": {
            const items = block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>);
            return block.ordered ? <ol key={index}>{items}</ol> : <ul key={index}>{items}</ul>;
          }
          case "quote":
            return <blockquote key={index}>{block.text}</blockquote>;
          case "code":
            return <pre key={index}><code className={block.language ? `language-${block.language}` : undefined}>{block.code}</code></pre>;
          case "image":
            return (
              <figure key={index}>
                <Image src={block.image.src} alt={block.image.alt} width={1200} height={675} sizes="(max-width: 768px) 100vw, 760px" />
                {block.image.caption ? <figcaption>{block.image.caption}</figcaption> : null}
              </figure>
            );
        }
      })}
    </div>
  );
}
