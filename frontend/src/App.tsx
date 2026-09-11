import { useState, type FormEvent } from "react";

import { getScore, login, type ScoreResponse } from "./api";

function App() {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") ?? "",
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [rut, setRut] = useState("");
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(username, password);

      localStorage.setItem("accessToken", response.accessToken);
      setAccessToken(response.accessToken);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setScoreResult(null);
    setLoading(true);

    try {
      const response = await getScore(rut, accessToken);
      setScoreResult(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible consultar el score",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    setScoreResult(null);
    setRut("");
    setError("");
    setUsername("");
    setPassword("");
  }

  if (!accessToken) {
    return (
      <main>
        <section>
          <h1>Consulta de riesgo financiero</h1>
          <p>Ingresa tus credenciales para continuar.</p>

          <form onSubmit={handleLogin}>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h1>Consulta de score financiero</h1>

        <form onSubmit={handleScore}>
          <label htmlFor="rut">RUT</label>
          <input
            id="rut"
            type="text"
            placeholder="12.345.678-5"
            value={rut}
            onChange={(event) => setRut(event.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Consultando..." : "Consultar score"}
          </button>
        </form>

        <div className="response-area">
          {error && <p role="alert">{error}</p>}

          {scoreResult && (
            <article>
              <h2>Resultado</h2>
              <p>RUT: {scoreResult.rut}</p>
              <p>Score: {scoreResult.score}</p>
              <p>
                Fecha: {new Date(scoreResult.fecha).toLocaleString("es-CL")}
              </p>
            </article>
          )}
        </div>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  );
}

export default App;
