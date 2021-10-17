<template>
    <div class="container">
        <AbmComprobantes
            v-if="verAbmcomprobantes == true"
            :abmAccion=infoAccion
            :abmId=infoId
            @salirAbmcomprobantes=mostrarAbmcomprobantes($event)
        />
        <div v-if="verAbmcomprobantes == false">
            <hr>
            <h1>Lista de Comprobantes</h1>
            <hr>
            <input type="search" placeholder="Filtrar por numeros" v-model="filtroNumeros" class="form-control">
            <br>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Numero</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(comprobante, index) in numerosFiltrados" :key="index">
                        <th scope="row">{{ comprobante.id }}</th>
                        <td>{{ comprobante.fecha }}</td>
                        <td>{{ comprobante.numero }}</td>
                        <td>{{ comprobante.tipo }}</td>
                        <td>{{ comprobante.total }}</td>
                        <td>
                            <div class="d-grid gap-2 d-md-block">
                                <button @click="eliminar(comprobante.id)" class="btn btn-danger me-md-2">Eliminar</button>
                                <button @click="abmComprobantes('Consultar', comprobante.id)" class="btn btn-info">Consultar</button>
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
            filtroNumeros: '',
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        traerDatos() {
            this.obtenerDatos('comprobantes')
            .then(res => {
                this.comprobantes = res
            })
        },
        abmComprobantes(accion, id) {
            this.infoAccion = accion
            this.infoId = id
            this.verAbmcomprobantes = !this.verAbmcomprobantes
        },
        mostrarAbmcomprobantes(ver) {
            this.verAbmcomprobantes = false
            if(ver) {
                this.traerDatos()
            }
        },
        eliminar(infoId) {
            this.$confirm("Estas seguro?").then(() => {
                this.eliminarDatos('comprobantes', infoId)
                .then(res => {
                    this.datos = res
                    this.traerDatos()
                    this.$alert("Comprobante Eliminado");
                })
            }).catch(() => {});
        }
    },
    computed: {
        numerosFiltrados() {
            return this.comprobantes.filter(comprobante => {
                return comprobante.numero.toLowerCase().includes(this.filtroNumeros.toLowerCase())
            })
        }
    }
}
</script>
