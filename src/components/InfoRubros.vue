<template>
    <div class="container">
        <!-- Componente del abm rubros -->
        <AbmRubros
            v-if="verAbmrubros == true"
            :abmAccion=infoAccion
            :abmId=infoId
            @salirAbmrubros=mostrarAbmrubros($event)
        />
        
        <!-- Contenedor de los rubros -->
        <div v-if="verAbmrubros == false">

            <!-- Titulo, boton ingresar y buscador de rubros -->
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h1>Rubros</h1>

                <button @click="abmRubros('Ingresar')" class="btn btn-success" title="Ingresar">
                    <img src="../assets/create.svg" alt="create">
                </button>

                <input v-model="filtroNombres" type="search" class="form-control w-25" placeholder="Buscar">
            </div>

            <!-- Tabla con todos los rubros -->
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rubro, index) in nombresFiltrados" :key="index">
                        <th scope="row">{{ rubro.id }}</th>
                        <td>{{ rubro.nombre }}</td>
                        <td>
                            <!-- Botones editar y eliminar -->
                            <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                <button @click="abmRubros('Editar', rubro.id)" class="btn btn-warning" title="Editar">
                                    <img src="../assets/update.svg" alt="update">
                                </button>                 
                                <button @click="eliminar(rubro.id)" class="btn btn-danger" title="Eliminar">
                                    <img  src="../assets/delete.svg" alt="delete">
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
import AbmRubros from './AbmRubros.vue'
import ApiRest from './ApiRest.vue'

export default {
    components: { AbmRubros },
    mixins: [ApiRest],
    data() {
        return {
            rubros: [],
            infoAccion: '',
            infoId: '',
            verAbmrubros: false,
            filtroNombres: '',
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        traerDatos() {
            // Traer todos los rubros
            this.obtenerDatos('rubros')
            .then(res => {
                this.rubros = res
            })
        },
        abmRubros(accion, id) {
            // Mostrar el abm de rubros pasando la accion y el id
            this.infoAccion = accion
            this.infoId = id
            this.verAbmrubros = !this.verAbmrubros
        },
        mostrarAbmrubros(ver) {
            // Desde el abm emit hacia este compoenente pasando true o false para traer o no traer los datos 
            this.verAbmrubros = false
            if(ver) {
                this.traerDatos()
            }
        },
        eliminar(infoId) {
            // Verificar antes de eliminar un rubro
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
                    this.eliminarDatos('rubros', infoId)
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
        nombresFiltrados() {
            // Buscar rubros por nombre
            return this.rubros.filter(rubro => {
                return rubro.nombre.toLowerCase().includes(this.filtroNombres.toLowerCase())
            })
        }
    }
}
</script>