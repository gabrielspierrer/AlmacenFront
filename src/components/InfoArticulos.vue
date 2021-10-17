<template>
    <div class="container">
        <AbmArticulos
            v-if="verAbmarticulos == true"
            :abmAccion=infoAccion
            :abmId=infoId
            @salirAbmarticulos=mostrarAbmarticulos($event)
        />
        <div v-if="verAbmarticulos == false">
            <hr>
            <h1>Lista de Articulos</h1>
            <button @click="abmArticulos('Ingresar')" class="btn btn-success">Ingresar</button>
            <hr>
            <input type="search" placeholder="Filtrar por rubros" v-model="filtroRubros" class="form-control">
            <br>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Rubro</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(articulo, index) in rubrosFiltrados" :key="index">
                        <th scope="row">{{ articulo.id }}</th>
                        <td>{{ articulo.nombre }}</td>
                        <td>{{ articulo.rubro.nombre }}</td>
                        <td>{{ articulo.precio }}</td>
                        <td>
                            <div class="d-grid gap-2 d-md-block">
                                <button @click="abmArticulos('Editar', articulo.id)" class="btn btn-warning me-md-2">Editar</button>
                                <button @click="eliminar(articulo.id)" class="btn btn-danger me-md-2">Eliminar</button>
                                <button @click="abmArticulos('Consultar', articulo.id)" class="btn btn-info">Consultar</button>
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
            filtroRubros: '',
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        traerDatos() {
            this.obtenerDatos('articulos')
            .then(res => {
                this.articulos = res
            })
        },
        abmArticulos(accion, id) {
            this.infoAccion = accion
            this.infoId = id
            this.verAbmarticulos = !this.verAbmarticulos
        },
        mostrarAbmarticulos(ver) {
            this.verAbmarticulos = false
            if(ver) {
                this.traerDatos()
            }
        },
        eliminar(infoId) {
            this.$confirm("Estas seguro?").then(() => {
                this.eliminarDatos('articulos', infoId)
                .then(res => {
                    this.datos = res
                    this.traerDatos()
                    this.$alert("Articulo Eliminado");
                })
            }).catch(() => {});
        }
    },
    computed: {
        rubrosFiltrados() {
            return this.articulos.filter(articulo => {
                return articulo.rubro.nombre.toLowerCase().includes(this.filtroRubros.toLowerCase())
            })
        }
    }
}
</script>
