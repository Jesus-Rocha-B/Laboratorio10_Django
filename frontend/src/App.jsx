import { useState } from 'react'
import './App.css'
import PrendaCard from './components/PrendaCard'
import PrendaList from './components/PrendaList'
import PrendaForm from './components/PrendaForm'
import PedidoCard from './components/PedidoCard'
import MaterialCard from './components/MaterialCard'
import MaterialList from './components/MaterialList'
import MaterialForm from './components/MaterialForm'
import DespachoCard from './components/DespachoCard'
import Tarjeta from './components/Tarjeta'
import {
  prendas as prendasIniciales,
  pedidos,
  materiales as materialesIniciales,
  proveedores,
  despachos,
} from './datos'

function App() {
  const nombreApp = 'UrbanTrend'

  // Parte 1: Estado para la lista de prendas (comercial)
  const [listaPrendas, setListaPrendas] = useState(prendasIniciales)

  const handleAgregarPrenda = (nuevaPrenda) => {
    setListaPrendas((prev) => [...prev, nuevaPrenda])
  }

  // Parte 2: Estado para la lista de materiales (investigación propia de logística)
  const [listaMateriales, setListaMateriales] = useState(materialesIniciales)

  const handleAgregarMaterial = (nuevoMaterial) => {
    setListaMateriales((prev) => [...prev, nuevoMaterial])
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">{nombreApp} — Plataforma Textil y Logística</h1>

      {/* ======================================================== */}
      {/* PARTE 1 — TIENDA COMERCIAL STREETWEAR                   */}
      {/* ======================================================== */}

      {/* Ejercicio 4: Componente contenedor Tarjeta con children */}
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

      {/* Ejercicio 8: Formulario controlado con validación */}
      <PrendaForm onAgregarPrenda={handleAgregarPrenda} />

      {/* Ejercicio 3 y 7: Lista modularizada con PrendaList y campo de búsqueda */}
      <h2>Catálogo de Prendas ({listaPrendas.length} registros)</h2>
      <PrendaList prendas={listaPrendas} />

      {/* Demostración de valor por defecto en props */}
      <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h3>Demostración de Props con Valores por Defecto:</h3>
        <ul className="lista">
          <PrendaCard nombre="Polera Básica Urban Sample" precio="79.90" />
        </ul>
        <small style={{ color: '#64748b' }}>
          * Esta prenda no recibió `marca`, `talla` ni `stock`, por lo que tomó los valores por defecto: 
          marca=&quot;UrbanTrend&quot;, talla=&quot;Estándar&quot; y stock=0 (mostrando badge &quot;Agotado&quot;).
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

      {/* ======================================================== */}
      {/* PARTE 2 — INVESTIGACIÓN PROPIA: LOGÍSTICA TEXTIL          */}
      {/* ======================================================== */}
      <h2 style={{ marginTop: '3rem', borderTop: '2px solid #cbd5e1', paddingTop: '1.5rem' }}>
        Parte 2 — Investigación Propia: Logística e Insumos Textiles
      </h2>

      {/* Ejercicio 10: Contenedor Tarjeta con children para insumo crítico */}
      <Tarjeta titulo="Insumo Crítico de Producción (Contenedor Tarjeta con children)">
        <p style={{ marginTop: 0, color: '#475569', fontSize: '0.9rem' }}>
          Material con alta rotación en almacén central, envuelto en el componente <code>Tarjeta</code> con <code>children</code>:
        </p>
        <ul className="lista" style={{ margin: 0 }}>
          <MaterialCard
            nombre="Tela Algodón Pima 50/1 Negro"
            categoria="Telas y Tejidos"
            unidadMedida="Metros"
            precioUnitario="34.50"
            stock={450}
          />
        </ul>
      </Tarjeta>

      {/* Ejercicio 10: Demostración de valores por defecto en props de MaterialCard */}
      <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        <h4>Demostración de Props con Valores por Defecto en Insumos:</h4>
        <ul className="lista">
          <MaterialCard nombre="Tela Muestra Experimental" precioUnitario="22.50" />
        </ul>
        <small style={{ color: '#64748b' }}>
          * Este registro no recibió `categoria`, `unidadMedida` ni `stock`. Tomó los valores por defecto: 
          categoria=&quot;Insumos Textiles&quot;, unidadMedida=&quot;Metros&quot; y stock=0 (badge &quot;Sin stock&quot;).
        </small>
      </div>

      {/* Formulario controlado de Materiales (reglas de API Semana 8) */}
      <MaterialForm onAgregarMaterial={handleAgregarMaterial} />

      {/* Ejercicio 10: Lista de Materiales con map() y key */}
      <h3>Inventario de Insumos Textiles ({listaMateriales.length} registros)</h3>
      <MaterialList materiales={listaMateriales} />

      {/* Proveedores */}
      <h3>Proveedores Registrados</h3>
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

      {/* Ejercicio 10: Componente de relación N:M con modelo intermedio (DespachoCard y DetalleDespachoItem) */}
      <h3>Órdenes de Despacho y sus Materiales (Relación N:M modularizada)</h3>
      {despachos.length === 0 ? (
        <p className="vacio">No hay registros</p>
      ) : (
        <ul className="lista">
          {despachos.map((orden) => (
            <DespachoCard
              key={orden.id}
              codigo={orden.codigo}
              sucursal={orden.sucursal_nombre}
              transportista={orden.transportista_empresa}
              estado={orden.estado}
              detalles={orden.detalles}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
