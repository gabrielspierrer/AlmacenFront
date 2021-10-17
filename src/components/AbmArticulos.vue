<template>
    <div class="container">
        <hr>
        <h3>{{ abmAccion }} Articulos</h3>
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
        <div class="form-group row">
            <label for="Rubro" class="col-sm-2 col-form-label fw-bold">Rubro</label>
            <div class="col-sm-10">
                <select v-model="datos.rubro_id" :disabled="abmAccion == 'Consultar'" class="form-select">
                    <option v-for="(rubro, index) in rubros" :key="index" :value="rubro.id">{{ rubro.nombre }}</option>
                </select>
                <div v-if="error && error.rubro_id" class="alert alert-danger">
                    {{ error.rubro_id[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="StockMin" class="col-sm-2 col-form-label fw-bold">StockMin</label>
            <div class="col-sm-10">
                <input type="number" v-model="datos.stock_min" :disabled="abmAccion == 'Consultar'" class="form-control">
                <div v-if="error && error.stock_min" class="alert alert-danger">
                    {{ error.stock_min[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="StockMax" class="col-sm-2 col-form-label fw-bold">StockMax</label>
            <div class="col-sm-10">
                <input type="number" v-model="datos.stock_max" :disabled="abmAccion == 'Consultar'" class="form-control">
                <div v-if="error && error.stock_max" class="alert alert-danger">
                    {{ error.stock_max[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Precio" class="col-sm-2 col-form-label fw-bold">Precio</label>
            <div class="col-sm-10">
                <input type="number" v-model="datos.precio" :disabled="abmAccion == 'Consultar'" class="form-control">
                <div v-if="error && error.precio" class="alert alert-danger">
                    {{ error.precio[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="FechaVenc" class="col-sm-2 col-form-label fw-bold">FechaVenc</label>
            <div class="col-sm-10">
                <input type="date" v-model="datos.fecha_venc" :disabled="abmAccion == 'Consultar'" class="form-control">
                <div v-if="error && error.fecha_venc" class="alert alert-danger">
                    {{ error.fecha_venc[0] }}
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
            rubros: [],
        }
    },
    created() {
        if(this.abmAccion != 'Ingresar') {
            this.obtenerDatosId('articulos', this.abmId)
            .then(res => {
                this.datos = res
            })
            this.obtenerDatos('rubros')
            .then(res => {
                this.rubros = res
            })
        }else {
            this.obtenerDatos('rubros')
            .then(res => {
                this.rubros = res
            })
        }
    },
    methods: {
        aceptar() {
            if(this.abmAccion == 'Ingresar') {
                this.ingresarDatos('articulos', this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.error = {}
                        this.$alert("Articulo Ingresado");
                        this.$emit('salirAbmarticulos', true)
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmarticulos')
                    }
                })
            }
            if(this.abmAccion == 'Editar') {
                this.editarDatos('articulos', this.abmId, this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.$alert("Articulo Editado");
                        this.$emit('salirAbmarticulos', true)
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmarticulos')
                    }
                })
            }
        },
        cancelar() {
            this.$emit('salirAbmarticulos', false)
        }
    }
}
</script>
