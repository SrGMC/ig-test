var crucigrama = [
    {
        termino: ['Transformación geométrica'],
        definicion: 'Variación del tamaño, forma, posición y orientación de un objeto dentro de una escena',
    },
    {
        termino: ['Traslación'],
        definicion: 'Transformación que cambia la posición de un objeto a lo largo de una línea recta.',
    },
    {
        termino: ['Escalado'],
        definicion: 'Transformación que altera de las dimensión de un objeto.',
    },
    {
        termino: ['Rotación'],
        definicion: 'Transformación que cambia la orientación de un objeto.',
    },
    {
        termino: ['Sistema de coordenadas homogéneas'],
        definicion:
            'Sistema de representación de coordenadas que permite simplificar los cálculos y las operaciones de transformaciones geométricas. Un punto en 2D se representa por (xW, yW, W). Cuando W no es 1, se dividen todas los valores por W para obtener unas coordenadas del tipo (x, y, W).',
    },
    {
        termino: ['Transformaciones afines'],
        definicion: 'Producto de una secuencia arbitraria de matrices de rotación, traslación y escalamiento',
    },
    {
        termino: ['Composición de transformaciones'],
        definicion: 'Secuencia arbitraria de transformaciones con respecto a los ejes x, y, z.',
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
