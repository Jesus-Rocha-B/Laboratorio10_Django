import DetalleDespachoItem from './DetalleDespachoItem'

function DespachoCard({ codigo, sucursal, transportista, estado, detalles = [] }) {
  // Cálculo del costo total de la orden de despacho con reduce():
  const costoTotal = detalles.reduce(
    (acum, d) => acum + d.cantidad_despachada * Number(d.costo_unitario_historico),
    0
  ).toFixed(2)

  return (
    <li className="tarjeta">
      <strong>{codigo}</strong> → {sucursal} · {transportista} ({estado})
      <ul>
        {detalles.map((d) => (
          <DetalleDespachoItem
            key={d.id}
            material={d.material_nombre}
            cantidad={d.cantidad_despachada}
            costoUnitario={d.costo_unitario_historico}
            lote={d.lote_produccion}
          />
        ))}
      </ul>
      <strong style={{ color: '#0f766e' }}>
        {detalles.length} {detalles.length === 1 ? 'material' : 'materiales'} · Costo total del envío: S/ {costoTotal}
      </strong>
    </li>
  )
}

export default DespachoCard
