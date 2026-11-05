import { useState } from 'react'

function MaterialForm({ onAgregarMaterial }) {
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('Telas y Tejidos')
  const [unidadMedida, setUnidadMedida] = useState('Metros')
  const [precioUnitario, setPrecioUnitario] = useState('')
  const [stock, setStock] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Validación de reglas de la API de Semana 8 (MaterialSerializer: validate_precio_unitario y validate_stock)
    if (!nombre.trim()) {
      setError('El nombre del material o insumo textil es obligatorio.')
      setExito(false)
      return
    }

    const precioNum = parseFloat(precioUnitario)
    if (isNaN(precioNum) || precioNum <= 0) {
      setError('El precio unitario debe ser mayor que cero (S/ 0.00), según la regla de la API.')
      setExito(false)
      return
    }

    const stockNum = parseInt(stock, 10)
    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock en almacén no puede ser negativo, según la regla de la API.')
      setExito(false)
      return
    }

    // 2. Construir el nuevo registro de material
    const nuevoMaterial = {
      id: Date.now(),
      nombre: nombre.trim(),
      categoria_nombre: categoria,
      unidad_medida: unidadMedida,
      precio_unitario: precioNum.toFixed(2),
      stock: stockNum,
    }

    // 3. Agregar al estado inmutablemente sin usar push
    onAgregarMaterial(nuevoMaterial)

    // 4. Limpiar campos
    setNombre('')
    setPrecioUnitario('')
    setStock('')
    setCategoria('Telas y Tejidos')
    setUnidadMedida('Metros')
    setError('')
    setExito(true)

    setTimeout(() => setExito(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="tarjeta" style={{ marginBottom: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#0f766e' }}>
        ➕ Registrar Nuevo Insumo Textil (Logística)
      </h3>

      {error && (
        <div style={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem', backgroundColor: '#ffe4e6', color: '#be123c', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
          ⚠️ Error: {error}
        </div>
      )}

      {exito && (
        <div style={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
          ✅ ¡Insumo textil registrado en el inventario con éxito!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Nombre del Insumo:
          </label>
          <input
            type="text"
            placeholder="Ej. Tela Rib 2x1 Algodón"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Categoría:
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          >
            <option value="Telas y Tejidos">Telas y Tejidos</option>
            <option value="Avíos y Fornituras">Avíos y Fornituras</option>
            <option value="Hilados y Conos">Hilados y Conos</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Unidad de Medida:
          </label>
          <select
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          >
            <option value="Metros">Metros</option>
            <option value="Piezas">Piezas</option>
            <option value="Conos">Conos</option>
            <option value="Kilos">Kilos</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Precio Unitario (S/):
          </label>
          <input
            type="number"
            step="0.10"
            placeholder="Mayor a 0.00"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Stock en Almacén:
          </label>
          <input
            type="number"
            min="0"
            placeholder="Ej. 100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#0f766e',
          color: '#ffffff',
          border: 'none',
          padding: '0.5rem 1.25rem',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
      >
        Guardar Insumo Textil
      </button>
    </form>
  )
}

export default MaterialForm
