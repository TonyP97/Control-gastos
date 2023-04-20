import {useEffect, useState } from 'react'
import Mensaje from './Mensaje'
import { handleOnFocus } from '../helpers'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombreGasto, setNombreGasto] = useState('')
    const [cantidadGasto, setCantidadGasto] = useState(0)
    const [categoriaGasto, setCategoriaGasto] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (gastoEditar.id) {
            setNombreGasto(gastoEditar.nombreGasto)
            setCantidadGasto(gastoEditar.cantidadGasto)
            setCategoriaGasto(gastoEditar.categoriaGasto)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (nombreGasto.trim() === '' || cantidadGasto < 1 || categoriaGasto === '') {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000)

            return
        }

        guardarGasto({nombreGasto, cantidadGasto, categoriaGasto, id, fecha})

        ocultarModal()
    }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
            src={CerrarBtn}
            alt="Cerrar modal"
            onClick={ocultarModal}
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"} `}>
        <legend>{gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje} </Mensaje>}

        <div className='campo'>
            <label>Nombre Gasto</label>
                <input
                    type="text"
                    placeholder="Ej. Transporte"
                    value={nombreGasto}
                    onChange={e => setNombreGasto(e.target.value)}
                />
        </div>

        <div className='campo'>
            <label>Cantidad Gasto</label>
                <input
                    type="number"
                    placeholder="Ej. 300"
                    value={cantidadGasto}
                    onFocus={handleOnFocus}
                    onChange={e => setCantidadGasto(Number(e.target.value))}
                /> 
        </div>

        <div className='campo'>
            <label htmlFor="categoria">Categoría</label>
            <select 
                name="categoria" 
                id="categoria"
                value={categoriaGasto}
                onChange={e => setCategoriaGasto(e.target.value)}
                >
                <option value="">-- Seleccione --</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="hogar">Hogar</option>
                <option value="gastos">Gastos varios</option>
                <option value="ocio">Ocio</option>
                <option value="salud">Salud</option>
                <option value="suscripciones">Suscripciones</option>
            </select>
        </div>

        <input 
            type="submit"
            value={gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
      </form>
    </div>
  )
}

export default Modal
