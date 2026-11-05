# Laboratorio 10 — React + Vite: Componentes, Props, Estado y Eventos

**Estudiante:** Jesús Enrique Rocha Bobadilla  
**Curso:** Desarrollo de Aplicaciones Empresariales  
**Institución:** Tecsup  
**Repositorio:** `Laboratorio10_Django`  
**Tecnologías:** React 19, Vite, JavaScript (ES6+), CSS3, Oxlint, Django REST Framework  

---

## 📋 Resumen del Laboratorio

En este laboratorio se modularizó la interfaz monolítica construida en el Laboratorio 09, separando la lógica y presentación en componentes funcionales reutilizables, gestionando el flujo de datos mediante **props**, implementando interactividad y reactividad con el hook **`useState`**, controlando eventos del usuario (`onClick`, `onChange`, `onSubmit`), aplicando inmutabilidad en arreglos y validando reglas de negocio heredadas del backend en **Django REST Framework (Semana 8)**.

El trabajo se divide en dos secciones obligatorias:
1. **Parte 1 — Tienda Comercial Streetwear (`store`):** Prendas, Pedidos y Detalles de Pedido.
2. **Parte 2 — Investigación Propia: Logística e Insumos Textiles (`logistics`):** Materiales textiles, Proveedores, Órdenes de Despacho y Detalles de Despacho.

---

## 🧩 1. Ejercicio 1 — Separar datos en archivo `datos.js`

* Se creó el archivo `src/datos.js` conteniendo los arreglos de datos iniciales (`prendas`, `pedidos`, `materiales`, `proveedores`, `despachos`) y las funciones de utilidad (`formatearPrecio`, `formatearFecha`).
* Se exportaron usando sintaxis ES Modules (`export const ...`) y se importaron en `App.jsx`, reduciendo drásticamente el tamaño del archivo raíz y aislando los datos mockeados de la capa visual.
* Se configuró el directorio `src/components/` con `.gitkeep` para organizar los componentes funcionales.

---

## 🧩 2. Ejercicio 2 — Crear el primer componente funcional (`PrendaCard.jsx`)

* Se implementó `src/components/PrendaCard.jsx`, el cual representa una tarjeta visual para una prenda.
* Se importó y renderizó dos veces en `App.jsx`, comprobando la reutilización de interfaz.

### ❓ Pregunta teórica: Diferencia entre `<PrendaCard />` y `<prendacard />` en JSX
En JSX (y en la transformación de Babel/Vite a JavaScript):
* **PascalCase (`<PrendaCard />`):** React interpreta que el identificador inicia con mayúscula y lo compila como una referencia a una variable o función JavaScript (`React.createElement(PrendaCard)`). Esto permite invocar la función de nuestro componente.
* **Minúsculas (`<prendacard />`):** React asume que las etiquetas que inician con minúscula son **elementos nativos del DOM de HTML** (`React.createElement('prendacard')`). Al no existir una etiqueta estándar `<prendacard>` en la especificación HTML5, el navegador la creará como un elemento HTML desconocido (`HTMLUnknownElement`), provocando advertencias y la falta de renderizado de la lógica del componente.

---

## 🧩 3. Ejercicio 3 — Pasar datos mediante props

* Se modificó `PrendaCard.jsx` para recibir props desestructuradas: `{ nombre, marca = 'UrbanTrend', talla = 'Estándar', precio, stock = 0 }`.
* Se definieron **valores por defecto** para `marca`, `talla` y `stock`, evitando errores `undefined` y garantizando renderizados consistentes cuando el llamador omite propiedades opcionales.
* Se creó `src/components/PrendaList.jsx`, el cual recibe un arreglo `prendas` por props y lo recorre con `.map()`, asignando `key={prenda.id}` a cada elemento.

### ❓ Pregunta teórica: ¿Por qué es obligatorio asignar `key` en listas de React?
React utiliza un algoritmo de reconciliación (*Virtual DOM Diffing*) para identificar con rapidez qué elementos han cambiado, se han agregado o eliminado.
* La prop `key` proporciona una **identidad única y persistente** a cada elemento de la colección entre re-renderizados.
* Si no se proporciona `key` (o si se usa el índice del arreglo y la lista se reordena/filtra), React debe comparar y re-renderizar todos los nodos hijos del DOM ciegamente, degradando el rendimiento y provocando inconsistencias con estados locales o entradas de formulario.

