<template>
    <div class="container">
        <!-- Componente con los detalles del comprobante -->
        <AbmComprobantes
            v-if="verAbmcomprobantes == true"
            :abmAccion=infoAccion
            :abmId=infoId
            @salirAbmcomprobantes=mostrarAbmcomprobantes($event)
        />

        <!-- Contenedor de los comprobantes -->
        <div v-if="verAbmcomprobantes == false">

            <!-- Titulo y buscador -->
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h1>Comprobantes</h1>
                
                <input v-model="filtroFechas" type="date" class="form-control w-25">
            </div>
            
            <!-- Tabla de comprobantes -->
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(comprobante, index) in fechasFiltradas" :key="index">
                        <th scope="row">{{ comprobante.id }}</th>
                        <td>{{ comprobante.fecha }}</td>
                        <td>{{ comprobante.hora }}</td>
                        <td>{{ comprobante.tipo }}</td>
                        <td>{{ comprobante.total }}</td>
                        <td>
                            <!-- Boton eliminar y para ver detalles del comprobante -->
                            <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                <button @click="eliminar(comprobante.id)" class="btn btn-danger" title="Eliminar">
                                    <img src="../assets/delete.svg" alt="delete">
                                </button>
                                <button @click="abmComprobantes('Info', comprobante.id)" class="btn btn-info" title="Info">
                                    <img src="../assets/info.svg" alt="info">
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
import AbmComprobantes from './AbmComprobantes.vue'
import ApiRest from './ApiRest.vue'

export default {
    components: { AbmComprobantes },
    mixins: [ApiRest],
    data() {
        return {
            comprobantes: [],
            infoAccion: '',
            infoId: '',
            verAbmcomprobantes: false,
            filtroFechas: '',
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        traerDatos() {
            // Traer todos los comprobantes
            this.obtenerDatos('comprobantes')
            .then(res => {
                this.comprobantes = res
            })
        },
        abmComprobantes(accion, id) {
            // Mostrar abm y pasarle el id y accion
            this.infoAccion = accion
            this.infoId = id
            this.verAbmcomprobantes = !this.verAbmcomprobantes
        },
        mostrarAbmcomprobantes(ver) {
            // Emit desde el abm para volver y false o true para traer o no los datos
            this.verAbmcomprobantes = false
            if(ver) {
                this.traerDatos()
            }
        },
        eliminar(infoId) {
            // Verificar eliminacion de un comprobante
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
                    this.eliminarDatos('comprobantes', infoId)
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
        fechasFiltradas() {
            // Busqueda de comprobantes por fecha
            return this.comprobantes.filter(comprobante => {
                return comprobante.fecha.toLowerCase().includes(this.filtroFechas.toLowerCase())
            })
        }
    }
}
</script>