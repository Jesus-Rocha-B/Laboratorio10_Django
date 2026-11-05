import './App.css'
import {
  prendas,
  pedidos,
  materiales,
  proveedores,
  despachos,
  costoDespacho,
  totalPedido,
} from './datos'

function App() {
  const nombreApp = 'UrbanTrend'

  return (
    <div className="contenedor">
      <h1 className="titulo">{nombreApp} — Catálogo Streetwear</h1>

      {prendas.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <ul className="lista">
          {prendas.map((p) => (
            <li key={p.id} className="tarjeta">
              {p.nombre} ({p.marca}, talla {p.talla}) — S/ {Number(p.precio).toFixed(2)} —{' '}
              {p.stock === 0 ? (
                <span className="etiqueta agotado">Agotado</span>
              ) : (
                <span className="etiqueta">Stock: {p.stock}</span>
              )}
              {p.stock > 0 && p.stock <= 5 && (
                <span className="etiqueta alerta">¡Últimas unidades!</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Pedidos y sus detalles</h2>
      {pedidos.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <ul className="lista">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="tarjeta">
              <strong>{pedido.codigo}</strong> — {pedido.cliente_nombre} ({pedido.estado})
              <ul>
                {pedido.detalles.map((d) => (
                  <li key={d.id}>
                    {d.cantidad} × {d.prenda_nombre} — S/ {(d.cantidad * Number(d.precio_unitario)).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong style={{ color: '#0f766e' }}>Total: S/ {totalPedido(pedido).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      )}

      <h2>Parte 2 — Logística e insumos textiles</h2>

      <h3>Materiales</h3>
      {materiales.length === 0 ? (
        <p className="vacio">No hay registros</p>
      ) : (
        <ul className="lista">
          {materiales.map((m) => (
            <li key={m.id} className="tarjeta">
              <strong>{m.nombre}</strong> · {m.categoria_nombre} — S/ {Number(m.precio_unitario).toFixed(2)} por{' '}
              {m.unidad_medida.toLowerCase()}
              {m.stock === 0 ? (
                <span className="etiqueta agotado">Sin stock</span>
              ) : (
                <span className="etiqueta">Stock: {m.stock}</span>
              )}
              {m.stock > 0 && m.stock < 200 && (
                <span className="etiqueta alerta" style={{ fontWeight: 700 }}>Stock bajo</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3>Proveedores</h3>
      {proveedores.length === 0 ? (
        <p className="vacio">No hay registros</p>
      ) : (
        <ul className="lista">
          {proveedores.map((pr) => (
            <li key={pr.id} className="tarjeta">
              <strong>{pr.razon_social}</strong> · RUC {pr.ruc}
              <div>{pr.correo} · {pr.telefono}</div>
            </li>
          ))}
        </ul>
      )}

      <h3>Órdenes de despacho y sus materiales</h3>
      {despachos.length === 0 ? (
        <p className="vacio">No hay registros</p>
      ) : (
        <ul className="lista">
          {despachos.map((orden) => (
            <li key={orden.id} className="tarjeta">
              <strong>{orden.codigo}</strong> → {orden.sucursal_nombre} · {orden.transportista_empresa} ({orden.estado})
              <ul>
                {orden.detalles.map((d) => (
                  <li key={d.id}>
                    {d.cantidad_despachada} × {d.material_nombre} ({d.lote_produccion}) — S/{' '}
                    {(d.cantidad_despachada * Number(d.costo_unitario_historico)).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong style={{ color: '#0f766e' }}>
                {orden.detalles.length} {orden.detalles.length === 1 ? 'material' : 'materiales'} · Costo total: S/{' '}
                {costoDespacho(orden).toFixed(2)}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