---

## 🧩 4. Ejercicio 4 — Componente contenedor con `children`

* Se creó `src/components/Tarjeta.jsx`, un componente contenedor que recibe `{ titulo, children }`.
* Envuelve contenido dinámico con un encabezado temático y estilos unificados de tarjeta.
* En `App.jsx`, se utilizó `<Tarjeta titulo="...">` para envolver la prenda destacada y el insumo crítico.

### ❓ Pregunta teórica: ¿A qué concepto de Django Templates equivale la prop `children`?
La prop `children` de React equivale al mecanismo de **bloques de herencia de plantillas (`{% block content %} ... {% endblock %}`)** en Django Templates:
* En Django, la plantilla base define un hueco con `{% block nombre %}` que las plantillas hijas rellenan.
* En React, `Tarjeta` define la estructura contenedora general y coloca `{children}` donde se inyectará cualquier contenido JSX proporcionado entre las etiquetas de apertura y cierre (`<Tarjeta>...</Tarjeta>`).

---

## 🧩 5. Ejercicio 5 — Componente para la relación 1:N

* Se construyó `src/components/DetallePedidoItem.jsx` para representar cada ítem dentro de un pedido, calculando el subtotal (`cantidad * precioUnitario`).
* Se construyó `src/components/PedidoCard.jsx` para representar la cabecera del pedido (código, cliente, estado) e iterar sus detalles anidados, calculando el total del pedido mediante `.reduce()`.
* Se adaptaron los nombres de campos del backend DRF (`cliente_nombre` → `cliente`, `precio_unitario` → `precioUnitario`, etc.).

### ❓ Pregunta teórica: ¿Qué sucede si un componente hijo intenta modificar una prop directamente (`props.valor = 10`)?
En React, las props son estrictamente de **sólo lectura (inmutables)**. React congela el objeto de propiedades (`Object.freeze(props)`) en modo estricto.
* Si se intenta mutar directamente una prop (`props.valor = 10`), JavaScript lanzará un error de tipo en tiempo de ejecución:  
  `TypeError: Cannot assign to read only property 'valor' of object '#<Object>'`
* Esta regla garantiza el flujo unidireccional de datos (*one-way data binding*), evitando que un componente hijo altere silenciosamente el estado de su padre o de componentes hermanos.

---

## 🧩 6. Ejercicio 6 — Agregar estado local con `useState` y un evento

* En `PrendaCard.jsx` se añadió el hook `const [contador, setContador] = useState(0)`.
* Se agregó un botón interactivo `+ Agregar al carrito` con un manejador `onClick={() => setContador(c => c + 1)}`.
* El botón se deshabilita automáticamente cuando `stock === 0 || contador >= stock`.
* Se utilizó renderizado condicional: el badge con el conteo solo aparece si `contador > 0`.

### ❓ Pregunta teórica: ¿Por qué una variable local `let contador = 0` no funciona para actualizar la pantalla?
1. **Pérdida de valor:** Cada vez que un componente se ejecuta (re-renderiza), todas las variables locales declaradas con `let` se vuelven a inicializar desde cero.
2. **Falta de reactividad:** React no escucha la mutación directa de variables locales. Al ejecutar `contador++`, React no es notificado de ningún cambio y no desencadena el ciclo de reconciliación ni actualiza el DOM real.
3. **El rol de `useState`:** `useState` preserva el valor en la estructura interna de fibras de React (*Fiber Node*) entre renderizados sucesivos y su despachador (`setContador`) notifica a React para programar una actualización de la interfaz en pantalla.

---

## 🧩 7. Ejercicio 7 — Campo controlado que filtra la lista

* En `PrendaList.jsx` se agregó un estado controlado `const [busqueda, setBusqueda] = useState('')`.
* El `<input>` utiliza `value={busqueda}` y `onChange={(e) => setBusqueda(e.target.value)}`.
* Se implementó filtrado en tiempo real sin distinguir mayúsculas ni minúsculas usando `.toLowerCase().includes(...)`.
* Si ningún registro coincide, se renderiza un mensaje: `"No se encontraron prendas que coincidan con '[término]'."`

