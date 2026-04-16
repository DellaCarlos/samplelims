import { useSectors } from "../hooks/sectors/use-sectors-getall";

export function SectorList() {
  const { sectors, loading, erro } = useSectors();

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <h1>Lista de setores</h1>
      <ul>
        {sectors.map((sector) => (
          <li key={sector.sector_name ?? sector}>{sector.sector_name ?? sector}</li>
        ))}
      </ul>
    </div>
  );
}