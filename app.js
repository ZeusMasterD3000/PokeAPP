class Pokemon {
  constructor(propiedad) {
    this.propiedad = propiedad;
    this.img = document.querySelector(`#poke${propiedad}`);
    this.nombre = document.querySelector(`#nombre${propiedad}`);
    this.tipo1 = document.querySelector(`#tipo1${propiedad}`);
    this.tipo2 = document.querySelector(`#tipo2${propiedad}`);
    this.atkFis = document.querySelector(`#ataqueFis${propiedad}`);
    this.atkEsp = document.querySelector(`#ataqueEsp${propiedad}`);
    this.vida = document.querySelector(`#vida${propiedad}`);
    this.defensaEsp = document.querySelector(`#defensaEsp${propiedad}`);
    this.defensaFis = document.querySelector(`#defensaFis${propiedad}`);
    this.velocidad = document.querySelector(`#velocidad${propiedad}`);
    this.table = document.querySelector(`#ima${propiedad}`);
  }

  obtenerPoke() {
    let num;
    if (this.propiedad == 'Propio') {
      num = input.value;
    } else if (this.propiedad == 'Rival') {
      num = getNumRandom();
    }

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) => {
      return res.data
    }).then((res) => {
      this.table.src = res.sprites.front_default;
      if (this.propiedad == 'Propio') {
        this.img.src = res.sprites.back_default;
      } else {
        this.img.src = res.sprites.front_default;
      }
      this.nombre.innerHTML = res.name;
      this.tipo1.innerHTML = res.types[0].type.name;
      if (res.types[1] != undefined) {
        this.tipo2.innerHTML = res.types[1].type.name;
      }
      this.vida.innerHTML = res.stats[0].base_stat;
      this.atkFis.innerHTML = res.stats[1].base_stat;
      this.defensaFis.innerHTML = res.stats[2].base_stat;
      this.atkEsp.innerHTML = res.stats[3].base_stat;
      this.defensaEsp.innerHTML = res.stats[4].base_stat;
      this.velocidad.innerHTML = res.stats[5].base_stat;
    })
  }
}

//Interfaz de usuario
const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnBatalla = document.querySelector('#btn-battle');
const btnAtkFis = document.querySelector('#btn-atk-fis');
const btnAtkEsp = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
  let min = Math.ceil(0);
  let max = Math.floor(1001);

  return Math.floor(Math.random() * (max - min) + min);
}

let turnoPropio;
const PokePropio = new Pokemon('Propio');
const PokeRival = new Pokemon('Rival');

//Combate, el pokemon perdedor será el que se le acabe primero su vida.
//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemon defensor
//En caso de que el resultado de la resta sea negativo o cero, se va a dejar un 1 como el resultado minimo de la resta
//El pokemon que tenga más velocidad va a pegar primero
//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias
//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;
//Se turnarán los pokemon hasta que haya un ganador
//Mostrar el ganador

const tiposPoke = new Map();
tiposPoke.set("steel", 0);
tiposPoke.set("water", 1);
tiposPoke.set("bug", 2);
tiposPoke.set("dragon", 3);
tiposPoke.set("electric", 4);
tiposPoke.set("ghost", 5);
tiposPoke.set("fire", 6);
tiposPoke.set("fairy", 7);
tiposPoke.set("ice", 8);
tiposPoke.set("fighting", 9);
tiposPoke.set("normal", 10);
tiposPoke.set("grass", 11);
tiposPoke.set("psychic", 12);
tiposPoke.set("rock", 13);
tiposPoke.set("dark", 14);
tiposPoke.set("ground", 15);
tiposPoke.set("poison", 16);
tiposPoke.set("flying", 17);

