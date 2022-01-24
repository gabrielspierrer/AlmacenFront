<template>
    <div class="container">
        <h2>{{ abmAccion }}</h2>
        
        <div class="d-flex flex-column justify-content-center align-items-center gap-2">
            <div class="form-floating">
                <input @keyup.enter="aceptar()" v-model="datos.nombre" type="text" class="form-control" id="floatingNombre" placeholder="Nombre" ref="nombre">

                <label for="floatingNombre">Nombre</label>

                <div v-if="error && error.nombre" class="alert alert-danger">
                    {{ error.nombre[0] }}
                </div>
            </div>
        
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
        this.$refs.nombre.focus();
    },
    created() {
        this.traerDatos();
    },
    methods: {
        traerDatos() {
            if(this.abmAccion != 'Ingresar') {
                this.obtenerDatosId('rubros', this.abmId)
                .then(res => {
                    this.datos = res
                })
            }
        },
        aceptar() {
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
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmrubros')
                    }
                })
            }
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
                    }else {
                        this.error = res
                        this.$emit('mostrarAbmrubros')
                    }
                })
            }
        },
        cancelar() {
            this.$emit('salirAbmrubros', false)
        }
    }
}
</script>