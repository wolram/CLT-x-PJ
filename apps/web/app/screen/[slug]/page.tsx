import Link from "next/link";
import { notFound } from "next/navigation";
import { screenBySlug } from "@/screens/manifest";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ScreenPage({ params }: PageProps) {
  const { slug } = await params;
  const screen = screenBySlug.get(slug);

  if (!screen) {
    notFound();
  }

  return (
    <main className="container">
      <p>
        <Link href="/">Voltar para catálogo</Link>
      </p>
      <h1>{screen.title}</h1>
      <p className="muted">{screen.description}</p>
      <iframe
        className="viewer"
        src={`/screens/${screen.fileName}`}
        title={screen.title}
      />
    </main>
  );
}
