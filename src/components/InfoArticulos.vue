<template>
    <div class="container">

        <!-- Componente para ingresar o editar articulos -->
        <AbmArticulos
            v-if="verAbmarticulos == true"
            :abmAccion=infoAccion
            :abmId=infoId
            @salirAbmarticulos=mostrarAbmarticulos($event)
        />

        <!-- Contenedor del componente de articulos -->
        <div v-if="verAbmarticulos == false">

            <!-- Contenedor del titulo, boton ingresar y busqueda -->
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h1>Articulos</h1>
                
                <button @click="abmArticulos('Ingresar')" class="btn btn-success" title="Ingresar">
                    <img src="../assets/create.svg" alt="create">
                </button>

                <input v-model="filtroArticulos" type="search" class="form-control w-25" placeholder="Buscar">
            </div>

            <!-- Tabla con todos los articulos -->
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Rubro</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(articulo, index) in articulosFiltrados" :key="index">
                        <th scope="row">{{ articulo.id }}</th>
                        <td>{{ articulo.nombre }}</td>
                        <td>{{ articulo.rubro.nombre }}</td>
                        <td>{{ articulo.stock }}</td>
                        <td>{{ articulo.precio }}</td>
                        <td>
                            <!-- Botones editar y eliminar -->
                            <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                <button @click="abmArticulos('Editar', articulo.id)" class="btn btn-warning" title="Editar">
                                    <img src="../assets/update.svg" alt="update">
                                </button>
                                <button @click="eliminar(articulo.id)" class="btn btn-danger" title="Eliminar">
                                    <img src="../assets/delete.svg" alt="delete">
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import AbmArticulos from './AbmArticulos.vue'
import ApiRest from './ApiRest.vue'

export default {
    components: { AbmArticulos },
    mixins: [ApiRest],
    data() {
        return {
            articulos: [],
            infoAccion: '',
            infoId: '',
            verAbmarticulos: false,
            filtroArticulos: '',
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        traerDatos() {
            // Traer todos los articulos
            this.obtenerDatos('articulos')
            .then(res => {
                this.articulos = res
            })
        },
        abmArticulos(accion, id) {
            // Muestro abm de articulos y le paso la accion y el id
            this.infoAccion = accion
            this.infoId = id
            this.verAbmarticulos = !this.verAbmarticulos
        },
        mostrarAbmarticulos(ver) {
            // Desde el abm emito para cerrarlo y le paso un valor falso o verdadero si quiero traer los datos
            this.verAbmarticulos = false
            if(ver) {
                this.traerDatos()
            }
        },
        eliminar(infoId) {
            // Verifico antes de eliminar un articulo de la base de datos
            this.$fire({
                title: "Estas seguro?",
                text: "No podras volver atras",
                type: "warning",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    this.eliminarDatos('articulos', infoId)
                    this.traerDatos()
                    this.$fire({
                        title: "Eliminado!",
                        showConfirmButton: false,
                        type: "success",
                        timer: 1000
                    });
                }
            });
        }
    },
    computed: {
        articulosFiltrados() {
            // Buscar articulos por nombre
            return this.articulos.filter(articulo => {
                return articulo.nombre.toLowerCase().includes(this.filtroArticulos.toLowerCase())
            })
        }
    }
}
</script>