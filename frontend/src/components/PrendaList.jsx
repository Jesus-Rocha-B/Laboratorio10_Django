import PrendaCard from './PrendaCard'

function PrendaList({ prendas = [] }) {
  if (prendas.length === 0) {
    return <p className="vacio">No hay registros</p>
  }

  return (
    <ul className="lista">
      {prendas.map((prenda) => (
        <PrendaCard
          key={prenda.id}
          nombre={prenda.nombre}
          marca={prenda.marca}
          talla={prenda.talla}
          precio={prenda.precio}
          stock={prenda.stock}
        />
      ))}
    </ul>
  )
}

export default PrendaList
