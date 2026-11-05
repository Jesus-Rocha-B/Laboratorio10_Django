function Tarjeta({ titulo, children }) {
  return (
    <div className="tarjeta" style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1' }}>
      {titulo && (
        <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#0f766e', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
          {titulo}
        </h3>
      )}
      <div className="tarjeta-cuerpo">
        {children}
      </div>
    </div>
  )
}

export default Tarjeta
