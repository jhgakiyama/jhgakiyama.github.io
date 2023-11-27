document.getElementById('contadorBrasil').addEventListener('mouseenter', function() {
  document.getElementById('contadorBariloche').style.filter = 'grayscale(100%)';
  document.getElementById('contadorBrasil').style.filter = 'none';
});

document.getElementById('contadorBariloche').addEventListener('mouseenter', function() {
  document.getElementById('contadorBrasil').style.filter = 'grayscale(100%)';
  document.getElementById('contadorBariloche').style.filter = 'none';
});

document.getElementById('contadorBrasil').addEventListener('mouseleave', function() {
  document.getElementById('contadorBariloche').style.filter = 'none';
});

document.getElementById('contadorBariloche').addEventListener('mouseleave', function() {
  document.getElementById('contadorBrasil').style.filter = 'none';
});

// Resto del código...


function actualizarContadores() {
  // Fecha actual
  var fechaActual = new Date();

  // Fecha de viaje a Brasil (11 de marzo de 2024)
  var fechaBrasil = new Date('2024-03-11T00:00:00');

  // Fecha de viaje a Bariloche (9 de septiembre de 2024)
  var fechaBariloche = new Date('2024-09-09T00:00:00');

  // Calcula la diferencia en milisegundos
  var diferenciaBrasil = fechaBrasil - fechaActual;
  var diferenciaBariloche = fechaBariloche - fechaActual;

  // Calcula días, horas, minutos y segundos
  var tiempoBrasil = calcularTiempo(diferenciaBrasil);
  var tiempoBariloche = calcularTiempo(diferenciaBariloche);

  // Actualiza los elementos HTML
  document.getElementById('contadorBrasilText').innerHTML = `Faltan ${tiempoBrasil.dias} días, ${tiempoBrasil.horas} Hs, ${tiempoBrasil.minutos} min y ${tiempoBrasil.segundos} seg.`;
  document.getElementById('contadorBarilocheText').innerHTML = `Faltan ${tiempoBariloche.dias} días, ${tiempoBariloche.horas} Hs, ${tiempoBariloche.minutos} min y ${tiempoBariloche.segundos} seg.`;
}

function calcularTiempo(diferencia) {
  var segundos = Math.floor(diferencia / 1000);
  var minutos = Math.floor(segundos / 60);
  var horas = Math.floor(minutos / 60);
  var dias = Math.floor(horas / 24);

  return {
    dias: dias,
    horas: horas % 24,
    minutos: minutos % 60,
    segundos: segundos % 60
  };
}

// Actualiza cada segundo
setInterval(actualizarContadores, 1000);

// Inicializa los contadores al cargar la página
actualizarContadores();
