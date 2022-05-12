var crucigrama = [
    {
        termino: ['Percepción visual'],
        definicion:
            'Proceso activo con el cual el cerebro puede transformar la información lumínica captada por el ojo en una recreación de la realidad externa.',
    },
    {
        termino: ['Procesamiento visual'],
        definicion: 'Proceso en el que el cerebro se encarga de compensar movimiento y variaciones en luminosidad.',
    },
    {
        termino: ['Ángulo de visión'],
        definicion:
            'Ángulo definido por los bordes del objeto percibido y el ojo (cantidad que un objeto ocupa el área visual).',
    },
    {
        termino: ['Agudeza visual'],
        definicion: 'Capacidad para percibir detalles.',
    },
    {
        termino: ['Pistas visuales'],
        definicion: 'Ayudas visuales que permiten tener percepción del tamaño y la profundidad.',
    },
    {
        termino: ['Luminosidad'],
        definicion: 'Reacción subjetiva a los niveles de luz, afectada por la luminancia y el contraste.',
    },
    {
        termino: ['Contraste'],
        definicion: 'Relación entre la luminancia de un objeto y de la luminancia del fondo.',
    },
    {
        termino: ['Luminancia'],
        definicion:
            'Cantidad de luz emitida por un objeto, que depende de la cantidad de luz que incide en un objeto y su reflectividad.',
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
