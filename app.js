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
      if(this.propiedad == 'Propio') {
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
const btnAtkFis = document.querySelector('#btn-atk-fis');
const btnAtkEsp = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
  let min = Math.ceil(0);
  let max = Math.floor(1001);

  return Math.floor(Math.random() * (max - min) + min);
}

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
  [1/2, 1/2, 1, 1, 1/2, 1, 1/2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1/2, 1, 1/2, 1, 1, 2, 1, 1, 1, 1, 1/2, 1, 2, 1, 2, 1, 1],
  [1/2, 1, 1, 1, 1, 1/2, 1/2, 1/2, 1, 1/2, 1, 2, 2, 1, 2, 1, 1/2, 1/2],
  [1/2, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 1/2, 1/2, 1, 1, 1, 1, 1, 1/2, 1, 1, 1, 0, 1, 2],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 2, 1, 1/2, 1, 1, 1],
  [2, 1/2, 2, 1/2, 1, 1, 1/2, 1, 2, 1, 1, 2, 1, 1/2, 1, 1, 1, 1],
  [1/2, 1, 1, 2, 1, 1, 1/2, 1, 1, 2, 1, 1, 1, 1, 2, 1/2, 1],
  [1/2, 1/2, 1, 2, 1, 1, 1/2, 1, 1/2, 1, 1, 2, 1, 1, 1, 2, 1, 2],
  [2, 1, 1/2, 1, 1, 0, 1, 1/2, 2, 1, 2, 1, 1/2, 2, 2, 1, 1/2, 1/2],
  [1/2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1/2, 1, 1, 1, 1],
  [1/2, 2, 1/2, 1/2, 1, 1, 1/2, 1, 1, 1, 1, 1/2, 1, 2, 1, 2, 1/2, 1/2],
  [1/2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1/2, 1, 0, 1, 2, 1],
  [1/2, 1, 2, 1, 1, 1, 2, 1, 2, 1/2, 1, 1, 1, 1, 1, 1/2, 1, 2],
  [1, 1, 1, 1, 1, 2, 1, 1/2, 1, 1/2, 1, 1, 2, 1, 1/2, 1, 1, 1],
  [2, 1, 1/2, 1, 2, 1, 2, 1, 1, 1, 1, 1/2, 1, 2, 1, 1, 2, 0],
  [0, 1, 1, 1, 1, 1/2, 1, 2, 1, 1, 1, 2, 1, 1/2, 1, 1/2, 1/2, 1],
  [1/2, 1, 2, 1, 1/2, 1, 1, 1, 1, 2, 1, 2, 1, 1/2, 1, 1, 1, 1]
];

const combate = () => {
}

window.addEventListener('load', () => PokeRival.obtenerPoke());
btnElegir.addEventListener('click', () => {
  if (btnElegir.textContent == 'Elegir poke') {
    PokePropio.obtenerPoke();
    input.remove();
    btnElegir.textContent ='Reiniciar';
  } else {
    location.reload();
  }
});

btnPelear.addEventListener();

