import { useEffect, useState } from "react";
import { getBuses, getBusById } from "../api/civaApi";
import type { Bus } from "../types/bus";
import BusTable from "../components/BusTable";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

export default function Home() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [pageSize] = useState<number>(5);

  const [busquedaId, setBusquedaId] = useState<string>("");
  const [modoBusqueda, setModoBusqueda] = useState<boolean>(false);

  useEffect(() => {
    if (!modoBusqueda) {
      fetchBuses(currentPage);
    }
  }, [currentPage, modoBusqueda]);

  const fetchBuses = async (page: number) => {
    try {
      setLoading(true);
      const data = await getBuses(page, pageSize);

      setBuses(data.buses);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalElements(data.totalElements);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al cargar los buses");
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarPorId = async () => {
    if (!busquedaId) return;

    try {
      setLoading(true);
      setModoBusqueda(true);

      const bus = await getBusById(Number(busquedaId));

      setBuses([bus]);
      setTotalPages(1);
      setTotalElements(1);
      setCurrentPage(0);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Bus no encontrado");
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  const limpiarBusqueda = () => {
    setBusquedaId("");
    setModoBusqueda(false);
    fetchBuses(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Error</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => fetchBuses(currentPage)}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Listado de Buses</h1>
        <span className="badge bg-secondary">
          Página {currentPage + 1} de {totalPages} | Total: {totalElements}
        </span>
      </div>

      {/* BUSCADOR POR ID */}
      <div className="mb-3 d-flex gap-2">
        <input
          type="number"
          className="form-control"
          placeholder="Buscar por ID"
          value={busquedaId}
          onChange={(e) => setBusquedaId(e.target.value)}
          onKeyDown={(e)=> e.key ==="Enter"&&buscarPorId()}
        />

        <button className="btn btn-primary" onClick={buscarPorId}>
          Buscar
        </button>

        {modoBusqueda && (
          <button className="btn btn-secondary" onClick={limpiarBusqueda}>
            Volver
          </button>
        )}
      </div>

      <BusTable buses={buses} />

      {!modoBusqueda && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}