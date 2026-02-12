import "./home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>I Computer Anything</h1>
        <p>Diagnostics • Repair • Web • Servers</p>
      </section>

      <section className="cards">
        <a className="card" href="/legacy/merch.html">Merch</a>
        <a className="card" href="/legacy/servers.html">Servers</a>
        <a className="card" href="/legacy/licensing.html">Licensing</a>
        <a className="card" href="/legacy/form.html">Service Form</a>
      </section>
    </main>
  );
}
