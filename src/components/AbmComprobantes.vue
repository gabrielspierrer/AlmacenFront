<template>
    <div class="container">
        <!-- Titulo principal -->
        <h2>{{ abmAccion }}</h2>
        
        <!-- Contenedor de toda la informacion -->
        <div class="d-flex flex-column justify-content-center align-items-center gap-2">

            <!-- Contenedor de los datos del comprobante -->
            <div class="d-flex flex-row justify-content-center align-items-start gap-2">

                <!-- Fecha -->
                <div class="form-floating">
                    <input v-model="datos.fecha" type="text" class="form-control" id="floatingFecha" placeholder="Fecha" :disabled="abmAccion == 'Info'">

                    <label for="floatingFecha">Fecha</label>
                </div>

                <!-- Hora -->
                <div class="form-floating">
                    <input v-model="datos.hora" type="text" class="form-control" id="floatingHora" placeholder="Hora" :disabled="abmAccion == 'Info'">

                    <label for="floatingHora">Hora</label>
                </div>

                <!-- Tipo -->
                <div class="form-floating">
                    <input v-model="datos.tipo" type="text" class="form-control" id="floatingTipo" placeholder="Tipo" :disabled="abmAccion == 'Info'">

                    <label for="floatingTipo">Tipo</label>
                </div>

                <!-- Total -->
                <div class="form-floating">
                    <input v-model="datos.total" type="text" class="form-control" id="floatingTotal" placeholder="Total" :disabled="abmAccion == 'Info'">

                    <label for="floatingTotal">Total</label>
                </div>
            </div>

            <!-- Tabla con los detalles del comprobante -->
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

            <!-- Boton para regresar al componente principal -->
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
            // Se traen los datos del comprobante seleccionado
            if(this.abmAccion == 'Info') {
                this.obtenerDatosId('comprobantes', this.abmId)
                .then(res => {
                    this.datos = res
                })
            }
        },
        aceptar() {
            // Volver al componente principal
            this.$emit('salirAbmcomprobantes', false)
        }
    }
}
</script>