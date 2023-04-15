import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    gastos, 
    setGastos,
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto
}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidadGasto + total, 0)
        const totalDisponible = presupuesto - totalGastado

        // Calcular porcentaje
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        
        // Calcular disponible
        setDisponible(totalDisponible)

        // Calcular gastado
        setGastado(totalGastado)

        // Setear el porcentaje
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1200)
    }, [gastos])



    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', { style: 'currency', currency: 'ARS' })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Estás seguro de querer resetear la app?');
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#D1D5DB',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                })}
                value={porcentaje}
                text={`${porcentaje}%`}
            />
        </div>

        <div className="contenido-presupuesto">
            <button className="reset-app" type="button" onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formatearPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatearPresupuesto(gastado)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
