import { useState } from 'react'

function PrendaCard({
  nombre,
  marca = 'UrbanTrend',
  talla = 'Estándar',
  precio = '0.00',
  stock = 0,
}) {
  // Ejercicio 6: Estado local con useState para el contador de unidades seleccionadas
  const [contador, setContador] = useState(0)
  const precioFormateado = Number(precio).toFixed(2)

  const incrementar = () => {
    if (stock > 0 && contador < stock) {
      setContador((prev) => prev + 1)
    }
  }

  return (
    <li className="tarjeta">
      <div>
        <strong>{nombre}</strong> ({marca}, talla {talla}) — S/ {precioFormateado} —{' '}
        {stock === 0 ? (
          <span className="etiqueta agotado">Agotado</span>
        ) : (
          <span className="etiqueta">Stock: {stock}</span>
        )}
        {stock > 0 && stock <= 5 && (
          <span className="etiqueta alerta">¡Últimas unidades!</span>
        )}
      </div>

      {/* Control interactivo con botón y contador condicional */}
      <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={incrementar}
          disabled={stock === 0 || contador >= stock}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: stock === 0 ? '#e2e8f0' : '#0f766e',
            color: stock === 0 ? '#94a3b8' : '#ffffff',
            cursor: stock === 0 || contador >= stock ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          {stock === 0 ? 'Sin stock' : '+ Agregar'}
        </button>

        {/* Mostrar el valor solo cuando sea mayor que cero */}
        {contador > 0 && (
          <span style={{ fontWeight: 700, color: '#0f766e', fontSize: '0.9rem' }}>
            Seleccionados: {contador} {contador === 1 ? 'unidad' : 'unidades'}
          </span>
        )}
      </div>
    </li>
  )
}

export default PrendaCard
