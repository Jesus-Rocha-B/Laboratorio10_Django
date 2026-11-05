# Laboratorio 10 — Modularización en Componentes React para UrbanTrend

**Curso:** Desarrollo de Aplicaciones Empresariales  
**Institución:** Tecsup — Sección 4 - C24 - Sección CD  
**Docente:** Yunior Bestard Aroche  
**Estudiante:** Jesús Enrique Rocha Bobadilla  
**Repositorio:** https://github.com/Jesus-Rocha-B/Laboratorio10_Django  

---

## 🎯 1. Objetivo del Laboratorio 10

Evolucionar la interfaz de **UrbanTrend** desarrollada en React + Vite (Semana 9), aplicando el principio de diseño de **descomposición en componentes reutilizables**. 

En lugar de concentrar toda la estructura visual, datos mockeados y lógica en un único archivo monolítico (`App.jsx`), el proyecto se modulariza en componentes atómicos e independientes dentro de `src/components/`, separando los datos a `src/datos.js` y permitiendo un código desacoplado, mantenible y escalable.

---

## 🧩 2. Ejercicio 1 — Recuperación del Proyecto e Identificación de Componentes

### 2.1 Estructura Modular y Separación de Datos
1. Se recuperó la carpeta `frontend/` y se verificó el correcto funcionamiento de las dependencias (`npm install`, `npm run dev`, `npm run build`).
2. Se creó el directorio `src/components/` destinado a albergar los nuevos componentes de la aplicación.
3. Se extrajeron los arreglos de datos mockeados (`prendas`, `pedidos`, `materiales`, `proveedores`, `despachos`) y las funciones de cálculo (`costoDespacho`, `totalPedido`) desde `App.jsx` hacia un archivo dedicado: `src/datos.js`.
4. En `App.jsx` se reemplazaron los datos en duro mediante importaciones limpias desde `./datos`.

### 2.2 Tres Candidatos a Componentes Identificados en `App.jsx`

| Candidato | Tipo de Componente | Fragmento Identificado en `App.jsx` | Justificación Técnica de la Elección |
| :--- | :--- | :--- | :--- |
| **1. `PrendaCard`** (o `MaterialCard`) | **Tarjeta de Registro Individual** | Líneas donde se renderiza cada `<li>` de prenda con nombre, marca, talla, precio formateado y badges condicionales de stock (`Agotado`, `Stock: n`, `¡Últimas unidades!`). | **Responsabilidad única y reutilización visual:** Aísla la lógica de renderizado condicional de los estados de inventario. Al recibir el objeto `prenda` por `props`, el componente puede reutilizarse en cualquier sección (catálogo, ofertas, favoritos) sin duplicar código ni ensuciar el componente padre. |
| **2. `DetallePedidoItem`** (o `DetalleDespachoItem`) | **Detalle de Relación Anidada (1:N / N:M)** | Líneas que renderizan cada ítem dentro de la sublista de un pedido (`cantidad × prenda — subtotal calculado`). | **Encapsulamiento de cálculo de línea:** Desacopla la entidad débil de la cabecera del pedido. Centraliza la fórmula `cantidad * precio_unitario` y el formateo a 2 decimales, facilitando que a futuro se agreguen promociones, badges de descuento o controles de edición sin afectar la tarjeta principal. |
| **3. `PedidoCard`** (o `ListaRegistros`) | **Contenedor de Relación con Total Agregado** | Bloque completo de la orden con su código, cliente, estado, sublista de detalles y cálculo del importe total (`totalPedido(pedido)`). | **Composición y abstracción de agregados:** Agrupa la cabecera y el detalle en una unidad lógica con borde y estilos propios (`.tarjeta`). Maneja el cálculo del monto acumulado y simplifica `App.jsx`, reduciendo drásticamente su complejidad ciclomática. |

---

## 🧩 3. Ejercicio 2 — Crear el Primer Componente Funcional

