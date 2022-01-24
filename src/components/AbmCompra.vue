<template>
    <div class="container">
        <h2>Compra</h2>

        <div class="d-flex flex-row justify-content-center align-items-start gap-2">
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

            <div class="form-floating">
                <input @keyup.enter="ingresarArticulo()" v-model="datos.cantidad" type="text" class="form-control" id="floatingCantidad" placeholder="Cantidad">

                <label for="floatingCantidad">Cantidad</label>

                <div v-if="error && error.cantidad" class="alert alert-danger">
                    {{ error.cantidad[0] }}
                </div>
            </div>

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
                <tr v-for="(compra, index) in compras" :key="index">
                    <td>{{ compra.articulo.nombre }}</td>
                    <td>{{ compra.cantidad }}</td>
                    <td>{{ compra.precio }}</td>
                    <td>
                        <button @click="eliminar(compra.id)" class="btn btn-danger" title="Eliminar">
                            <img src="../assets/delete.svg" alt="delete">
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

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
            compras: [],
            p: 0,
            total: 0,
        }
    },
    mounted() {
        this.$refs.articulo.focus();
    },
    created() {
        this.traerDatos();
    },
    methods: {
        traerDatos() {
            this.obtenerDatos('articulos')
            .then(res => {
                this.articulos = res
                this.obtenerDatos('compras')
                .then(res => {
                    this.compras = res
                    this.sumaPrecio()
                })
            })
        },
        sumaPrecio() {
            let t = 0
            for (let i = 0; i < this.compras.length; i++) {
                t += parseFloat(this.compras[i].precio)
            }
            this.total = t.toFixed(2)
        },
        precio() {
            for (let i = 0; i < this.articulos.length; i++) {
                if (this.articulos[i].id == this.datos.articulo_id) {
                    this.p = this.articulos[i].precio
                }
            }
        },
        eliminar(id) {
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
                    this.eliminarDatos('compras', id)
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
            this.precio();
            let pre = this.datos.cantidad*this.p;
            this.datos.precio = pre.toFixed(2);
            this.ingresarDatos('compras', this.datos)
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
                }else {
                    this.error = res
                }
            })
        },
        crearComprobante() {
            if (this.compras.length == 0) {
                this.$fire({
                    title: "No hay articulos!",
                    showConfirmButton: false,
                    type: 'error',
                    timer: 1000
                });
            }else {
                this.obtenerDatos('compra')
                .then(res => {
                    if (res.respuesta == true) {
                        this.$fire({
                            title: "Comprobante creado!",
                            text: "Total "+res.total,
                            showConfirmButton: false,
                            type: 'success',
                            timer: 2000
                        });
                        this.$emit('salirAbmCompra', true)
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
            this.$emit('salirAbmCompra')
        }
    }
}
</script>