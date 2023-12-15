/**
 * Clase Vista que gestiona la visualización de elementos
 */
export class Vista {
  /**
   * @type {symbol} vcandado - Identificador para el elemento Candado
   * @static
   */
  static vcandado = Symbol('Candado')

  /**
   * Crea una instancia de Vista
   * @param {Controlador} controlador - El controlador asociado a la vista
   * @param {HTMLElement} base - El elemento base de la vista
   */
  constructor (controlador, base) {
    /**
     * El controlador asociado a la vista
     * @type {Controlador}
     */
    this.controlador = controlador

    /**
     * El elemento base de la vista
     * @type {HTMLElement}
     */
    this.base = base
  }

  /**
   * Muestra u oculta la vista
   * @param {boolean} ver - Indica si se debe mostrar la vista (true) u ocultarla (false)
   */
  mostrar (ver) {
    if (ver) { this.base.style.display = 'block' } else { this.base.style.display = 'none' }
  }
}
