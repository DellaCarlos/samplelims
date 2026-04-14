const BASE_URL = "http://localhost:8000/api/v1";

async function samplesClient(endpoint, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    throw new Error(erro.message || "/api/v1 -> Erro na requisição");
  }

  return res.json();
}

export default samplesClient;