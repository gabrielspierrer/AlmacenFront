<template>
    <div class="container">
        <!-- Compoenente de ventas -->
        <AbmVenta
            v-if="verAbmVenta == true"
            @salirAbmVenta=mostrarAbmVenta($event)
        />

        <!-- Componente de compras -->
        <AbmCompra
            v-if="verAbmCompra == true"
            @salirAbmCompra=mostrarAbmCompra($event)
        />

        <!-- Contenedor de la vista principal del componente -->
        <div v-if="verAbmVenta == false && verAbmCompra == false">

            <!-- Contenedor de los datos -->
            <div class="d-flex flex-column justify-content-center gap-5">

                <!-- Titulo principal -->
                <h1>Compras / Ventas</h1>

                <!-- Botones de compra y venta -->
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

                <!-- Fecha actual -->
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <img src="../assets/calendar.svg" alt="calendar">
                    <h5 class="mb-0">{{ fecha }}</h5>
                </div>

                <!-- Informacion sobre las compras, ventas y las ganancias -->
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
            // Traer datos del total de las ventas y las compras
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
            // Calcular la ganancia total
            let g = 0
            g = this.totalVentas - this.totalCompras
            this.ganancia = g.toFixed(2)
        },
        obtenerFecha() {
            // Fecha completa con nombre de dias y meses
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
            // Mostrar abm de ventas
            this.verAbmVenta = !this.verAbmVenta
        },
        mostrarAbmVenta(ver) {
            // Emit desde el componente venta para salir y traer los datos o no dependiendo del verdadero o falso
            this.verAbmVenta = false
            if(ver) {
                this.traerDatos()
            }
        },
        abmCompra() {
            // Mostrar abm de compras
            this.verAbmCompra = !this.verAbmCompra
        },
        mostrarAbmCompra(ver) {
            // Emit desde el componente compra para salir y traer los datos o no dependiendo del verdadero o falso
            this.verAbmCompra = false
            if(ver) {
                this.traerDatos()
            }
        }
    }
}
</script>