1. Se creó el componente `src/components/PrendaCard.jsx` con nombre en mayúscula (`PascalCase`), retornando la estructura JSX de un registro de prenda con exportación por defecto (`export default PrendaCard`).
2. Se importó en `App.jsx` y se renderizó dos veces consecutivas para verificar el ciclo de vida e instanciación de componentes independientes en React.
3. **Regla de nomenclatura en JSX:** Se documentó que si el componente se nombra en minúscula (`<prendaCard />`), el compilador de JSX lo interpreta erróneamente como una etiqueta nativa de HTML5 no estándar (`document.createElement('prendacard')`), omitiendo la invocación a la función de JavaScript.

---

## 🧩 4. Ejercicio 3 — Pasar Datos con Props y Armar la Lista

1. **Desestructuración y Valores por Defecto en `PrendaCard.jsx`:**
   * Se modificó `PrendaCard` para recibir `{ nombre, marca = 'UrbanTrend', talla = 'Estándar', precio = '0.00', stock = 0 }`.
   * Si una prenda no tiene stock o marca definida, se le asigna el valor por defecto gracias a los parámetros por defecto de ES6 (`stock = 0`, `marca = 'UrbanTrend'`).
2. **Creación del Componente de Colección `PrendaList.jsx`:**
   * Se creó `src/components/PrendaList.jsx` que recibe el arreglo `prendas` por props.
   * Renderiza el estado vacío si el arreglo no tiene registros (`prendas.length === 0`).
   * Itera la colección mediante `.map()` y asigna la propiedad requerida `key={prenda.id}` a cada elemento `<PrendaCard />`.
3. **Integración en `App.jsx`:**
   * Se reemplazó el bucle de prendas en `App.jsx` por `<PrendaList prendas={prendas} />`.
   * Se agregó un caso de prueba independiente con `<PrendaCard nombre="Polera Básica Urban Sample" precio="79.90" />` para evidenciar visualmente el funcionamiento de los valores por defecto (marca="UrbanTrend", talla="Estándar" y badge="Agotado").

---

## 🧩 5. Ejercicio 4 — Componente Contenedor con Children

1. **Creación de `src/components/Tarjeta.jsx`:**
   * Recibe `{ titulo, children }`.
   * Encapsula un marco visual consistente con estilos, encabezado condicional y un contenedor interno para renderizar cualquier elemento JSX recibido entre las etiquetas de apertura y cierre.
2. **Equivalencia con Django Templates (Semana 6):**
   * En los Templates de Django, el contenedor base utiliza la etiqueta de bloque `{% block content %} ... {% endblock %}` dentro de una plantilla padre (`base.html`). Las plantillas hijas usan `{% extends 'base.html' %}` para inyectar su propio HTML dentro de ese bloque.
   * En React, la prop especial `children` cumple exactamente el mismo rol de **ranura de inserción (slot)**: todo lo colocado entre `<Tarjeta>` y `</Tarjeta>` es inyectado dentro del componente en el lugar donde se renderiza `{children}`.

---

## 🧩 6. Ejercicio 5 — Componentes dentro de Componentes: Relación 1:N

1. **Componente Anidado `src/components/DetallePedidoItem.jsx`:**
   * Representa cada línea de compra dentro de un pedido.
   * Recibe `{ prenda, cantidad, precioUnitario }` y calcula internamente el subtotal: `(cantidad * Number(precioUnitario)).toFixed(2)`.
2. **Componente Padre `src/components/PedidoCard.jsx`:**
   * Modela la cabecera del pedido (1:N) recibiendo `{ codigo, cliente, estado, detalles }`.
   * Realiza el cálculo del total general acumulado mediante JavaScript con `reduce()`.
   * Mapea el arreglo de detalles instanciando `<DetallePedidoItem key={d.id} prenda={d.prenda_nombre} cantidad={d.cantidad} precioUnitario={d.precio_unitario} />`, adaptando los nombres de campos de la API (`snake_case`) a props de componentes (`camelCase`).