### 🔎 Evidencias de Búsqueda:
1. **Búsqueda 1 ("polo"):**
   * Entrada: `polo`
   * Resultado: Muestra únicamente *"Polo Oversize Acid Wash"* y *"Polo Boxy Heavyweight"*.
2. **Búsqueda 2 ("hoodie"):**
   * Entrada: `hoodie`
   * Resultado: Muestra únicamente *"Hoodie Crop Streetwear"*.
3. **Búsqueda sin coincidencias ("zapatos"):**
   * Entrada: `zapatos`
   * Resultado: Se oculta la lista y se muestra: `"No se encontraron prendas que coincidan con 'zapatos'."`

---

## 🧩 8. Ejercicio 8 — Formulario controlado con `onSubmit` y validación

* Se creó `src/components/PrendaForm.jsx` con 4 campos controlados (`nombre`, `precio`, `stock`, `talla`).
* Manejo del evento con `onSubmit={handleSubmit}` y `e.preventDefault()`.
* **Regla de Validación (DRF Semana 8):** El precio debe ser mayor a cero (`precioNum > 0.00`). Si no se cumple, se muestra:  
  `⚠️ Error: El precio debe ser mayor que cero (S/ 0.00), según la regla de la API.`
* **Actualización Inmutable:** En `App.jsx`, se eleva el estado con `useState(prendasIniciales)` y se agrega el nuevo registro con el operador spread:  
  `setListaPrendas(prev => [...prev, nuevaPrenda])`, sin usar `.push()`.
* **Limpieza de campos:** Todos los campos se resetean a su estado inicial tras un envío exitoso.

---

## 🧩 9. PARTE 2 — Investigación Propia: Logística Textil (`logistics`)

### 9.1 Ejercicio 9 — Tabla de Equivalencias de la Investigación Propia

| Concepto Requerido | Elemento en Logística (`logistics`) | Componente Implementado | Regla de Negocio / Comportamiento |
| :--- | :--- | :--- | :--- |
| **Componente de Registro Individual** | Insumo Textil (`Material`) | `MaterialCard.jsx` | Muestra material, categoría, unidad de medida, precio unitario y badges condicionales de stock (`Sin stock` o `Stock bajo`). |
| **Botón con Estado (`useState` + `onClick`)** | Reserva de muestra de tela | Botón en `MaterialCard.jsx` | Incrementa un contador de metros/unidades reservadas. Se deshabilita si `stock === 0` o si se agota la disponibilidad. |
| **Componente de Relación Anidada (N:M)** | Orden de Despacho y sus Detalles (`OrdenDespacho` ↔ `DetalleDespacho`) | `DespachoCard.jsx` + `DetalleDespachoItem.jsx` | `DespachoCard` gestiona la cabecera e itera cada material con `DetalleDespachoItem`, calculando el costo total del envío vía `reduce()`. |
| **Campo de Búsqueda Controlado** | Filtro de Insumos Textiles | `MaterialList.jsx` | Input controlado (`value` y `onChange`) que filtra materiales por nombre o categoría sin distinguir mayúsculas. |
| **Formulario Controlado con Validación** | Registro de Nuevo Insumo Textil | `MaterialForm.jsx` | Formulario controlado (`onSubmit` + `preventDefault`) con 5 campos (`nombre`, `categoria`, `unidad_medida`, `precio_unitario`, `stock`). |
| **Regla de Validación de la API (Semana 8)** | `validate_precio_unitario` y `validate_stock` de DRF | Validación en `MaterialForm.jsx` | El precio unitario debe ser estrictamente mayor a cero (`precio_unitario > 0.00`) y el stock no puede ser negativo (`stock >= 0`). |

---

## 🧩 10. Ejercicio 10 — Componentes y Props de la Investigación Propia

