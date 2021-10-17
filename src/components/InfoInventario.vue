<template>
    <div class="container">
        <hr>
        <h1>Inventario</h1>
        <hr>
        <h3>VENTAS</h3>
        <input type="search" placeholder="Filtrar por articulos" v-model="filtroArticuloVenta" class="form-control">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(detalle, index) in articuloFiltradoVenta" :key="index">
                    <td>{{ detalle.articulo }}</td>
                    <td>{{ detalle.cantidad }}</td>
                    <td>{{ detalle.precio }}</td>
                </tr>
            </tbody>
        </table>
        <h3>COMPRAS</h3>
        <input type="search" placeholder="Filtrar por articulos" v-model="filtroArticuloCompra" class="form-control">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(detalle, index) in articuloFiltradoCompra" :key="index">
                    <td>{{ detalle.articulo }}</td>
                    <td>{{ detalle.cantidad }}</td>
                    <td>{{ detalle.precio }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ApiRest from './ApiRest.vue'

export default {
    mixins: [ApiRest],
    data() {
        return {
            venta: [],
            compra: [],
            filtroArticuloVenta: '',
            filtroArticuloCompra: '',
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        traerDatos() {
            this.obtenerDatos('inventario')
            .then(res => {
                this.venta = res.Venta
                this.compra = res.Compra
            })
        }
    },
    computed: {
        articuloFiltradoVenta() {
            return this.venta.filter(vent => {
                return vent.articulo.toLowerCase().includes(this.filtroArticuloVenta.toLowerCase())
            })
        },
        articuloFiltradoCompra() {
            return this.compra.filter(comp => {
                return comp.articulo.toLowerCase().includes(this.filtroArticuloCompra.toLowerCase())
            })
        }
    }
}
</script>
