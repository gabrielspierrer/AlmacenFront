<template>
    <div class="container">
        <hr>
        <h3>{{ abmAccion }} Comprobantes</h3>
        <br>
        <div class="form-group row">
            <label for="ID" class="col-sm-2 col-form-label fw-bold">ID</label>
            <div class="col-sm-10">
                <input type="text" v-model="datos.id" disabled class="form-control">
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Fecha" class="col-sm-2 col-form-label fw-bold">Fecha</label>
            <div class="col-sm-10">
                <input type="date" v-model="datos.fecha" :disabled="abmAccion == 'Consultar'" class="form-control">
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Numero" class="col-sm-2 col-form-label fw-bold">Numero</label>
            <div class="col-sm-10">
                <input type="text" v-model="datos.numero" :disabled="abmAccion == 'Consultar'" class="form-control">
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Tipo" class="col-sm-2 col-form-label fw-bold">Tipo</label>
            <div class="col-sm-10">
                <select v-model="datos.tipo" :disabled="abmAccion == 'Consultar'" class="form-select">
                    <option>Venta</option>
                    <option>Compra</option>
                </select>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Total" class="col-sm-2 col-form-label fw-bold">Total</label>
            <div class="col-sm-10">
                <input type="text" v-model="datos.total" :disabled="abmAccion == 'Consultar'" class="form-control">
            </div>
        </div>
        <br>
        <div v-if="abmAccion == 'Consultar'">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(detalle, index) in datos.comprobantedetalles" :key="index">
                        <td>{{ detalle.articulo }}</td>
                        <td>{{ detalle.cantidad }}</td>
                        <td>{{ detalle.precio }}</td>
                    </tr>
                </tbody>
            </table>
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
        }
    },
    created() {
        if(this.abmAccion != 'Ingresar') {
            this.obtenerDatosId('comprobantes', this.abmId)
            .then(res => {
                this.datos = res
            })
        }
    },
    methods: {
        aceptar() {
            if(this.abmAccion == 'Ingresar') {
                this.ingresarDatos('comprobantes', this.datos)
                .then(res => {
                    if(res.id != 0) {
                        this.$alert("Comprobante Ingresado");
                    }else {
                        this.$alert("Comprobante No Ingresado");
                    }
                })
            }
            this.$emit('salirAbmcomprobantes', true)
        },
        cancelar() {
            this.$emit('salirAbmcomprobantes', false)
        }
    }
}
</script>
