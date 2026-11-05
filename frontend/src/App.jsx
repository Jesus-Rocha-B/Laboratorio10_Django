import './App.css'
import PrendaCard from './components/PrendaCard'
import PrendaList from './components/PrendaList'
import PedidoCard from './components/PedidoCard'
import Tarjeta from './components/Tarjeta'
import {
  prendas,
  pedidos,
  materiales,
  proveedores,
  despachos,
  costoDespacho,
} from './datos'

function App() {
  const nombreApp = 'UrbanTrend'

  return (
    <div className="contenedor">
      <h1 className="titulo">{nombreApp} — Catálogo Streetwear</h1>

      {/* Ejercicio 4: Componente contenedor Tarjeta con prop especial children */}
      <Tarjeta titulo="Prenda Destacada de la Colección (Contenedor Tarjeta con children)">
        <p style={{ marginTop: 0, color: '#475569', fontSize: '0.95rem' }}>
          Este contenido es inyectado dinámicamente como <code>children</code> dentro del componente <code>Tarjeta</code>:
        </p>
        <ul className="lista" style={{ margin: 0 }}>
          <PrendaCard
            nombre="Casaca Selva Alegre Windbreaker"
            marca="Selva Alegre"
            talla="XL"
            precio="219.90"
            stock={5}
          />
        </ul>
      </Tarjeta>

      {/* Ejercicio 3: Lista modularizada con PrendaList y PrendaCard pasando props y key */}
      <h2>Catálogo de Prendas (con PrendaList y props)</h2>
      <PrendaList prendas={prendas} />

      {/* Demostración de valor por defecto en props (sin marca, talla ni stock especificado) */}
      <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h3>Demostración de Props con Valores por Defecto:</h3>
        <ul className="lista">
          <PrendaCard nombre="Polera Básica Urban Sample" precio="79.90" />
        </ul>
        <small style={{ color: '#64748b' }}>
          * Esta prenda no recibió `marca`, `talla` ni `stock`, por lo que tomó los valores por defecto: 
          marca="UrbanTrend", talla="Estándar" y stock=0 (mostrando badge "Agotado").
        </small>
      </div>

      {/* Ejercicio 5: Componente para relación 1:N (PedidoCard) usando DetallePedidoItem para anidados */}
      <h2>Pedidos y sus detalles (Relación 1:N modularizada)</h2>
      {pedidos.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <ul className="lista">
          {pedidos.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              codigo={pedido.codigo}
              cliente={pedido.cliente_nombre}
              estado={pedido.estado}
              detalles={pedido.detalles}
            />
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
