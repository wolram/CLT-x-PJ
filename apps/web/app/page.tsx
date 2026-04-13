import Link from "next/link";
import { screens } from "@/screens/manifest";

export default function HomePage() {
  return (
    <main className="container">
      <h1>Produto Unificado de Screens</h1>
      <p className="muted">
        Todas as telas HTML foram agrupadas neste app Next.js. Clique para abrir cada
        screen.
      </p>
      <section className="card-grid">
        {screens.map((screen) => (
          <Link key={screen.slug} href={`/screen/${screen.slug}`} className="card">
            <h3>{screen.title}</h3>
            <p className="muted">{screen.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
