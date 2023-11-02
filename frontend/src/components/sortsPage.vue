<template>
  <body>
    <div class="general-container">
      <h1 style="font-size: 5rem">Algoritmos SORTS</h1>
      <p>Tiempo: {{ elapsed_time }}</p>

      <div class="buttons">
        <button class="button-52" @click="bubbleSort()">Bubble Sort</button>
        <button class="button-52" @click="selectionSort()">
          Selection Sort
        </button>
        <button class="button-52" @click="insertionSort()">
          Insertion Sort
        </button>
        <button class="button-52" @click="mergeSortInit()">Merge Sort</button>
        <button class="button-52" @click="quickSortInit()">Quick Sort</button>

        <button class="button-52" @click="fillArray()">Mezclar</button>
        <button class="button-52" @click="volver()">Volver</button>
      </div>
      <input
        id="numberInput"
        type="number"
        v-model="size"
        @input="fillArray()"
        min="2"
        max="200"
      />
      <div class="contenedor-entrada">
        <input
        type="number"
        min="2"
        max="1000"
        v-model="numeroAgregar"
        />
        <button class="button-52" @click="addToArray(this.numeroAgregar)">Agregar</button>
   
       
      </div>
      

      <div class="container">
        <div
          class="bar-container"
          v-for="(number, index) in array"
          :key="index"
          :style="{ width: getWidth() + 'px' }"
        >
          <span class="bar-number">{{ number }}</span>
          <div class="bar" :style="{ height: number + 'px' }"></div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      numeroAgregar: 0,
      array: [],
      size: 30,
      start_time: 0,
      elapsed_time: "0.00s",
      timer: null,
      audioCtx : null,
    };
  },
  components: {},
  methods: {


    playNote(freq){
      if(this.audioCtx==null){
        /* eslint-disable no-undef */

          this.audioCtx=new(
              AudioContext || 
              webkitAudioContext || 
              window.webkitAudioContext
          )();
          /* eslint-disable no-undef */

      }
      const dur=0.1;
      const osc=this.audioCtx.createOscillator();
      osc.frequency.value=freq;
      osc.start();
      osc.stop(this.audioCtx.currentTime+dur);
      const node=this.audioCtx.createGain();
      node.gain.value=0.1;
      node.gain.linearRampToValueAtTime(
          0, this.audioCtx.currentTime+dur
      );
      osc.connect(node);
      node.connect(this.audioCtx.destination);
  },
    startTimer() {
      this.timer = setInterval(() => {
        let current_time = Date.now();
        this.elapsed_time = ((current_time - this.start_time) / 1000).toFixed(
          2
        );
      }, 100);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    resetTimer() {
      // Añadido para reiniciar el contador
      this.elapsed_time = "0.00s";
    },
    getWidth() {
      return 1000 / this.size;
    },

    addToArray(number){
      if(number<5 || number>750){
        alert("El número debe estar entre 5 y 750");
        return;
      }
      this.array.push(number);
      this.size++;
    },
    

    fillArray() {
      // populate array with random numbers between 5 and 750
      this.array = [];
      for (let i = 0; i < this.size; i++) {
        this.array.push(this.getRndInteger(5, 750));
      }
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async bubbleSort() {
      this.resetTimer(); // Añadido para reiniciar el contador
      this.start_time = Date.now();
      this.startTimer(); // Comienzo del tiempo
      let len = this.array.length;
      let checked;
      do {
        checked = false;
        for (let i = 0; i < len; i++) {
          if (this.array[i] > this.array[i + 1]) {
            let tmp = this.array[i];
            this.array[i] = this.array[i + 1];
            this.array[i + 1] = tmp;
            // sleep - to visualize / see the changes
            this.playNote(200+this.array[i]*100);
            await this.sleep();
            checked = true;
          }
        }
      } while (checked);
      let end_time = Date.now();
      this.elapsed_time =
        ((end_time - this.start_time) / 1000).toFixed(2) + "s";
      this.stopTimer();
    },
    async selectionSort() {
      this.resetTimer(); // Añadido para reiniciar el contador
      this.start_time = Date.now();
      this.startTimer(); // Comienzo del tiempo
      let len = this.array.length;
      for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
          if (this.array[j] < this.array[min]) {
            min = j;
          }
        }
        if (min !== i) {
          let tmp = this.array[i];
          this.array[i] = this.array[min];
          this.array[min] = tmp;
          this.playNote(200+this.array[i]*10);

          await this.sleep(); // para visualizar los cambios
        }
      }
      let end_time = Date.now();
      this.elapsed_time =
        ((end_time - this.start_time) / 1000).toFixed(2) + "s";
      this.stopTimer();
    },
    async insertionSort() {
      this.resetTimer(); // Añadido para reiniciar el contador
      this.start_time = Date.now();
      this.startTimer(); // Comienzo del tiempo
      let len = this.array.length;
      for (let i = 1; i < len; i++) {
        let key = this.array[i];
        let j = i - 1;
        while (j >= 0 && this.array[j] > key) {
          this.array[j + 1] = this.array[j];
          j = j - 1;

          await this.sleep(); // para visualizar los cambios
        }
        this.playNote(200+this.array[i]*10);

        this.array[j + 1] = key;
      }
      let end_time = Date.now();
      this.elapsed_time =
        ((end_time - this.start_time) / 1000).toFixed(2) + "s";
      this.stopTimer();
    },
    async mergeSortInit() {
      this.resetTimer(); // Añadido para reiniciar el contador
      this.start_time = Date.now();
      this.startTimer(); // Comienzo del tiempo
      await this.mergeSort(this.array, 0, this.array.length - 1);
      let end_time = Date.now();
      this.elapsed_time =
        ((end_time - this.start_time) / 1000).toFixed(2) + "s";
      this.stopTimer();
    },

    async mergeSort(arr, l, r) {
      if (l < r) {
        let m = Math.floor((l + r) / 2);

        await this.mergeSort(arr, l, m);
        await this.mergeSort(arr, m + 1, r);

        await this.merge(arr, l, m, r);
      }
    },

    async merge(arr, l, m, r) {
      let n1 = m - l + 1;
      let n2 = r - m;

      let L = new Array(n1);
      let R = new Array(n2);

      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

      let i = 0;
      let j = 0;
      let k = l;

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        k++;
        this.playNote(200+this.array[k]*5);

        await this.sleep();
      }

      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        await this.sleep();
      }

      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        await this.sleep();
      }
    },

    async quickSortInit() {
      this.resetTimer(); // Añadido para reiniciar el contador
      this.start_time = Date.now();
      this.startTimer(); // Comienzo del tiempo
      await this.quickSort(this.array, 0, this.array.length - 1);
      let end_time = Date.now();
      this.elapsed_time =
        ((end_time - this.start_time) / 1000).toFixed(2) + "s";
      this.stopTimer();
    },

    async quickSort(arr, low, high) {
      if (low < high) {
        let pi = await this.partition(arr, low, high);

        await this.quickSort(arr, low, pi - 1);
        await this.quickSort(arr, pi + 1, high);
      }
    },

    async partition(arr, low, high) {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
          this.playNote(100+this.array[i]*1);

          await this.sleep();
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await this.sleep();
      return i + 1;
    },

    volver() {
      this.$router.push("/");
    },
    sleep() {
      return new Promise((resolve) => setTimeout(resolve, 5));
    },
  },
  created() {
    this.fillArray();
  },
};
</script>

