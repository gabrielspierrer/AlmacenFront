<template>
    <div class="container">
        <!-- Titulo principal -->
        <h2>Venta</h2>

        <!-- Contenedor de formulario y botones -->
        <div class="d-flex flex-row justify-content-center align-items-start gap-2">

            <!-- Articulo -->
            <div class="form-floating">
                <b-form-input v-model="datos.articulo_id" id="floatingArticulo" placeholder="Articulo" list="art-list" ref="articulo"></b-form-input>
                <b-form-datalist id="art-list">
                    <option v-for="(articulo, index) in articulos" :key="index" :value="articulo.id">{{ articulo.nombre }}</option>
                </b-form-datalist>

                <label for="floatingArticulo">Articulo</label>

                <div v-if="error && error.articulo_id" class="alert alert-danger">
                    {{ error.articulo_id[0] }}
                </div>
            </div>

            <!-- Cantidad -->
            <div class="form-floating">
                <input @keyup.enter="ingresarArticulo()" v-model="datos.cantidad" type="text" class="form-control" id="floatingCantidad" placeholder="Cantidad">

                <label for="floatingCantidad">Cantidad</label>

                <div v-if="error && error.cantidad" class="alert alert-danger">
                    {{ error.cantidad[0] }}
                </div>
            </div>

            <!-- Botones de opciones -->
            <button @click="ingresarArticulo()" class="btn btn-primary" title="Añadir articulo">
                <img src="../assets/create.svg" alt="create">
            </button>

            <button @click="crearComprobante()" class="btn btn-success" title="Crear comprobante">
                <img src="../assets/comprobante.svg" alt="comprobante">
            </button>

            <button @click="salir()" class="btn btn-secondary" title="Salir">
                <img src="../assets/salir.svg" alt="salir">
            </button>
        </div>
            
        <!-- Tabla con los detalles de la venta -->
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(venta, index) in ventas" :key="index">
                    <td>{{ venta.articulo.nombre }}</td>
                    <td>{{ venta.cantidad }}</td>
                    <td>{{ venta.precio }}</td>
                    <td>
                        <!-- Boton para eliminar un articulo -->
                        <button @click="eliminar(venta.id)" class="btn btn-danger" title="Eliminar">
                            <img src="../assets/delete.svg" alt="delete">
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Total de la venta -->
        <h3 class="text-center">Total {{ total }}</h3>
    </div>
</template>

<script>
import ApiRest from './ApiRest.vue'

export default {
    mixins: [ApiRest],
    data() {
        return {
            datos: {
                articulo_id: '',
                cantidad: '',
                precio: '',
            },
            error: {},
            articulos: [],
            ventas: [],
            p: 0,
            total: 0,
        }
    },
    mounted() {
        // Focus en el input de articulo
        this.$refs.articulo.focus();
    },
    created() {
        this.traerDatos();
    },
    methods: {
        traerDatos() {
            // Traer los articulos y los datos de la venta
            this.obtenerDatos('articulos')
            .then(res => {
                this.articulos = res
                this.obtenerDatos('ventas')
                .then(res => {
                    this.ventas = res
                    this.sumaPrecio()
                })
            })
        },
        sumaPrecio() {
            // Calcular el total de la venta
            let t = 0
            for (let i = 0; i < this.ventas.length; i++) {
                t += parseFloat(this.ventas[i].precio)
            }
            this.total = t.toFixed(2)
        },
        precio() {
            // Obtener el precio del articulo
            for (let i = 0; i < this.articulos.length; i++) {
                if (this.articulos[i].id == this.datos.articulo_id) {
                    this.p = this.articulos[i].precio
                }
            }
        },
        eliminar(id) {
            // Verificar antes de eliminar un articulo
            this.$fire({
                title: "Estas seguro?",
                text: "No podras volver atras",
                type: "warning",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    this.eliminarDatos('ventas', id)
                    this.traerDatos()
                    this.$fire({
                        title: "Eliminado!",
                        showConfirmButton: false,
                        type: "success",
                        timer: 1000
                    });
                }
            });
        },
        ingresarArticulo() {
            // Se calcula el precio total de la venta y despues se ingresa
            this.precio();
            let pre = this.datos.cantidad*this.p;
            this.datos.precio = pre.toFixed(2);
            this.ingresarDatos('ventas', this.datos)
            .then(res => {
                if(res.validar == true) {
                    this.traerDatos()
                    this.error = {}
                    this.datos = {}
                    this.$refs.articulo.focus();
                    this.$fire({
                        title: "Articulo añadido!",
                        showConfirmButton: false,
                        type: "success",
                        timer: 1000
                    });
                // Se muestra el mensaje de error
                }else {
                    this.error = res
                }
            })
        },
        crearComprobante() {
            // Se verifica si no hay articulos en la venta
            if (this.ventas.length == 0) {
                this.$fire({
                    title: "No hay articulos!",
                    showConfirmButton: false,
                    type: 'error',
                    timer: 1000
                });
            // Se genera el comprobante de la venta con todos los detalles y se vuelve al componente principal
            }else {
                this.obtenerDatos('venta')
                .then(res => {
                    if (res.respuesta == true) {
                        this.$fire({
                            title: "Comprobante creado!",
                            text: "Total "+res.total,
                            showConfirmButton: false,
                            type: 'success',
                            timer: 2000
                        });
                        this.$emit('salirAbmVenta', true)
                    // Si algo sale mal se muestra este mensaje
                    }else {
                        this.$fire({
                            title: "No se pudo completar la operacion!",
                            showConfirmButton: false,
                            type: 'error',
                            timer: 1000
                        });
                    }
                })
            }
        },
        salir() {
            // Volver al componente principal
            this.$emit('salirAbmVenta')
        }
    }
}
</script>