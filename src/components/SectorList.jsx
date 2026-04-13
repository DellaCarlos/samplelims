import { useSectors } from "../hooks/use-sectors-getall";

export function SectorList() {
  const { sectors, loading, erro } = useSectors();

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <h1>lista de setores</h1>
    </div>
  );
}
