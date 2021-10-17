<template>
    <div class="container">
        <AbmRubros
            v-if="verAbmrubros == true"
            :abmAccion=infoAccion
            :abmId=infoId
            @salirAbmrubros=mostrarAbmrubros($event)
        />
        <div v-if="verAbmrubros == false">
            <hr>
            <h1>Lista de Rubros</h1>
            <button @click="abmRubros('Ingresar')" class="btn btn-success">Ingresar</button>
            <hr>
            <input type="search" placeholder="Filtrar por nombres" v-model="filtroNombres" class="form-control">
            <br>
            <table class="table table-hover">
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
                            <div class="d-grid gap-2 d-md-block">
                                <button @click="abmRubros('Editar', rubro.id)" class="btn btn-warning me-md-2">Editar</button>
                                <button @click="eliminar(rubro.id)" class="btn btn-danger me-md-2">Eliminar</button>
                                <button @click="abmRubros('Consultar', rubro.id)" class="btn btn-info">Consultar</button>
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
            this.obtenerDatos('rubros')
            .then(res => {
                this.rubros = res
            })
        },
        abmRubros(accion, id) {
            this.infoAccion = accion
            this.infoId = id
            this.verAbmrubros = !this.verAbmrubros
        },
        mostrarAbmrubros(ver) {
            this.verAbmrubros = false
            if(ver) {
                this.traerDatos()
            }
        },
        eliminar(infoId) {
            this.$confirm("Estas seguro?").then(() => {
                this.eliminarDatos('rubros', infoId)
                .then(res => {
                    this.datos = res
                    this.traerDatos()
                    this.$alert("Rubro Eliminado");
                })
            }).catch(() => {});
        }
    },
    computed: {
        nombresFiltrados() {
            return this.rubros.filter(rubro => {
                return rubro.nombre.toLowerCase().includes(this.filtroNombres.toLowerCase())
            })
        }
    }
}
</script>
