const API = 'http://127.0.0.1:5000'

// Cargar barberos cuando la página abre
async function cargarBarberos() {
    const resp = await fetch(`${API}/barberos`)
    const barb = await resp.json()

    const select = document.getElementById('barbero')

    barb.forEach(datos => {
        const option = document.createElement('option')

        option.value = datos.id
        option.textContent = `${datos.id} - ${datos.nombres} - ${datos.apellidos}`
        select.appendChild(option)
    })
}
cargarBarberos()


//Cargar horarios cuando la pagina abre
async function cargarHorarios() {
    const respuesta = await fetch(`${API}/horarios`)
    const horarios = await respuesta.json()

    const select = document.getElementById('horario')

    horarios.forEach((h) => {
        const option = document.createElement('option')

        option.value = h.id
        
        //Colocarle el AM y PM
        let hora_ini = parseInt(h.hora_inicio.split(':')[0])
        let hora_formato_ini = hora_ini > 12 ? hora_ini - 12 : hora_ini
        let periodo_ini = hora_ini < 12 ? 'AM' : 'PM'

        let hora_fi = parseInt(h.hora_fin.split(':')[0])
        let hora_formato_fi = hora_fi > 12 ? hora_fi - 12 : hora_fi
        let periodo_fi = hora_fi < 12 ? 'AM' : 'PM'

        option.textContent = `${hora_formato_ini}${periodo_ini} - ${hora_formato_fi}${periodo_fi}`

        select.appendChild(option)
    })
}
cargarHorarios()

//Hacer una reserva al apretar el boton con los datos
document.getElementById('btnConfirmar').addEventListener('click', async () => {

    //1. Tomar los valores del formulario
    const dni = document.getElementById('dni').value
    const nombres = document.getElementById('nombres').value
    const apellidos = document.getElementById('apellidos').value
    const celular = document.getElementById('telefono').value
    const barbero_id = document.getElementById('barbero').value
    const horario_id = document.getElementById('horario').value
    const fecha = document.getElementById('fecha').value

    let error = 0
    document.getElementById('errorDni').textContent = ""
    document.getElementById('errorNombres').textContent = ""
    document.getElementById('errorApellidos').textContent = ""
    document.getElementById('errorCelular').textContent = ""
    document.getElementById('errorBarbero').textContent = ""
    document.getElementById('errorHorario').textContent = ""
    document.getElementById('errorFecha').textContent = ""

    if(dni == ""){
        document.getElementById('errorDni').textContent = "El DNI es obligatorio"
        error++
    } else if(dni.length < 8 || dni.length > 8){
        document.getElementById('errorDni').textContent = "El DNI debe tener 8 digitos"
        error++
    }
    if(nombres == ""){
        document.getElementById('errorNombres').textContent = "El Nombre es obligatorio"
        error++
    }
    if(apellidos == ""){
        document.getElementById('errorApellidos').textContent = "El Apellido es obligatorio"
        error++
    }
    if(celular == ""){
        document.getElementById('errorCelular').textContent = "El Celular es obligatorio"
        error++
    } else if(celular.length < 9 || celular.length > 9){
        document.getElementById('errorDni').textContent = "El celular debe tener 9 digitos"
        error++
    }
    if(barbero_id == ""){
        document.getElementById('errorBarbero').textContent = "Debe seleccionar un barbero"
        error++
    }
    if(horario_id == ""){
        document.getElementById('errorHorario').textContent = "Debe seleccionar un horario"
        error++
    }
    if(fecha == ""){
        document.getElementById('errorFecha').textContent = "Debe seleccionar una fecha"
        error++
    } else{
        const fechaHoy = new Date()
        fechaHoy.setHours(0,0,0,0)

        const partes = fecha.split('-') // ← divide "2026-06-18" en ["2026","06","18"]
        const fechaSeleccionada = new Date(partes[0], partes[1] - 1, partes[2]) // ← mes -1 porque enero es 0

        if(fechaSeleccionada < fechaHoy){
            document.getElementById('errorFecha').textContent = 'Debe seleccionar una fecha valida'
            error++
        }
    }

    if(error > 0 ) return

    
    //2. Mandamos los datos al Backend cree el cliente y la reserva
    const respuesta = await fetch(`${API}/reservas`,{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({
            dni,
            nombres,
            apellidos,
            celular,
            barbero_id,
            horario_id,
            fecha
        })
    })
    const data = await respuesta.json()

    // 3. Mostrar mensaje
    alert(data.mensaje)
})

