import { useState } from 'react'

function MaterialCard({
  nombre,
  categoria = 'Insumos Textiles',
  unidadMedida = 'Metros',
  precioUnitario = '0.00',
  stock = 0,
}) {
  // Estado local para reservar muestras de tela/insumo
  const [reservado, setReservado] = useState(0)
  const precioFormateado = Number(precioUnitario).toFixed(2)

  const incrementarReserva = () => {
    if (stock > 0 && reservado < stock) {
      setReservado((prev) => prev + 1)
    }
  }

  return (
    <li className="tarjeta">
      <div>
        <strong>{nombre}</strong> · {categoria} — S/ {precioFormateado} por {unidadMedida.toLowerCase()}{' '}
        {stock === 0 ? (
          <span className="etiqueta agotado">Sin stock</span>
        ) : (
          <span className="etiqueta">Stock: {stock}</span>
        )}
        {stock > 0 && stock < 200 && (
          <span className="etiqueta alerta" style={{ fontWeight: 700 }}>
            Stock bajo
          </span>
        )}
      </div>

      {/* Botón con estado y evento onClick */}
      <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={incrementarReserva}
          disabled={stock === 0 || reservado >= stock}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: stock === 0 ? '#e2e8f0' : '#0f766e',
            color: stock === 0 ? '#94a3b8' : '#ffffff',
            cursor: stock === 0 || reservado >= stock ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          {stock === 0 ? 'Sin stock' : '+ Reservar muestra'}
        </button>

        {reservado > 0 && (
          <span style={{ fontWeight: 700, color: '#0f766e', fontSize: '0.9rem' }}>
            Muestras reservadas: {reservado} {unidadMedida.toLowerCase()}
          </span>
        )}
      </div>
    </li>
  )
}

export default MaterialCard
