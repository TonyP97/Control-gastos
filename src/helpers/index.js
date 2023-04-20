
export const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36); 
    return random + fecha;
}

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };

    return fechaNueva.toLocaleDateString('es-ES', opciones);
}

export const obtenerFecha = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

export const obtenerHora = () => {
    const fecha = new Date();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    return `${hora}:${minutos}`;
}

export const handleOnFocus = e => {
    if(e.target.value === '0') e.target.value = ''
}