import { useState } from 'react'
import PrendaCard from './PrendaCard'

function PrendaList({ prendas = [] }) {
  // Ejercicio 7: Estado para el campo de búsqueda controlado
  const [busqueda, setBusqueda] = useState('')

  // Filtrado que no distingue entre mayúsculas y minúsculas
  const prendasFiltradas = prendas.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      {/* Campo de búsqueda controlado (value y onChange con e.target.value) */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="🔍 Buscar prenda por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '380px',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Mensaje cuando ningún registro coincide vs lista filtrada */}
      {prendasFiltradas.length === 0 ? (
        <p className="vacio">
          No se encontraron prendas que coincidan con &quot;{busqueda}&quot;.
        </p>
      ) : (
        <ul className="lista">
          {prendasFiltradas.map((prenda) => (
            <PrendaCard
              key={prenda.id}
              nombre={prenda.nombre}
              marca={prenda.marca}
              talla={prenda.talla}
              precio={prenda.precio}
              stock={prenda.stock}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default PrendaList
