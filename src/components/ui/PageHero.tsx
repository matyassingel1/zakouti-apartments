import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { WordReveal, Eyebrow } from "./WordReveal";
import { Photo } from "./Photo";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  emphasize?: string[];
  lead?: string;
  photo?: { src: string; alt: string };
}

export function PageHero({ eyebrow, title, emphasize, lead, photo }: PageHeroProps) {
  if (photo) {
    return (
      <section className="relative flex h-[58vh] min-h-[420px] w-full items-end overflow-hidden bg-ink">
        <Photo src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full" reveal={false} priority />
        <div className="media-scrim absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-transparent" />
        <Container className="relative pb-14 lg:pb-20">
          <Eyebrow className="text-gold-300">{eyebrow}</Eyebrow>
          <WordReveal
            as="h1"
            className="mt-5 max-w-4xl text-display-2 text-paper"
            text={title}
            emphasize={emphasize}
          />
          {lead && (
            <Reveal className="mt-6">
              <p className="max-w-2xl text-lead text-paper/90">{lead}</p>
            </Reveal>
          )}
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-line pb-16 pt-32 lg:pb-20 lg:pt-44">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <WordReveal
          as="h1"
          className="mt-5 max-w-4xl text-display-2 text-ink"
          text={title}
          emphasize={emphasize}
        />
        {lead && (
          <Reveal className="mt-7">
            <p className="max-w-2xl text-lead text-pretty text-stone">{lead}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