Se desarrollaron y modularizaron cinco componentes en archivos independientes dentro de `src/components/`:
1. **`MaterialCard.jsx`:** Componente funcional para el registro individual de insumos textiles. Desestructura props con valores por defecto (`categoria = 'Insumos Textiles'`, `unidadMedida = 'Metros'`, `stock = 0`).
2. **`MaterialList.jsx`:** Componente de lista que recibe la colección `materiales` y renderiza cada `MaterialCard` usando `.map()` y `key={material.id}`.
3. **`DetalleDespachoItem.jsx`:** Componente anidado que muestra la línea de material, cantidad y subtotal dentro de una orden de despacho.
4. **`DespachoCard.jsx`:** Componente contenedor de relación que renderiza la orden de despacho (código, sucursal de destino, transportista, estado) e itera sus materiales despachados llamando a `DetalleDespachoItem`.
5. **Uso de `Tarjeta` con `children`:** En `App.jsx`, se utilizó el contenedor `Tarjeta` para destacar el insumo crítico de producción (*Tela Algodón Pima 50/1 Negro*).

---

## 🧩 11. Ejercicio 11 — Estado, Eventos y Buscador en la Investigación Propia

### 11.1 Botón con Estado en `MaterialCard.jsx` (Antes y Después)
* **Antes del clic:**
  * Estado local: `reservado = 0`.
  * Vista: El botón muestra `+ Reservar muestra` y no hay badges de reserva activos.
* **Acción de clic:**
  * El usuario hace clic sobre el botón en el insumo *"Tela Algodón Pima 50/1 Negro"*.
* **Después del clic:**
  * Estado local: `reservado = 1`.
  * Vista: Aparece en color verde el aviso: `Muestras reservadas: 1 metros`.
  * Clics sucesivos incrementan el valor (`2 metros`, `3 metros`). Si el stock de almacén es `0` (como en *"Cono Hilo Poliéster"*), el botón se renderiza bloqueado (`disabled`) con el texto `Sin stock`.

### 11.2 Campo de Búsqueda Controlado en `MaterialList.jsx` (Antes y Después)
* **Antes de la búsqueda (Estado inicial):**
  * Input: `busqueda = ""`
  * Vista: Se muestran los 5 insumos textiles disponibles en el catálogo.
* **Búsqueda 1 ("pima" o "algodón"):**
  * Entrada: `pima`
  * Vista filtrada: Únicamente se renderiza la tarjeta de la *"Tela Algodón Pima 50/1 Negro"*.
* **Búsqueda 2 ("cierre"):**
  * Entrada: `cierre`
  * Vista filtrada: Únicamente se renderiza la tarjeta del *"Cierre Metálico N° 5 Niquelado 60cm"*.
* **Búsqueda sin coincidencias ("cuero"):**
  * Entrada: `cuero`
  * Vista: La lista de insumos se oculta y aparece el aviso:  
    `No se encontraron insumos textiles que coincidan con "cuero".`

---

## 🧩 12. Ejercicio 12 — Relación Anidada y Formulario en la Investigación Propia

### 12.1 Relación Anidada con un Componente dentro de Otro (Modelo Intermedio N:M)
En el módulo de logística (`logistics`), la relación entre una **Orden de Despacho** (`OrdenDespacho`) y los **Materiales Textiles** (`Material`) se articula a través del modelo intermedio **`DetalleDespacho`** (el cual registra cantidad despachada, costo unitario histórico y lote de producción).

Esta relación se implementó mediante dos componentes anidados:
1. **Componente Padre / Contenedor (`src/components/DespachoCard.jsx`):**
   * Recibe las propiedades de la cabecera: `{ codigo, sucursal, transportista, estado, detalles = [] }`.
   * Calcula el costo total del envío acumulando los subtotales con `.reduce()`:
     ```jsx
     const costoTotal = detalles.reduce(
       (acum, d) => acum + d.cantidad_despachada * Number(d.costo_unitario_historico),
       0
     ).toFixed(2)
     ```
   * Itera la lista de detalles y renderiza una instancia de `DetalleDespachoItem` por cada elemento con `key={d.id}`.

