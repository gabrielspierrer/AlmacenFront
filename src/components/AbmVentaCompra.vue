<template>
    <div class="container">
        <hr>
        <h3>{{ abmAccion }} de Articulos</h3>
        <br>
        <div class="form-group row">
            <label for="Articulo" class="col-sm-2 col-form-label fw-bold">Articulo</label>
            <div class="col-sm-10">
                <select v-model="datos.articulo_id" @click="precio()" class="form-select">
                    <option v-for="(articulo, index) in articulos" :key="index" :value="articulo.id">{{ articulo.nombre }}</option>
                </select>
                <div v-if="error && error.articulo_id" class="alert alert-danger">
                    {{ error.articulo_id[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Cantidad" class="col-sm-2 col-form-label fw-bold">Cantidad</label>
            <div class="col-sm-10">
                <input type="number" v-model="datos.cantidad" class="form-control">
                <div v-if="error && error.cantidad" class="alert alert-danger">
                    {{ error.cantidad[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <label for="Precio" class="col-sm-2 col-form-label fw-bold">Precio</label>
            <div class="col-sm-10">
                <input type="number" v-model="datos.precio" class="form-control" disabled>
                <div v-if="error && error.precio" class="alert alert-danger">
                    {{ error.precio[0] }}
                </div>
            </div>
        </div>
        <br>
        <div class="d-grid gap-5 d-md-flex justify-content-md-end">
            <button @click="ingresarArticulo()" class="btn btn-primary me-md-1">Ingresar Articulo</button>
            <button @click="crearComprobante()" class="btn btn-success">Crear Comprobante</button>
            <button @click="salir()" class="btn btn-secondary">Salir</button>
        </div>
        <br>
        <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ventacompra, index) in ventaCompras" :key="index">
                        <td>{{ ventacompra.articulo.nombre }}</td>
                        <td>{{ ventacompra.cantidad }}</td>
                        <td>{{ ventacompra.precio }}</td>
                        <td>
                            <button @click="eliminar(ventacompra.id)" class="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        <hr>
    </div>
</template>

<script>
import ApiRest from './ApiRest.vue'

export default {
    props: ['abmAccion'],
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
            ventaCompras: [],
        }
    },
    created() {
        this.traerDatos()
    },
    methods: {
        precio() {
            this.obtenerDatosId('articulos', this.datos.articulo_id)
            .then(res => {
                this.datos.precio = res.precio
            })
        },
        traerDatos() {
            this.obtenerDatos('articulos')
            .then(res => {
                this.articulos = res
            })
            this.obtenerDatos('venta_compras')
            .then(res => {
                this.ventaCompras = res
            })
        },
        eliminar(id) {
            this.$confirm("Estas seguro?").then(() => {
                this.eliminarDatos('venta_compras', id)
                this.traerDatos()
                this.$alert("Articulo Eliminado");
            }).catch(() => {});
        },
        ingresarArticulo() {
            var precio = this.datos.cantidad*this.datos.precio
            this.datos.precio = precio
            this.ingresarDatos('venta_compras', this.datos)
            .then(res => {
                if(res.validar == true) {
                    this.traerDatos()
                    this.precio()
                    this.error = {}
                    this.$alert("Articulo Añadido");
                }else {
                    this.precio()
                    this.error = res
                    this.$alert("Articulo No Añadido");
                }
            })
        },
        crearComprobante() {
            if (this.ventaCompras.length === 0) {
                this.$alert("No hay articulos para crear el comprobante");
            }else {
                this.obtenerDatosId('ventacompra', this.abmAccion)
                .then(res => {
                    if (res.respuesta == true) {
                        this.$alert("Comprobante creado, total: $"+res.total);
                        this.$emit('salirAbmVentaCompra', true)
                    }else {
                        this.$alert("No se pudo completar la operacion");
                    }
                })
            }
        },
        salir() {
            if (this.ventaCompras.length === 0) {
                this.$emit('salirAbmVentaCompra', false)
            }else {
                this.$confirm("Estas seguro que deseas salir? Si sales perderas los datos de la "+this.abmAccion).then(() => {
                this.obtenerDatos('borrar')
                this.$emit('salirAbmVentaCompra', false)
            }).catch(() => {});
            }
        }
    }
}
</script>
