import DetallePedidoItem from './DetallePedidoItem'

function PedidoCard({ codigo, cliente, estado, detalles = [] }) {
  // Cálculo del total del pedido con JavaScript (reduce):
  const totalCalculado = detalles.reduce(
    (acum, d) => acum + d.cantidad * Number(d.precio_unitario),
    0
  ).toFixed(2)

  return (
    <li className="tarjeta">
      <strong>{codigo}</strong> — {cliente} ({estado})
      <ul>
        {detalles.map((d) => (
          <DetallePedidoItem
            key={d.id}
            prenda={d.prenda_nombre}
            cantidad={d.cantidad}
            precioUnitario={d.precio_unitario}
          />
        ))}
      </ul>
      <strong style={{ color: '#0f766e' }}>Total: S/ {totalCalculado}</strong>
    </li>
  )
}

export default PedidoCard
