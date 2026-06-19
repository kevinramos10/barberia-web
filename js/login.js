const API = 'http://127.0.0.1:5000'

document.getElementById('btnLogin').addEventListener('click', async () => {

    //1. Capturamos valores enviados por el barbero
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    //2. Esos valores enviamos al backend
    const respuesta = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })

    const data = await respuesta.json()

    if(respuesta.ok){
        localStorage.setItem('token', data.token)
        alert('Bienvenido!')
        window.location.href = '../paginas/dashboard.html'
    }else{
        alert(data.error)
    }

})