2. **Componente Hijo Anidado (`src/components/DetalleDespachoItem.jsx`):**
   * Recibe `{ material, cantidad, costoUnitario, lote }`.
   * Calcula el subtotal individual (`cantidad * costoUnitario`) y renderiza la línea de detalle:
     ```jsx
     function DetalleDespachoItem({ material, cantidad, costoUnitario, lote }) {
       const subtotal = (cantidad * Number(costoUnitario)).toFixed(2)
       return (
         <li>
           {cantidad} × {material} ({lote}) — S/ {subtotal}
         </li>
       )
     }
     ```

---

### 12.2 Formulario Controlado con `onSubmit`, `preventDefault` y Validación (`MaterialForm.jsx`)
Se implementó `src/components/MaterialForm.jsx` para dar de alta nuevos insumos textiles en el inventario:
* **Campos Controlados:** Se enlazan mediante `value` y `onChange` vinculados a estados locales individuales (`nombre`, `categoria`, `unidadMedida`, `precioUnitario`, `stock`).
* **Envío Seguro:** Se intercepta el evento del formulario con `onSubmit={handleSubmit}` y se invoca `e.preventDefault()` para cancelar la recarga estándar del navegador.
* **Inserción Inmutable:** Al validar exitosamente, se comunica con `App.jsx` mediante el prop callback `onAgregarMaterial(nuevoMaterial)`. El estado se actualiza inmutablemente:
  ```jsx
  const handleAgregarMaterial = (nuevoMaterial) => {
    setListaMateriales((prev) => [...prev, nuevoMaterial])
  }
  ```
  Cumpliendo estrictamente con la regla de React de no mutar arreglos con `.push()`.
* **Limpieza de Campos:** Tras agregar el registro, se restablecen los inputs a su estado inicial (`setNombre('')`, `setPrecioUnitario('')`, etc.).

---

### 12.3 Documentación de Envíos: Válido e Inválido

#### ✅ Caso 1: Envío Válido
* **Datos ingresados en el formulario:**
  * **Nombre del Insumo:** `Tela Rib 2x1 Algodón Peinado`
  * **Categoría:** `Telas y Tejidos`
  * **Unidad de Medida:** `Metros`
  * **Precio Unitario (S/):** `28.50`
  * **Stock en Almacén:** `120`
* **Comportamiento y Resultado:**
  1. Las validaciones se ejecutan correctamente sin interrupción.
  2. El nuevo insumo se incorpora al final del inventario renderizado por `MaterialList.jsx` mostrando su precio de `S/ 28.50`, stock de `120 metros` y botón interactivo `+ Reservar muestra`.
  3. Los campos del formulario se limpian de inmediato.
  4. Se muestra el mensaje visual de éxito en verde:  
     `✅ ¡Insumo textil registrado en el inventario con éxito!`

#### ❌ Caso 2: Envío Inválido (Regla DRF Semana 8: `validate_precio_unitario > 0.00`)
* **Datos ingresados en el formulario:**
  * **Nombre del Insumo:** `Hilo Mercerizado Calibre 40`
  * **Precio Unitario (S/):** `0.00` (o valor negativo `-5.00`)
  * **Stock en Almacén:** `50`
* **Comportamiento y Resultado:**
  1. La validación `precioNum <= 0` intercepta el guardado ejecutando `return`.
  2. No se altera la lista de materiales ni se re-renderizan los registros existentes.
  3. Se mantiene el texto en los campos para corrección y se muestra el mensaje de error en rojo:  
     `⚠️ Error: El precio unitario debe ser mayor que cero (S/ 0.00), según la regla de la API.`

#### ❌ Caso 3: Envío Inválido (Regla DRF Semana 8: `validate_stock >= 0`)
* **Datos ingresados en el formulario:**
  * **Nombre del Insumo:** `Etiqueta Tejida Satinada`
  * **Precio Unitario (S/):** `1.20`
  * **Stock en Almacén:** `-10`
* **Comportamiento y Resultado:**
  1. La validación `stockNum < 0` intercepta el guardado.
  2. Se cancela la inserción y se despliega el mensaje de error:  
     `⚠️ Error: El stock en almacén no puede ser negativo, según la regla de la API.`

---

## 🧩 13. Ejercicio 13 — Verificar la Interfaz de la Investigación Propia

