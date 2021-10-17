import Vue from 'vue'
import VueRouter from 'vue-router'
import Articulo from '../views/Articulo.vue'
import Comprobante from '../views/Comprobante.vue'
import Rubro from '../views/Rubro.vue'
import VentaCompra from '../views/VentaCompra.vue'
import Inventario from '../views/Inventario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'VentaCompra',
    component: VentaCompra
  },
  {
    path: '/articulos',
    name: 'Articulo',
    component: Articulo
  },
  {
    path: '/rubros',
    name: 'Rubro',
    component: Rubro
  },
  {
    path: '/comprobantes',
    name: 'Comprobante',
    component: Comprobante
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: Inventario
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
