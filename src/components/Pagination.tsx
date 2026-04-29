interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <button
        className="btn btn-outline-primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Anterior
      </button>

      <span className="text-muted">
        Página {currentPage + 1} de {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Siguiente
      </button>
    </div>
  );
}