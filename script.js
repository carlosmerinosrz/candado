import { Modelo } from './modelo/modelo.js'
import { Vista } from './vista/vista.js'
import { Candado } from './vista/vcandado.js'

/**
 * Controlador principal que gestiona las vistas y el modelo.
 */
class Controlador {
  /**
   * Crea un Controlador.
   */
  constructor () {
    /** @type {Modelo} */
    this.modelo = new Modelo()
    const divCandado = document.getElementById('divCandado')
    this.vistas = new Map()
    this.vistas.set(Vista.vcandado, new Candado(this, divCandado))
  }

  /**
   * Muestra una vista específica.
   * @param {Vista} vista - La vista a mostrar.
   */
  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)
  }

  /**
   * Oculta todas las vistas.
   */
  ocultarVistas () {
    for (const vista of this.vistas.values()) {
      vista.mostrar(false)
    }
  }
}

/**
 * Se ejecuta cuando se carga la ventana.
 */
window.onload = () => {
  new Controlador()
}
