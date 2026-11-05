import { useState } from 'react'
import MaterialCard from './MaterialCard'

function MaterialList({ materiales = [] }) {
  const [busqueda, setBusqueda] = useState('')

  // Filtrado por nombre o por categoría sin distinguir mayúsculas
  const materialesFiltrados = materiales.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.categoria_nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      {/* Campo de búsqueda controlado (value y onChange con e.target.value) */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="🔍 Buscar tela o insumo por nombre o categoría..."
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

      {materialesFiltrados.length === 0 ? (
        <p className="vacio">
          No se encontraron insumos textiles que coincidan con &quot;{busqueda}&quot;.
        </p>
      ) : (
        <ul className="lista">
          {materialesFiltrados.map((m) => (
            <MaterialCard
              key={m.id}
              nombre={m.nombre}
              categoria={m.categoria_nombre}
              unidadMedida={m.unidad_medida}
              precioUnitario={m.precio_unitario}
              stock={m.stock}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default MaterialList
