var crucigrama = [
    {
        termino: ['Luz', 'Gamut', 'Gammut', 'Gama de colores'],
        definicion:
            'Banda de longitudes (o frecuencias) de onda del espectro electromagnético, que es visible por los humanos.',
    },
    {
        termino: ['Fuente de luz blanca', 'Sol'],
        definicion:
            'Funente de luz que emite todas las frecuencias. Al incidir sobre un objeto, este absorbe algunas longitudes y refleja otras.',
    },
    {
        termino: ['Tono', 'Matiz', 'Color', 'Hue'],
        definicion: 'Longitud de onda predominante.',
    },
    {
        termino: ['Saturación'],
        definicion: 'Indica lo lejos que está un color de un gris de igual intensidad.',
    },
    {
        termino: ['Brillo', 'Luminancia'],
        definicion: 'Intensidad de la luz que se percibe.',
    },
    {
        termino: ['Luz acromática'],
        definicion: 'Luz que solo se encuentra entre blanco y negro.',
    },
    {
        termino: ['Cromaticidad'],
        definicion: 'Calidad del color considerando matiz y saturación.',
    },
    {
        termino: ['Colores primarios'],
        definicion: 'Aquellos colores que no pueden obtenerse mediante la mezcla de ningún otro.',
    },
    {
        termino: ['Colores aditivos'],
        definicion: 'Colores que al añadirse, generan blanco. Generado por luz.',
    },
    {
        termino: ['Colores substractivos'],
        definicion: 'Colores que al añadire, absorben luz. Generado por tinta.',
    },
    {
        termino: ['Colores complementarios'],
        definicion: 'Colores cuya combinación produce luz blanca.',
    },
    {
        termino: ['Diagrama de cromaticidad'],
        definicion:
            'Diagrama que representa todos los colores perceptibles por el ojo humano. El sistema CIE caracteriza los colores por un parámetro de luminancia Y, y dos coordenadas de color x e y, las cuales especifican un punto sobre el diagrama.',
    },
    {
        termino: ['RGB'],
        definicion:
            'Modelo de color, utilizado en monitores, que representa el color mediante tres colores primarios: rojo, verde y azul.',
    },
    {
        termino: ['YIQ'],
        definicion:
            'Modelo de color utilizado por la televisión norteamericana. Codifica la luminancia en un valor Y, mientras que los otros dos valores codifican la cromaticidad de los colores naranja y cian; y verde y magenta respectivamente.',
    },
    {
        termino: ['CMY'],
        definicion: 'Modelo sustractivo usado en la impresión a color.',
    },
    {
        termino: ['CMYK'],
        definicion:
            'Modelo sustractivo usado en la impresión a color que incluye el color negro para reducir el uso de tinta.',
    },
    {
        termino: ['HSV', 'HSB'],
        definicion:
            'Modelo de color orientado al usuario que representa un color mediante su tono, saturación y brillo.',
    },
    {
        termino: ['HLS'],
        definicion: 'Modelo de color orientado al usuario que representa un color mediante su tono, ligereza y brillo.',
    },
    {
        termino: ['CIE Lab'],
        definicion:
            'Modelo de color orientado al usuario, creado en 1976 para describir todos los colores percibibles por el ojo humano.',
    },
    {
        termino: ['Canal alfa'],
        definicion: 'Canal que determina la transparencia de un color en un lugar específico.',
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
