function DetalleDespachoItem({ material, cantidad, costoUnitario, lote }) {
  const subtotal = (cantidad * Number(costoUnitario)).toFixed(2)

  return (
    <li>
      {cantidad} × {material} ({lote}) — S/ {subtotal}
    </li>
  )
}

export default DetalleDespachoItem