<style scoped>
.contenedor-entrada{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: auto;
  margin: 0;
  padding: 0;
}

body {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.general-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.container {
  margin: 5%;
  width: auto;
  height: auto;
}

.bar {
  width: 20px;
  background-color: yellowgreen;
  border-color: black 5px;
  display: inline-block;
  margin: 0 20%;
}

/* CSS */
.button-52 {
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 20px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-52:after {
  content: "";
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.button-52:hover:after {
  top: 0px;
  left: 0px;
}

@media (min-width: 768px) {
  .button-52 {
    padding: 13px 50px 13px;
  }
}

input {
  display: block;
  margin: 2em auto;
  border: none;
  padding: 0;
  width: 10.5ch;
  background: repeating-linear-gradient(
      90deg,
      dimgrey 0,
      dimgrey 1ch,
      transparent 0,
      transparent 1.5ch
    )
    0 100%/10ch 2px no-repeat;
  font: 5ch droid sans mono, consolas, monospace;
  letter-spacing: 0.5ch;
}
input:focus {
  outline: none;
  color: dodgerblue;
}

.bar-container {
  display: inline-block;
  position: relative;
  margin: 0 5px;
  vertical-align: bottom; /* Alinea la barra con otras barras en la base */
}

.bar-number {
  position: absolute;
  bottom: 100%; /* Posiciona justo arriba de la barra */
  font-size: 10px; /* O el tamaño que prefieras */
  left: 50%;
  transform: translateX(-50%); /* Centra el número horizontalmente */
  white-space: nowrap; /* Evita que los números se partan en dos líneas */
  color: black; /* Color de los números */
  margin-bottom: 2px; /* Espacio entre el número y la barra */
}
</style>