const tabla_ataque = [
  [1 / 2, 1 / 2, 1, 1, 1 / 2, 1, 1 / 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1 / 2, 1, 1 / 2, 1, 1, 2, 1, 1, 1, 1, 1 / 2, 1, 2, 1, 2, 1, 1],
  [1 / 2, 1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2, 1, 1 / 2, 1, 2, 2, 1, 2, 1, 1 / 2, 1 / 2],
  [1 / 2, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 1 / 2, 1 / 2, 1, 1, 1, 1, 1, 1 / 2, 1, 1, 1, 0, 1, 2],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 2, 1, 1 / 2, 1, 1, 1],
  [2, 1 / 2, 2, 1 / 2, 1, 1, 1 / 2, 1, 2, 1, 1, 2, 1, 1 / 2, 1, 1, 1, 1],
  [1 / 2, 1, 1, 2, 1, 1, 1 / 2, 1, 1, 2, 1, 1, 1, 1, 2, 1 / 2, 1],
  [1 / 2, 1 / 2, 1, 2, 1, 1, 1 / 2, 1, 1 / 2, 1, 1, 2, 1, 1, 1, 2, 1, 2],
  [2, 1, 1 / 2, 1, 1, 0, 1, 1 / 2, 2, 1, 2, 1, 1 / 2, 2, 2, 1, 1 / 2, 1 / 2],
  [1 / 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1, 1, 1],
  [1 / 2, 2, 1 / 2, 1 / 2, 1, 1, 1 / 2, 1, 1, 1, 1, 1 / 2, 1, 2, 1, 2, 1 / 2, 1 / 2],
  [1 / 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1 / 2, 1, 0, 1, 2, 1],
  [1 / 2, 1, 2, 1, 1, 1, 2, 1, 2, 1 / 2, 1, 1, 1, 1, 1, 1 / 2, 1, 2],
  [1, 1, 1, 1, 1, 2, 1, 1 / 2, 1, 1 / 2, 1, 1, 2, 1, 1 / 2, 1, 1, 1],
  [2, 1, 1 / 2, 1, 2, 1, 2, 1, 1, 1, 1, 1 / 2, 1, 2, 1, 1, 2, 0],
  [0, 1, 1, 1, 1, 1 / 2, 1, 2, 1, 1, 1, 2, 1, 1 / 2, 1, 1 / 2, 1 / 2, 1],
  [1 / 2, 1, 2, 1, 1 / 2, 1, 1, 1, 1, 2, 1, 2, 1, 1 / 2, 1, 1, 1, 1]
];

// Alternar fondos del campo de batalla
let fondoAlternado = false;

btnBatalla.addEventListener('click', () => {
  if (!PokePropio.nombre.innerHTML) {
    alert('Por favor, selecciona un Pokémon antes de iniciar la batalla.');
    return; // Salir si no se ha seleccionado un Pokémon
  }
  const arena = document.querySelector('#arena');

  // Cambiar el fondo al presionar "Batalla"
  arena.classList.toggle('background-1', fondoAlternado);
  arena.classList.toggle('background-2', !fondoAlternado);

  fondoAlternado = !fondoAlternado;

  // Reemplazar botones después de iniciar la batalla
  mostrarOpcionesDeAtaque();
});

