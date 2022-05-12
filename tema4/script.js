var crucigrama = [
    {
        termino: ['Píxel'],
        definicion:
            'Mínima unidad homogénea de color (intensidad) de una imagen digital. También puede ser el área de la pantalla que tiene asociada una posición de memoria (pixel de 8 bits tiene 256 variaciones de color).',
    },
    {
        termino: ['Primitivos de salida'],
        definicion:
            'Estructuras geométricas básicas (puntos, rectas, curvas, áreas...) empleadas para generar imágenes',
    },
    {
        termino: ['Conversión al raster'],
        definicion: 'Tarea de aproximar primitivas mediante un conjunto de puntos discreto.',
    },
    {
        termino: ['Búfer de imagen'],
        definicion:
            'Área de memoria que almacena el conjunto de valores de intensidad para todos los puntos de la pantalla.',
    },
    {
        termino: ['Controlador de gráficas', 'GPU', 'Procesador de despliegue'],
        definicion: 'Chip o procesador especializado que libera a la CPU de trabajos gráficos.',
    },
    {
        termino: ['Conversión de puntos'],
        definicion: 'Proceso por el cual se determina qué pixeles se deben iluminar para representar un punto.',
    },
    {
        termino: ['Conversión de Rectas'],
        definicion: 'Proceso por el cual se determina qué pixeles se deben iluminar para representar una recta.',
    },
    {
        termino: ['Algoritmo de fuerza bruta'],
        definicion:
            'Algoritmo que calcula qué pixeles se deben iluminar para representar una recta mediante el uso de pendientes.',
    },
    {
        termino: ['Digital Differential Analyzer'],
        definicion:
            'Algoritmo que traza valores sucesivos de (x,y) incrementando simultáneamente x e y con pequeños pasos.',
    },
    {
        termino: ['Algoritmo del punto medio de Bresenham'],
        definicion:
            'Algoritmo que determina que píxeles iluminar mediante rastreo de líneas y que sólo hace uso de cálculos incrementales con enteros.',
    },
    {
        termino: ['Trazado de circunferencias'],
        definicion: 'Proceso por el cual se determina qué pixeles se deben iluminar para representar una curva.',
    },
];

var hits = 0;
var failed = [];
var current = 0;
var data = [];
var solved = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayWord() {
    solved = false;
    if (current < data.length) {
        document.querySelector('#word').value = '';
        document.querySelector('#definition').innerHTML = data[current].definicion;
        document.querySelector('#next').disabled = true;
    } else {
        document.querySelector('#definition').innerHTML = 'No hay más definiciones por responder';
        document.querySelector('#next').disabled = true;
    }
}

function checkWord() {
    var value = document
        .querySelector('#word')
        .value.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    var entry = data[current].termino;

    document.querySelector('#check').disabled = true;
    document.querySelector('#next').disabled = false;
    solved = true;
    for (let i = 0; i < entry.length; i++) {
        const termino = entry[i]
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
        if (termino == value) {
            console.log('Acierto');
            document.querySelector('#hits').innerHTML =
                '<li>' + entry[0] + '</li>' + document.querySelector('#hits').innerHTML;
            document.querySelector('#status').innerHTML = '¡Correcta!';
            document.querySelector('#status').classList.remove('red');
            document.querySelector('#status').classList.add('green');

            hits++;
            current++;

            document.querySelector('#hitsCount').innerHTML = hits;
            return;
        }
    }

    failed.push(current);
    current++;
    document.querySelector('#fails').innerHTML =
        '<li>' + entry[0] + '</li>' + document.querySelector('#fails').innerHTML;
    document.querySelector('#status').innerHTML = '¡Fallido!';
    document.querySelector('#status').classList.add('red');
    document.querySelector('#status').classList.remove('green');
    document.querySelector('#failsCount').innerHTML = failed.length;
}

function wordHandler(element) {
    if (solved) return;
    if (element.value.length > 0) {
        document.querySelector('#check').disabled = false;
    } else {
        document.querySelector('#check').disabled = true;
    }
}

function reset() {
    document.querySelector('#check').disabled = true;
    document.querySelector('#next').disabled = false;
    document.querySelector('#definition').innerHTML = 'Aquí aparecerá la definición a resolver';
    document.querySelector('#word').value = '';
    document.querySelector('#hits').innerHTML = '';
    document.querySelector('#fails').innerHTML = '';
    document.querySelector('#status').innerHTML = 'Estado';
    document.querySelector('#status').classList.remove('red');
    document.querySelector('#status').classList.remove('green');
    document.querySelector('#hitsCount').innerHTML = 0;
    document.querySelector('#failsCount').innerHTML = 0;

    data = crucigrama.slice(0);
    shuffle(data);
    failed = [];
    hits = 0;
    current = 0;
}

function resetToFailed() {
    document.querySelector('#check').disabled = true;
    document.querySelector('#next').disabled = false;
    document.querySelector('#definition').innerHTML = 'Aquí aparecerá la definición a resolver';
    document.querySelector('#word').value = '';
    document.querySelector('#fails').innerHTML = '';
    document.querySelector('#status').innerHTML = 'Estado';
    document.querySelector('#status').classList.remove('red');
    document.querySelector('#status').classList.remove('green');
    document.querySelector('#hitsCount').innerHTML = 0;
    document.querySelector('#failsCount').innerHTML = 0;

    newData = [];
    for (let i = 0; i < failed.length; i++) {
        newData.push(data[failed[i]]);
    }
    data = newData;
    shuffle(data);
    failed = [];
    current = 0;
}

reset();
