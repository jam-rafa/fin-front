import Link from "next/link";

export default function NavBar() {
    return (
      <section className="border-b backdrop-blur  bg-ground/90 border-secondary/30 px-5 py-3">
        <ul className="flex gap-5">
            <Link href="/dashBoard">
                <li className="p-2 text-sm rounded hover:bg-primary/10">Dashboard</li>
            </Link>
            <Link href="/search">
                <li className="p-2 text-sm rounded hover:bg-primary/10">Pesquisa</li>
            </Link>
        </ul>
      </section>
    );
  }
  