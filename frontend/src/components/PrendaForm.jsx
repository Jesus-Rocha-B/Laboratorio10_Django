import { useState } from 'react'

function PrendaForm({ onAgregarPrenda }) {
  // Campos controlados del formulario
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [talla, setTalla] = useState('M')
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  const handleSubmit = (e) => {
    // Evitar la recarga automática del navegador
    e.preventDefault()

    // 1. Validación de regla de negocio tomada de la API Semana 8 (validate_precio: precio > 0)
    if (!nombre.trim()) {
      setError('El nombre de la prenda es obligatorio.')
      setExito(false)
      return
    }

    const precioNum = parseFloat(precio)
    if (isNaN(precioNum) || precioNum <= 0) {
      setError('El precio debe ser mayor que cero (S/ 0.00), según la regla de la API.')
      setExito(false)
      return
    }

    const stockNum = parseInt(stock, 10)
    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock debe ser un número entero mayor o igual a cero.')
      setExito(false)
      return
    }

    // 2. Construcción del nuevo registro
    const nuevaPrenda = {
      id: Date.now(), // ID único basado en timestamp para la key de React
      nombre: nombre.trim(),
      marca: 'UrbanTrend',
      talla,
      precio: precioNum.toFixed(2),
      stock: stockNum,
    }

    // 3. Envío al componente padre para agregarlo al estado (inmutable, sin push)
    onAgregarPrenda(nuevaPrenda)

    // 4. Limpieza de los campos del formulario tras envío exitoso
    setNombre('')
    setPrecio('')
    setStock('')
    setTalla('M')
    setError('')
    setExito(true)

    setTimeout(() => setExito(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="tarjeta" style={{ marginBottom: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#0f766e' }}>
        ➕ Registrar Nueva Prenda Streetwear
      </h3>

      {/* Mensaje de error condicional */}
      {error && (
        <div style={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem', backgroundColor: '#ffe4e6', color: '#be123c', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
          ⚠️ Error: {error}
        </div>
      )}

      {/* Mensaje de éxito condicional */}
      {exito && (
        <div style={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
          ✅ ¡Prenda agregada a la lista exitosamente!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Nombre:
          </label>
          <input
            type="text"
            placeholder="Ej. Polera Gothic Street"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Precio (S/):
          </label>
          <input
            type="number"
            step="0.10"
            placeholder="Mayor a 0.00"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Stock:
          </label>
          <input
            type="number"
            min="0"
            placeholder="Ej. 10"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Talla:
          </label>
          <select
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
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
        Guardar Prenda
      </button>
    </form>
  )
}

export default PrendaForm
