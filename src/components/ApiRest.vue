<script>
export default {
    methods: {
        obtenerDatos(ruta) {
            let url = 'http://127.0.0.1:8000/api/' + ruta
            return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                return res.json()
            })
        },
        obtenerDatosId(ruta, id) {
            let url = 'http://127.0.0.1:8000/api/' + ruta + '/' + id
            return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                return res.json()
            })
        },
        ingresarDatos(ruta, datosIngresar) {
            let url = 'http://127.0.0.1:8000/api/' + ruta
            return fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosIngresar)
            })
            .then(res => {
                return res.json()
            })
        },
        editarDatos(ruta, id, datosIngresar) {
            let url = 'http://127.0.0.1:8000/api/' + ruta + '/' + id
            return fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosIngresar)
            })
            .then(res => {
                return res.json()
            })
        },
        eliminarDatos(ruta, id) {
            let url = 'http://127.0.0.1:8000/api/' + ruta + '/' + id
            return fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        },
    }
}
</script>
