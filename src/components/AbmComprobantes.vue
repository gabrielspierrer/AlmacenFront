<template>
    <div class="container">
        <h2>{{ abmAccion }}</h2>

        <div class="d-flex flex-column justify-content-center align-items-center gap-2">
            <div class="d-flex flex-row justify-content-center align-items-start gap-2">
                <div class="form-floating">
                    <input v-model="datos.fecha" type="text" class="form-control" id="floatingFecha" placeholder="Fecha" :disabled="abmAccion == 'Info'">

                    <label for="floatingFecha">Fecha</label>
                </div>

                <div class="form-floating">
                    <input v-model="datos.hora" type="text" class="form-control" id="floatingHora" placeholder="Hora" :disabled="abmAccion == 'Info'">

                    <label for="floatingHora">Hora</label>
                </div>

                <div class="form-floating">
                    <input v-model="datos.tipo" type="text" class="form-control" id="floatingTipo" placeholder="Tipo" :disabled="abmAccion == 'Info'">

                    <label for="floatingTipo">Tipo</label>
                </div>

                <div class="form-floating">
                    <input v-model="datos.total" type="text" class="form-control" id="floatingTotal" placeholder="Total" :disabled="abmAccion == 'Info'">

                    <label for="floatingTotal">Total</label>
                </div>
            </div>

            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(detalle, index) in datos.comprobantedetalles" :key="index">
                        <td>{{ detalle.articulo.nombre }}</td>
                        <td>{{ detalle.cantidad }}</td>
                        <td>{{ detalle.precio }}</td>
                    </tr>
                </tbody>
            </table>

            <button @click="aceptar()" class="btn btn-primary" title="Aceptar">
                <img src="../assets/ok.svg" alt="ok">
            </button>
        </div>
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
        this.traerDatos();
    },
    methods: {
        traerDatos() {
            if(this.abmAccion == 'Info') {
                this.obtenerDatosId('comprobantes', this.abmId)
                .then(res => {
                    this.datos = res
                })
            }
        },
        aceptar() {
            this.$emit('salirAbmcomprobantes', false)
        }
    }
}
</script>