// Función para reemplazar los botones por "Ataque Físico" y "Ataque Especial"
const mostrarOpcionesDeAtaque = () => {
  // Seleccionar contenedor de botones
  const UI = document.querySelector('#UI');

  // Limpiar UI para evitar duplicación
  UI.innerHTML = '';

  // Crear botón de Ataque Físico
  const btnAtaqueFisico = document.createElement('button');
  btnAtaqueFisico.id = 'btn-atk-fis';
  btnAtaqueFisico.textContent = 'Ataque Físico';
  UI.appendChild(btnAtaqueFisico);

  // Crear botón de Ataque Especial
  const btnAtaqueEspecial = document.createElement('button');
  btnAtaqueEspecial.id = 'btn-atk-esp';
  btnAtaqueEspecial.textContent = 'Ataque Especial';
  UI.appendChild(btnAtaqueEspecial);

  // Determinar el turno inicial basado en la velocidad
  if (+PokePropio.velocidad.innerHTML >= +PokeRival.velocidad.innerHTML) {
    turnoPropio = true;
  } else {
    turnoPropio = false;
    // Si el rival tiene el primer turno, ejecuta su ataque de forma automática
    setTimeout(() => ataque(getNumRandom() % 2 === 0), 500);
  }

  // Habilitar o deshabilitar botones dependiendo del turno
  btnAtaqueFisico.disabled = !turnoPropio;
  btnAtaqueEspecial.disabled = !turnoPropio;

  // Añadir eventos a los botones
  btnAtaqueFisico.addEventListener('click', () => {
    if (turnoPropio) {
      ataque(true);
      btnAtaqueFisico.disabled = true;
      btnAtaqueEspecial.disabled = true;
    }
  });

  btnAtaqueEspecial.addEventListener('click', () => {
    if (turnoPropio) {
      ataque(false);
      btnAtaqueFisico.disabled = true;
      btnAtaqueEspecial.disabled = true;
    }
  });
};

const ataque = (ataqueFisico) => {
  let atacante = turnoPropio ? PokePropio : PokeRival;
  let defensor = turnoPropio ? PokeRival : PokePropio;

  let indiceAtacante = tiposPoke.get(atacante.tipo1.innerHTML);
  let indiceDefensor = tiposPoke.get(defensor.tipo1.innerHTML);

  let multiplicador = tabla_ataque[indiceAtacante][indiceDefensor];
  if (defensor.tipo2.innerHTML) {
    let indiceTipoSecundario = tiposPoke.get(defensor.tipo2.innerHTML);
    multiplicador *= tabla_ataque[indiceAtacante][indiceTipoSecundario];
  }

  let danoBase = ataqueFisico
    ? +atacante.atkFis.innerHTML - +defensor.defensaFis.innerHTML
    : +atacante.atkEsp.innerHTML - +defensor.defensaEsp.innerHTML;

  danoBase = Math.max(danoBase, 1);
  let danoFinal = danoBase * multiplicador;

  // Actualizar vida del defensor
  defensor.vida.innerHTML = Math.max(+defensor.vida.innerHTML - danoFinal, 0);

  // Verifica si el defensor ha perdido
  if (+defensor.vida.innerHTML <= 0) {
    alert(`¡${atacante.nombre.innerHTML} ha ganado la batalla!`);
    finalizarBatalla();
    return;
  }

  // Cambiar turno
  turnoPropio = !turnoPropio;

  // Habilitar o deshabilitar botones dependiendo del turno
  const btnAtaqueFisico = document.querySelector('#btn-atk-fis');
  const btnAtaqueEspecial = document.querySelector('#btn-atk-esp');
  btnAtaqueFisico.disabled = !turnoPropio;
  btnAtaqueEspecial.disabled = !turnoPropio;

  // Si es turno del rival, ejecuta su ataque automáticamente
  if (!turnoPropio) {
    setTimeout(() => ataque(getNumRandom() % 2 === 0), 500);
  }
};

const finalizarBatalla = () => {
  const UI = document.querySelector('#UI');
  UI.innerHTML = ''; // Limpia los botones de ataque

  // Mostrar botón para reiniciar la batalla
  const reiniciarBtn = document.createElement('button');
  reiniciarBtn.textContent = 'Reiniciar Batalla';
  reiniciarBtn.addEventListener('click', () => location.reload());
  UI.appendChild(reiniciarBtn);
};

window.addEventListener('load', () => PokeRival.obtenerPoke());
btnElegir.addEventListener('click', () => {
  if (btnElegir.textContent == 'Elegir poke') {
    PokePropio.obtenerPoke();
    input.remove();
    btnElegir.textContent = 'Reiniciar';
  } else {
    location.reload();
  }
});

btnPelear.addEventListener();