### 13.1 Verificación de la Consola del Navegador (0 Advertencias)
Se inspeccionó la consola de desarrollo de React en el navegador para comprobar la ausencia de advertencias comunes:
1. **Ausencia de advertencias sobre `key`:**
   * React advierte: `Warning: Each child in a list should have a unique "key" prop.`
   * **Verificación:** Todos los iteradores `.map()` en la aplicación (`materialesFiltrados.map()`, `prendasFiltradas.map()`, `pedidos.map()`, `detalles.map()`, `despachos.map()`, `proveedores.map()`) definen una clave unívoca y persistente basada en identificadores únicos de base de datos (`key={m.id}`, `key={prenda.id}`, `key={d.id}`, etc.). No se utilizaron índices del arreglo.
2. **Ausencia de advertencias sobre campos con `value` sin `onChange`:**
   * React advierte: `Warning: You provided a 'value' prop to a form field without an 'onChange' handler. This will render a read-only field.`
   * **Verificación:** Todos los campos de entrada (`<input>`, `<select>`) en `PrendaForm.jsx`, `MaterialForm.jsx`, `PrendaList.jsx` y `MaterialList.jsx` están estrictamente controlados mediante parejas bidireccionales `value={estado}` y `onChange={(e) => setEstado(e.target.value)}`. No existen campos desatendidos o de sólo lectura accidental.

---

### 13.2 Ejecución de `npm run lint` (`oxlint`)
Se ejecutó el analizador estático de código configurado en el proyecto (`oxlint`):

```bash
> frontend@0.0.0 lint
> oxlint

Found 0 warnings and 0 errors.
Finished in 17ms on 15 files with 104 rules using 12 threads.
```
* **Resultado:** 0 advertencias, 0 errores en los 15 archivos fuente del frontend.

---

### 13.3 Ejecución de `npm run build` (`vite build`)
Se ejecutó la compilación de producción para validar la transformación de JSX a JavaScript estándar y la generación de activos:

```bash
> frontend@0.0.0 build
> vite build

vite v8.3.4 building client environment for production...
transforming...
✓ 29 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.47 kB │ gzip:  0.30 kB
dist/assets/index-BN3Zpx6x.css    0.58 kB │ gzip:  0.34 kB
dist/assets/index-BbWax_FM.js   239.70 kB │ gzip: 73.26 kB

✓ built in 131ms
```
* **Resultado:** Compilación exitosa de los 29 módulos sin errores sintácticos, de importación o de empaquetado.

---

### 13.4 Comprobación de que `node_modules` y `dist` NO están en el repositorio
Se verificó mediante Git que los directorios pesados y generados automáticamente no forman parte del control de versiones:

1. **Consulta con `git ls-files`:**
   ```bash
   git ls-files "*node_modules*" "*dist*"
   # (Salida vacía: confirma que ningún archivo de node_modules o dist está rastreado)
   ```
2. **Consulta con `git check-ignore`:**
   ```bash
   git check-ignore frontend/node_modules frontend/dist
   # Salida:
   # frontend/node_modules
   # frontend/dist
   ```
3. **Reglas de exclusión en `.gitignore`:**
   Tanto en `frontend/.gitignore` como en el archivo raíz `.gitignore`, se encuentran explícitamente declaradas las directivas:
   ```gitignore
   node_modules/
   dist/
   dist-ssr/
   frontend/node_modules/
   frontend/dist/
   ```

---

## ✅ 14. Checklist Obligatorio Antes de Continuar — Parte 2

A continuación se detalla la verificación de cada uno de los 9 criterios exigidos en la guía del laboratorio:

