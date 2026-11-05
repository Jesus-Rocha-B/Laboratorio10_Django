function DetallePedidoItem({ prenda, cantidad, precioUnitario }) {
  // Cálculo del subtotal por línea:
  const subtotal = (cantidad * Number(precioUnitario)).toFixed(2)

  return (
    <li>
      {cantidad} × {prenda} — S/ {subtotal}
    </li>
  )
}

export default DetallePedidoItem
