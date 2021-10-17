<template>
    <div class="container">
        <AbmVentaCompra
            v-if="verAbmVentaCompra == true"
            :abmAccion=infoAccion
            @salirAbmVentaCompra=mostrarAbmVentaCompra($event)
        />
        <div v-if="verAbmVentaCompra == false">
            <hr>
            <h1>Ventas y Compras</h1>
            <div class="d-flex gap-5 justify-content-center align-items-center">
                <button @click="abmVentaCompra('Venta')" class="btn btn-primary">Ingresar Nueva Venta</button> |
                <button @click="abmVentaCompra('Compra')" class="btn btn-primary">Ingresar Nueva Compra</button>
            </div>
            <hr>
            <img src="../assets/inventario.png">
        </div>
    </div>
</template>

<script>
import AbmVentaCompra from './AbmVentaCompra.vue'
import ApiRest from './ApiRest.vue'

export default {
    components: { AbmVentaCompra },
    mixins: [ApiRest],
    data() {
        return {
            infoAccion: '',
            verAbmVentaCompra: false,
        }
    },
    methods: {
        abmVentaCompra(accion) {
            this.infoAccion = accion
            this.verAbmVentaCompra = !this.verAbmVentaCompra
        },
        mostrarAbmVentaCompra() {
            this.verAbmVentaCompra = false
        }
    }
}
</script>