| # | Criterio de Evaluación | Verificación Requerida | Estado | Evidencia de Implementación en el Proyecto |
| :-: | :--- | :--- | :---: | :--- |
| **1** | Existen al menos tres componentes funcionales, cada uno en su archivo dentro de `src/components`, con nombre en mayúscula. | Estructura de carpetas + código. | ✅ **CUMPLIDO** | Creados 5 componentes en PascalCase: `MaterialCard.jsx`, `MaterialList.jsx`, `DespachoCard.jsx`, `DetalleDespachoItem.jsx` y `MaterialForm.jsx`. |
| **2** | Los datos llegan a los componentes por `props` desestructuradas, y hay un valor por defecto o un uso de `children`. | Código de los componentes. | ✅ **CUMPLIDO** | `MaterialCard.jsx` usa props desestructuradas con defaults (`categoria = 'Insumos Textiles'`, `unidadMedida = 'Metros'`, `stock = 0`); `App.jsx` utiliza `Tarjeta` con `children`. |
| **3** | Una lista de componentes se muestra con `map()` y `key` en el componente. | Código + captura. | ✅ **CUMPLIDO** | `MaterialList.jsx` itera la colección con `materiales.map(m => <MaterialCard key={m.id} ... />)`; `despachos.map()` en `App.jsx`. |
| **4** | Una relación 1:N o N:M se muestra con un componente dentro de otro componente. | Código + captura. | ✅ **CUMPLIDO** | `DespachoCard.jsx` renderiza instancias anidadas de `DetalleDespachoItem.jsx` para mostrar los materiales asignados a cada despacho. |
| **5** | Un componente tiene estado con `useState` y un evento `onClick` que lo cambia. | Capturas antes y después del clic. | ✅ **CUMPLIDO** | `MaterialCard.jsx` maneja el estado `reservado` con botón `+ Reservar muestra` y evento `onClick`, bloqueándose al agotar stock. |
| **6** | Un campo controlado (`value` y `onChange`) filtra la lista. | Capturas de dos búsquedas. | ✅ **CUMPLIDO** | `MaterialList.jsx` implementa input controlado `busqueda` que filtra por nombre o categoría sin distinguir mayúsculas, con mensaje de no coincidencias. |
| **7** | Un formulario controlado con `onSubmit` y `preventDefault` agrega un registro sin modificar el arreglo y valida una regla con mensaje de error. | Capturas del envío válido y del inválido. | ✅ **CUMPLIDO** | `MaterialForm.jsx` valida `precio_unitario > 0` y `stock >= 0`, limpia campos tras éxito y actualiza `listaMateriales` con spread operator. |
| **8** | La consola del navegador no muestra advertencias y `npm run lint` y `npm run build` terminan sin errores. | Capturas de la consola y de la terminal. | ✅ **CUMPLIDO** | `oxlint` validó 15 archivos con 0 errores y 0 warnings; `vite build` compiló los 29 módulos limpiamente en `dist/`. |
| **9** | Se explica por escrito qué resuelven las `props` y el `estado`, y qué falta para guardar los datos en la base de datos de Django. | Párrafo de justificación. | ✅ **CUMPLIDO** | Justificación detallada redactada en la Sección 15 de este documento. |

---

## 💡 15. Justificación Teórica: Props, Estado y Persistencia en Django (Criterio 9)

### 15.1 ¿Qué resuelven las `props`?
Las **`props` (propiedades)** resuelven la **comunicación unidireccional y jerárquica de datos** (*top-down* o de componente padre a componente hijo) en la arquitectura de React. Permiten que los componentes sean funciones puras, altamente reutilizables y desacoplados de la lógica de negocio central:
* Permiten parametrizar componentes visuales (`MaterialCard`, `PrendaCard`, `Tarjeta`) para que muestren distinta información según los datos suministrados por el componente superior (`App`).
* Son de **sólo lectura (inmutables)**, lo que impide que un componente hijo altere por error los datos del padre o de componentes vecinos, garantizando la predictibilidad y estabilidad del flujo de información en la aplicación.

### 15.2 ¿Qué resuelve el `estado` (`useState`)?
El **`estado` (`useState`)** resuelve la **reactividad, el dinamismo y la persistencia de datos temporales en memoria** dentro del ciclo de vida de la aplicación:
* A diferencia de las variables locales comunes de JavaScript (que se destruyen y reinician en cada renderizado), las variables de estado se almacenan en los nodos internos del árbol de fibras de React (*Fiber Tree*).
* Al invocar la función actualizadora (`setState`), React detecta la necesidad de un nuevo ciclo de reconciliación, compara el *Virtual DOM* con el DOM del navegador y actualiza únicamente los nodos específicos que cambiaron, permitiendo una experiencia de usuario fluida sin recargas completas de página (*Single Page Application*).

