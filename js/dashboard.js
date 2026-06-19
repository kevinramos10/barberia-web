const API = 'http://127.0.0.1:5000'

//Verificamos si tenemos el token
const token = localStorage.getItem('token')

if(!token){
    window.location.href = '../paginas/login.html'
}

// Cargar barberos cuando la página abre
async function cargarBarberos() {
    const respuesta = await fetch(`${API}/barberos`)
    const barberos = await respuesta.json()

    const select = document.getElementById('filtroBarbero')
    
    barberos.forEach(datos => {
        const option = document.createElement('option')

        option.value = datos.id
        option.textContent = `${datos.nombres} - ${datos.apellidos}`
        select.appendChild(option)
    })
}
cargarBarberos()

//Cargar total de reservas hoy cuando la pagina abre
async function CargarTotalReservas() {
    const respuesta = await fetch(`${API}/reservas/hoy/total`)
    const cantReservas = await respuesta.json()

    const mostReservas = document.getElementById('tReservas')

    console.log(cantReservas)

    tReservas.textContent = cantReservas

}

CargarTotalReservas()

//Cargar total de reservas hoy x Barbero
async function CargarTotalReservasxBarbero(barbero_id) {
    const respuesta = await fetch(`${API}/reservas/hoy/barbero/${barbero_id}`)
    const cantReservasxBar = await respuesta.json()

    if(barbero_id == 1){
        mostReservasxBar = document.getElementById('tReserva1') 
    } else if (barbero_id == 2){
        mostReservasxBar = document.getElementById('tReserva2') 
    }else if (barbero_id == 3){
        mostReservasxBar = document.getElementById('tReserva3') 
    }

    mostReservasxBar.textContent = cantReservasxBar
}
CargarTotalReservasxBarbero(1)
CargarTotalReservasxBarbero(2)
CargarTotalReservasxBarbero(3)

//MOSTRAR RESERVAS EN EL TABLE
function mostrarReservas(reservas){
    //Capturamos la table
    const tbody = document.getElementById('tablaBody')
    //limpiamos la tabla
    tbody.innerHTML = ''

    if(reservas.length == 0){
        tbody.innerHTML = '<tr><td colspan="7">No hay reservas el día de hoy</td></tr>'
        return
    }

    reservas.forEach(reserva => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${reserva.dni}</td>
            <td>${reserva.nombres}</td>
            <td>${reserva.apellidos}</td>
            <td>${reserva.celular}</td>
            <td>${reserva.barbero}</td>
            <td>${reserva.horario}</td>
            <td>${reserva.fecha}</td>
        `
        tbody.appendChild(tr)
    })
}

//capturamos el boton el foton de filtrar
document.getElementById('btnFiltrar').addEventListener('click', () => {
    const desde = document.getElementById('filtroFecha1').value
    const hasta = document.getElementById('filtroFecha2').value
    const barbero_id = document.getElementById('filtroBarbero').value

    filtrar(desde, hasta, barbero_id)
})


//filtro de las reservas
async function filtrar(desde, hasta, barbero_id) {
    
    let url = `${API}/reservas/filtrar?`

    if(desde) url += `desde=${desde}&`
    if(hasta) url += `hasta=${hasta}&`
    if(barbero_id) url += `barbero_id=${barbero_id}&`

    const respuesta = await fetch(url)
    const reservas = await respuesta.json()

    mostrarReservas(reservas)
}

//FUNCION DEL BOTON LIMPIAR
btnLimpia = document.getElementById('btnLimpiar')

btnLimpia.addEventListener('click', () => {
    document.getElementById('filtroFecha1').value = ''
    
    document.getElementById('filtroFecha2').value = ''    

    document.getElementById('filtroBarbero').value = ''


})