<template>
    <div class="container">
        <!-- Titulo principal -->
        <h2>{{ abmAccion }}</h2>
        
        <!-- Contenedor del formulario con los botones -->
        <div class="d-flex flex-column justify-content-center align-items-center gap-2">

            <!-- Nombre -->
            <div class="form-floating">
                <input @keyup.enter="aceptar()" v-model="datos.nombre" type="text" class="form-control" id="floatingNombre" placeholder="Nombre" ref="nombre">

                <label for="floatingNombre">Nombre</label>

                <div v-if="error && error.nombre" class="alert alert-danger">
                    {{ error.nombre[0] }}
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
            // Traer los datos del rubro si se edita
            if(this.abmAccion != 'Ingresar') {
                this.obtenerDatosId('rubros', this.abmId)
                .then(res => {
                    this.datos = res
                })
            }
        },
        aceptar() {
            // Ingresar nuevo rubro a la base de datos y volver al componente principal
            if(this.abmAccion == 'Ingresar') {
                this.ingresarDatos('rubros', this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.error = {}
                        this.$fire({
                            title: "Ingresado!",
                            showConfirmButton: false,
                            type: "success",
                            timer: 1000
                        });
                        this.$emit('salirAbmrubros', true)
                    // Mostrar error y quedarse en el componente
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmrubros')
                    }
                })
            }
            // Se actualiza el rubro especifico y luego se sale al componente principal
            if(this.abmAccion == 'Editar') {
                this.editarDatos('rubros', this.abmId, this.datos)
                .then(res => {
                    if(res.validar == true) {
                        this.$fire({
                            title: "Editado!",
                            showConfirmButton: false,
                            type: "success",
                            timer: 1000
                        });
                        this.$emit('salirAbmrubros', true)
                    // Se muestra el error y se mantiene en el componente
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmrubros')
                    }
                })
            }
        },
        cancelar() {
            // Volver al componente principal
            this.$emit('salirAbmrubros', false)
        }
    }
}
</script>