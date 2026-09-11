const API_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export interface LoginResponse {
  accessToken: string;
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No fue posible iniciar sesión");
  }

  return response.json() as Promise<LoginResponse>;
}

export interface ScoreResponse {
  rut: string;
  score: number;
  fecha: string;
}

export async function getScore(
  rut: string,
  accessToken: string,
): Promise<ScoreResponse> {
  const response = await fetch(`${API_URL}/score/${encodeURIComponent(rut)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No fue posible consultar el score");
  }

  return response.json() as Promise<ScoreResponse>;
}
