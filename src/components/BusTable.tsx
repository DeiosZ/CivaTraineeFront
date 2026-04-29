import type { Bus } from "../types/bus";

interface BusTableProps {
  buses: Bus[];
}

export default function BusTable({ buses }: BusTableProps) {
  if (!Array.isArray(buses)) {
    return <div className="alert alert-danger">Datos inválidos</div>;
  }

  if (buses.length === 0) {
    return <div className="alert alert-info">No hay buses disponibles</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Características</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.numeroBus}</td>
              <td><strong>{bus.placa}</strong></td>
              <td>{bus.marca}</td>
              <td>{bus.caracteristicas}</td>
              <td>{formatDate(bus.fechaCreacion)}</td>
              <td>
                <span className={`badge ${bus.activo ? "bg-success" : "bg-danger"}`}>
                  {bus.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}