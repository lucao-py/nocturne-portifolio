import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { isValidContentUrl, isValidExternalUrl } from "@/lib/content/urls";
import type { ContentBlock, ContentImage, TextSpan } from "@/lib/content/types";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    externalLink: ({ children, value }) =>
      isValidExternalUrl(value?.href)
        ? <a href={value.href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (abre em nova aba)</span></a>
        : <>{children}</>,
  },
  types: {
    contentImage: ({ value }) => {
      const image = value as ContentImage;
      if (!isValidExternalUrl(image.src)) return null;
      return (
        <figure>
          <Image src={image.src} alt={image.alt ?? ""} width={image.width ?? 1200} height={image.height ?? 675} sizes="(max-width: 768px) 100vw, 760px" />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const code = typeof value.code === "string" ? value.code : "";
      const language = typeof value.language === "string" && /^[a-z0-9+#.-]{1,30}$/i.test(value.language)
        ? value.language
        : undefined;
      return <pre><code className={language ? `language-${language}` : undefined}>{code}</code></pre>;
    },
  },
};

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
                <Image src={block.image.src} alt={block.image.alt} width={block.image.width ?? 1200} height={block.image.height ?? 675} sizes="(max-width: 768px) 100vw, 760px" />
                {block.image.caption ? <figcaption>{block.image.caption}</figcaption> : null}
              </figure>
            );
          case "portableText":
            return <PortableText key={index} value={block.value} components={portableTextComponents} />;
        }
      })}
    </div>
  );
}
