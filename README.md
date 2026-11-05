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

## 📁 4. Estructura del repositorio

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
            └── PrendaCard.jsx # Primer componente funcional independiente
```

---

## 💻 5. Instalación y Ejecución del Frontend

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
