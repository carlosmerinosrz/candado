import { Vista } from './vista.js'
/**
 * Clase que representa un candado como una extensión de la vista.
 */
export class Candado extends Vista {
  /**
   * Crea un nuevo candado.
   * @param {Controlador} controlador - El controlador asociado al candado.
   * @param {HTMLElement} base - El elemento base del candado.
   */
  constructor (controlador, base) {
    super(controlador, base)

    const numbers = document.querySelectorAll('.number-central')
    numbers.forEach(number => {
      number.addEventListener('wheel', event => {
        const centralDiv = number
        const arribaDiv = centralDiv.previousElementSibling
        const abajoDiv = centralDiv.nextElementSibling

        if (event.deltaY > 0) {
          abajoDiv.textContent = centralDiv.textContent
          centralDiv.textContent = arribaDiv.textContent
          arribaDiv.textContent = (parseInt(centralDiv.textContent) % 9) + 1
        } else if (event.deltaY < 0) {
          arribaDiv.textContent = centralDiv.textContent
          centralDiv.textContent = abajoDiv.textContent
          abajoDiv.textContent = parseInt(centralDiv.textContent) === 1 ? 9 : parseInt(centralDiv.textContent) - 1
        }
      })
    })

    this.btnComprobar = this.base.querySelectorAll('button')[0]
    this.btnComprobar.onclick = this.comprobarCodigo.bind(this)
  }
  /**
   * Comprueba el código ingresado por el usuario.
   */

  comprobarCodigo () {
    const numeroCodigo = Array.from(document.querySelectorAll('.number-central')).map(div => parseInt(div.textContent))
    const divNumeros = document.querySelectorAll('.number-central')

    this.verificarCodigoServidor(numeroCodigo)
      .then(respuesta => {
        if (respuesta === true) {
          this.mostrarMensaje('¡Código correcto! 🎉')
          divNumeros.forEach(div => {
            div.style.boxShadow = '0 0 10px green'
          })
        } else {
          this.mostrarMensaje('Código incorrecto. Inténtalo de nuevo.')
          divNumeros.forEach(div => {
            div.style.boxShadow = '0 0 10px red'
          })
        }
      })
      .catch(error => {
        console.error('Error al comprobar el código:', error)
        this.mostrarMensaje('Hubo un error al comprobar el código.')
      })
  }

  /**
   * Verifica el código del candado en el servidor.
   * @param {number[]} codigo - El código a verificar en el servidor.
   * @returns {Promise<boolean>} - Una promesa que resuelve con un booleano que indica si el código es correcto o no.
   */
  verificarCodigoServidor (codigo) {
    return new Promise((resolve, reject) => {
      fetch('vista/consulta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(codigo)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          resolve(data.status === 'success')
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**
   * Muestra un mensaje en la interfaz.
   * @param {string} texto - El texto del mensaje a mostrar.
   */
  mostrarMensaje (texto) {
    const mensaje = document.getElementById('mensaje')
    mensaje.textContent = texto
  }
}
