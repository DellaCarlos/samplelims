import { useSamples } from "../hooks/useSamples";

export function SamplesList() {
  const { samples, loading, erro } = useSamples();

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div style={{ overflowX: "auto", border: "1px solid #d1d5db", borderRadius: "8px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "#f3f4f6", borderBottom: "1px solid #d1d5db" }}>
            <th style={{ padding: "12px 16px", fontWeight: 600, color: "#111827", textAlign: "left" }}>ID</th>
            <th style={{ padding: "12px 16px", fontWeight: 600, color: "#111827", textAlign: "left" }}>Name</th>
            <th style={{ padding: "12px 16px", fontWeight: 600, color: "#111827", textAlign: "left" }}>Sector</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample, index) => (
            <tr
              key={sample.id_sample}
              style={{
                borderBottom: index < samples.length - 1 ? "1px solid #e5e7eb" : "none",
                background: "white",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
              onMouseLeave={(e) => e.currentTarget.style.background = "white"}
            >
              <td style={{ padding: "12px 16px", color: "#6b7280", textAlign: "left" }}>{sample.id_sample}</td>
              <td style={{ padding: "12px 16px", color: "#111827", fontWeight: 500, textAlign: "left" }}>{sample.name_sample}</td>
              <td style={{ padding: "12px 16px", color: "#374151", textAlign: "left" }}>{sample.sector_sample}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}