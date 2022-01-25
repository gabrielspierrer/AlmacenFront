<template>
    <div class="container">
        <!-- Titulo principal -->
        <h2>{{ abmAccion }}</h2>

        <!-- Contenedor del formulario y los botones -->
        <div class="d-flex flex-column justify-content-center align-items-center gap-2">

            <!-- Contenedor del formulario -->
            <div class="d-flex flex-row justify-content-center align-items-start gap-2">

                <!-- Nombre -->
                <div class="form-floating">
                    <input v-model="datos.nombre" type="text" class="form-control" id="floatingNombre" placeholder="Nombre" ref="nombre">

                    <label for="floatingNombre">Nombre</label>

                    <div v-if="error && error.nombre" class="alert alert-danger">
                        {{ error.nombre[0] }}
                    </div>
                </div>

                <!-- Rubro -->
                <div class="form-floating">
                    <b-form-input v-model="datos.rubro_id" id="floatingRubro" placeholder="Rubro" list="rubro-list"></b-form-input>
                    <b-form-datalist id="rubro-list">
                        <option v-for="(rubro, index) in rubros" :key="index" :value="rubro.id">{{ rubro.nombre }}</option>
                    </b-form-datalist>

                    <label for="floatingRubro">Rubro</label>

                    <div v-if="error && error.rubro_id" class="alert alert-danger">
                        {{ error.rubro_id[0] }}
                    </div>
                </div>

                <!-- Stock -->
                <div class="form-floating">
                    <input v-model="datos.stock" type="text" class="form-control" id="floatingStock" placeholder="Stock">

                    <label for="floatingStock">Stock</label>

                    <div v-if="error && error.stock" class="alert alert-danger">
                        {{ error.stock[0] }}
                    </div>
                </div>

                <!-- Precio -->
                <div class="form-floating">
                    <input @keyup.enter="aceptar()" v-model="datos.precio" type="text" class="form-control" id="floatingPrecio" placeholder="Precio">

                    <label for="floatingPrecio">Precio</label>

                    <div v-if="error && error.precio" class="alert alert-danger">
                        {{ error.precio[0] }}
                    </div>
                </div>
            </div>

            <!-- Botones aceptar y cancelar -->
            <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                <button @click="aceptar()" class="btn btn-primary" title="Aceptar">
                    <img src="../assets/ok.svg" alt="ok">
                </button>
                <button @click="cancelar()" class="btn btn-secondary" title="Cancelar">
                    <img src="../assets/salir.svg" alt="salir">
                </button>
            </div>
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
            error: {},
            rubros: [],
        }
    },
    mounted() {
        // Focus en el input nombre
        this.$refs.nombre.focus();
    },
    created() {
        this.traerDatos();
    },
    methods: {
        traerDatos() {
            // Traer los datos del articulo y los rubros cuando se edita
            if(this.abmAccion != 'Ingresar') {
            this.obtenerDatosId('articulos', this.abmId)
            .then(res => {
                this.datos = res
                this.obtenerDatos('rubros')
                .then(res => {
                    this.rubros = res
                })
            })
            // Traer los rubros para cuando se ingresa
            }else {
                this.obtenerDatos('rubros')
                .then(res => {
                    this.rubros = res
                })
            }
        },
        aceptar() {
            // Ingreso de datos en articulos y se vuelve al componente principal
            if(this.abmAccion == 'Ingresar') {
                this.ingresarDatos('articulos', this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.error = {}
                        this.$fire({
                            title: "Ingresado!",
                            showConfirmButton: false,
                            type: "success",
                            timer: 1000
                        });
                        this.$emit('salirAbmarticulos', true)
                    // se muestra el error y se mantiene en el componente
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmarticulos')
                    }
                })
            }
            // Edicion de los datos de articulos y vuelta al componente principal
            if(this.abmAccion == 'Editar') {
                this.editarDatos('articulos', this.abmId, this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.$fire({
                            title: "Editado!",
                            showConfirmButton: false,
                            type: "success",
                            timer: 1000
                        });
                        this.$emit('salirAbmarticulos', true)
                    // Se muestra el error mientras esta en el componente
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmarticulos')
                    }
                })
            }
        },
        cancelar() {
            // Volver al componente principal
            this.$emit('salirAbmarticulos', false)
        }
    }
}
</script>