### 15.3 ¿Qué falta para guardar los datos en la base de datos de Django?
Actualmente, los registros añadidos mediante los formularios `PrendaForm` y `MaterialForm` se almacenan **únicamente en la memoria RAM del navegador** (dentro del estado de React). Si el usuario refresca la página (`F5`), los nuevos registros desaparecen y la aplicación vuelve a cargar la lista base de `datos.js`.

Para que los datos se guarden permanentemente en la base de datos de Django (SQLite/PostgreSQL), se requiere implementar la integración de cliente-servidor mediante los siguientes cuatro pasos:
1. **Llamadas Asíncronas en el Frontend (`fetch` o `axios`):**  
   Reemplazar la inserción directa en memoria en los manejadores `handleSubmit` por peticiones HTTP asíncronas con método `POST` dirigidas a los endpoints de la API REST de Django (por ejemplo, `http://localhost:8000/api/materiales/`), enviando la carga útil en formato JSON con cabeceras `Content-Type: application/json`.
2. **Carga Inicial con `useEffect`:**  
   En `App.jsx`, sustituir los datos estáticos de `datos.js` por una consulta `GET` ejecutada al montar el componente (`useEffect(() => { ... }, [])`), sincronizando el estado inicial de React directamente con los registros almacenados en la base de datos.
3. **Configuración de CORS en Django (`django-cors-headers`):**  
   Como el frontend de desarrollo corre en `http://localhost:5173` y el backend de Django corre en `http://localhost:8000`, el navegador bloquearía las peticiones por la política de mismo origen (*Same-Origin Policy*). Se debe instalar `django-cors-headers` en Django, añadir su middleware y configurar `CORS_ALLOWED_ORIGINS = ['http://localhost:5173']` en `settings.py`.
4. **Procesamiento y Persistencia en el Backend (DRF ViewSets y ORM):**  
   El backend recibe la petición en `MaterialViewSet.create()`, valida los tipos y reglas de negocio en `MaterialSerializer.is_valid(raise_exception=True)` y finalmente invoca `serializer.save()`, momento en el cual el ORM de Django ejecuta la sentencia `INSERT INTO logistics_material ...` en la base de datos relacional.

---

## 📁 16. Estructura del Proyecto

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
        ├── App.jsx       # Componente principal unificado
        ├── App.css       # Estilos visuales de la aplicación
        ├── datos.js      # Datos mockeados y funciones de utilidad extraídas
        └── components/   # Directorio de componentes reutilizables
            ├── Tarjeta.jsx              # Contenedor visual reutilizable con prop children
            ├── PrendaCard.jsx           # Tarjeta de prenda con estado useState y botón
            ├── PrendaList.jsx           # Lista de prendas con input controlado de búsqueda
            ├── PrendaForm.jsx           # Formulario controlado de prendas (Semana 8)
            ├── PedidoCard.jsx           # Relación 1:N comercial con total acumulado
            ├── DetallePedidoItem.jsx    # Línea de detalle anidada de pedido
            ├── MaterialCard.jsx         # Tarjeta de insumo textil con reserva de muestra
            ├── MaterialList.jsx         # Lista de insumos con búsqueda en tiempo real
            ├── MaterialForm.jsx         # Formulario controlado de insumos textiles
            ├── DespachoCard.jsx         # Relación N:M de logística con costo total
            └── DetalleDespachoItem.jsx  # Elemento anidado de orden de despacho
```

---

## 💻 17. Instalación y Ejecución del Frontend

Requiere Node.js (versión LTS) y npm:

```bash
cd frontend
npm install      # Instala las dependencias del proyecto
npm run dev      # Inicia el servidor local de desarrollo en http://localhost:5173/
```

### Comandos de Validación Ejecutados:
```bash
# 1. Análisis estático de código (Linter):
npm run lint
# Resultado: oxlint -> 0 errores, 0 warnings en 15 archivos (17ms)

# 2. Compilación de producción (Build):
npm run build
# Resultado: vite build -> 29 módulos transformados exitosamente en dist/ (131ms)
```
