function PrendaCard({
  nombre,
  marca = 'UrbanTrend',
  talla = 'Estándar',
  precio = '0.00',
  stock = 0,
}) {
  const precioFormateado = Number(precio).toFixed(2)

  return (
    <li className="tarjeta">
      <strong>{nombre}</strong> ({marca}, talla {talla}) — S/ {precioFormateado} —{' '}
      {stock === 0 ? (
        <span className="etiqueta agotado">Agotado</span>
      ) : (
        <span className="etiqueta">Stock: {stock}</span>
      )}
      {stock > 0 && stock <= 5 && (
        <span className="etiqueta alerta">¡Últimas unidades!</span>
      )}
    </li>
  )
}

export default PrendaCard