3. **Inmutabilidad de las Props (¿Por qué no deben modificarse?):**
   * React exige que los componentes actúen como **funciones puras** respecto a sus props. Las props fluyen unidireccionalmente desde el padre hacia los hijos y pertenecen exclusivamente al padre.
   * Si un componente intenta mutar una prop directamente (`props.cantidad = 10`), el motor de React (que congela los objetos con `Object.freeze`) lanza la excepción:  
     `TypeError: Cannot assign to read only property 'cantidad' of object '#<Object>'`.

---

## 🧩 7. Ejercicio 6 — Agregar Estado y un Evento de Clic

1. **Implementación de Estado Local con `useState`:**
   * En `src/components/PrendaCard.jsx`, se agregó el hook `const [contador, setContador] = useState(0)` para gestionar las unidades agregadas de forma individual e independiente en cada tarjeta.
2. **Desactivación Condicional del Botón:**
   * Se configuró el atributo `disabled={stock === 0 || contador >= stock}`. Cuando una prenda no tiene existencias (`stock === 0`) o se alcanza el límite disponible, el botón se bloquea automáticamente evitando selecciones inválidas.
3. **Renderizado Condicional del Valor:**
   * El indicador visual solo se dibuja en pantalla cuando el valor es estrictamente mayor que cero mediante el operador lógico: `{contador > 0 && <span>Seleccionados: {contador}</span>}`.
4. **Aislamiento de Estado entre Componentes:**
   * Al interactuar con el botón de una prenda (ej. *Polo Oversize*), su contador se incrementa sin alterar el estado de las demás prendas, comprobando que cada instancia mantiene su propio ámbito de memoria en React.
5. **¿Por qué una variable normal (`let`) no actualiza la pantalla?:**
   * React no monitoriza cambios directos en variables convencionales de JavaScript en memoria. No existe un disparador (*trigger*) que le ordene volver a ejecutar la función del componente ni re-renderizar el Virtual DOM.
   * Además, si el componente se re-renderizara por otro motivo externo, la función se volvería a ejecutar de arriba hacia abajo y la variable `let contador = 0` se reiniciaría a cero, perdiendo el valor previo. `useState` garantiza la persistencia del dato a través de los ciclos de renderizado y notifica a React para actualizar la vista.

---

## 📁 8. Estructura del repositorio

```text
Laboratorio10_Django/
├── README.md             # Documentación principal del Laboratorio 10
├── requirements.txt      # Dependencias del backend (Django y DRF)
├── docs/
│   └── LABORATORIO08.md  # Documentación de la API REST del laboratorio anterior
├── src/                  # Backend Django del Laboratorio 08
└── frontend/             # Interfaz modular React + Vite (Laboratorio 10)
    ├── index.html        # Contenedor raíz donde monta React
    ├── package.json      # Dependencias y scripts (dev, build, lint)
    ├── vite.config.js
    └── src/
        ├── main.jsx      # Punto de entrada de la aplicación
        ├── App.jsx       # Componente principal simplificado
        ├── App.css       # Estilos visuales de la aplicación
        ├── datos.js      # Datos mockeados y funciones de utilidad extraídas
        └── components/   # Directorio para los componentes reutilizables
            ├── Tarjeta.jsx           # Contenedor visual reutilizable con prop children
            ├── PrendaCard.jsx        # Tarjeta de prenda con estado local useState y botón
            ├── PrendaList.jsx        # Lista que mapea prendas usando key={prenda.id}
            ├── PedidoCard.jsx        # Relación 1:N con total acumulado vía reduce()
            └── DetallePedidoItem.jsx # Elemento anidado con cálculo de subtotal
```

---

## 💻 9. Instalación y Ejecución del Frontend

Requiere Node.js (versión LTS) y npm:

```bash
cd frontend
npm install      # Instala las dependencias
npm run dev      # Inicia el servidor de desarrollo en http://localhost:5173/
```

Otros comandos de validación:
```bash
npm run build    # Compila la versión para producción en dist/
npm run lint     # Analiza el código con oxlint
```
