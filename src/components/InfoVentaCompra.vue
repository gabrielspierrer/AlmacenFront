<template>
    <div class="container">
        <AbmVenta
            v-if="verAbmVenta == true"
            @salirAbmVenta=mostrarAbmVenta($event)
        />

        <AbmCompra
            v-if="verAbmCompra == true"
            @salirAbmCompra=mostrarAbmCompra($event)
        />

        <div v-if="verAbmVenta == false && verAbmCompra == false">
            <div class="d-flex flex-column justify-content-center gap-5">
                <h1>Compras / Ventas</h1>

                <div class="d-flex flex-row justify-content-evenly align-items-center">
                    <button @click="abmCompra()" class="btn btn-primary" title="Nueva compra">
                        <img src="../assets/com.svg" alt="compra">
                        Compra
                    </button>
                    <button @click="abmVenta()" class="btn btn-success" title="Nueva venta">
                        <img src="../assets/ven.svg" alt="venta">
                        Venta
                    </button>
                </div>

                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <img src="../assets/calendar.svg" alt="calendar">
                    <h5 class="mb-0">{{ fecha }}</h5>
                </div>

                <div class="d-flex flex-row justify-content-around align-items-center">
                    <div>
                        <h3 class="text-primary fw-bold">Total Compras</h3>
                        <h4>{{ totalCompras }}</h4>
                    </div>
                    <div>
                        <h3 class="text-danger fw-bold">Ganancias</h3>
                        <h4>{{ ganancia }}</h4>
                    </div>
                    <div>
                        <h3 class="text-success fw-bold">Total Ventas</h3>
                        <h4>{{ totalVentas }}</h4>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import AbmVenta from './AbmVenta.vue'
import AbmCompra from './AbmCompra.vue'
import ApiRest from './ApiRest.vue'

export default {
    components: { AbmVenta, AbmCompra },
    mixins: [ApiRest],
    data() {
        return {
            verAbmVenta: false,
            verAbmCompra: false,
            totalVentas: 0,
            totalCompras: 0,
            ganancia: 0,
            fecha: '',
        }
    },
    mounted() {
        this.obtenerFecha();
    },
    created() {
        this.traerDatos();
    },
    methods: {
        traerDatos() {
            this.obtenerDatos('sumaVenta')
            .then(res => {
                let tv = 0
                tv = res
                this.totalVentas = tv.toFixed(2)
                this.obtenerDatos('sumaCompra')
                .then(res => {
                    let tc = 0
                    tc = res
                    this.totalCompras = tc.toFixed(2)
                    this.totalGanancia()
                })
            })
        },
        totalGanancia() {
            let g = 0
            g = this.totalVentas - this.totalCompras
            this.ganancia = g.toFixed(2)
        },
        obtenerFecha() {
            const f = new Date();
            
            const dia = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
            const mes = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

            let dn = f.getDate();
            let d = dia[f.getDay()];
            let m = mes[f.getMonth()];
            let a = f.getFullYear();

            this.fecha = d+", "+dn+" de "+m+" de "+a;
        },
        abmVenta() {
            this.verAbmVenta = !this.verAbmVenta
        },
        mostrarAbmVenta(ver) {
            this.verAbmVenta = false
            if(ver) {
                this.traerDatos()
            }
        },
        abmCompra() {
            this.verAbmCompra = !this.verAbmCompra
        },
        mostrarAbmCompra(ver) {
            this.verAbmCompra = false
            if(ver) {
                this.traerDatos()
            }
        }
    }
}
</script>