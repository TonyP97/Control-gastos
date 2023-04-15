import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
      {
        filtro ? (
          <>
          <h1>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos en esta Categoría'}</h1>
          {gastosFiltrados.map(gasto => (
            <Gasto 
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
            />
          ))}
          </>
        ) : (
          <>
          <h1>{gastos.length ? 'Gastos' : 'No hay Gastos aún'}</h1>
          {gastos.map(gasto => (
            <Gasto 
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
            />
          ))}
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos
