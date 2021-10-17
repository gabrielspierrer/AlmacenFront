<template>
    <div class="container">
        <hr>
        <h3>{{ abmAccion }} Rubros</h3>
        <br>
        <div class="form-group row">
            <label for="ID" class="col-sm-2 col-form-label fw-bold">ID</label>
            <div class="col-sm-10">
                <input type="text" v-model="datos.id" disabled class="form-control">
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Nombre" class="col-sm-2 col-form-label fw-bold">Nombre</label>
            <div class="col-sm-10">
                <input type="text" v-model="datos.nombre" :disabled="abmAccion == 'Consultar'" class="form-control">
                <div v-if="error && error.nombre" class="alert alert-danger">
                    {{ error.nombre[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="aceptar()" class="btn btn-primary me-md-2" :disabled="abmAccion == 'Consultar'">Aceptar</button>
            <button @click="cancelar()" class="btn btn-secondary">Cancelar</button>
        </div>
        <hr>
    </div>
</template>

<script>
import ApiRest from './ApiRest.vue'

export default {
    props: ['abmAccion', 'abmId'],
    mixins: [ApiRest],
    data() {
        return {
            datos: {},
            error: {},
        }
    },
    created() {
        if(this.abmAccion != 'Ingresar') {
            this.obtenerDatosId('rubros', this.abmId)
            .then(res => {
                this.datos = res
            })
        }
    },
    methods: {
        aceptar() {
            if(this.abmAccion == 'Ingresar') {
                this.ingresarDatos('rubros', this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.error = {}
                        this.$alert("Rubro Ingresado");
                        this.$emit('salirAbmrubros', true)
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmrubros')
                    }
                })
            }
            if(this.abmAccion == 'Editar') {
                this.editarDatos('rubros', this.abmId, this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.$alert("Rubro Editado");
                        this.$emit('salirAbmrubros', true)
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmrubros')
                    }
                })
            }
        },
        cancelar() {
            this.$emit('salirAbmrubros', false)
        }
    }
}
</script>
