const API_KEY = 'c51b101eac0d61916ab4caf887b4aaf8';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${c51b101eac0d61916ab4caf887b4aaf8}`;

const obtenerciudad = document.getElementById('ciudad').value;
const ciudad = obtenerciudad.value.trim();

const obtenerciudades = document.getElementById('ciudades').value;
const ciudades = obtenerciudades.value.trim();

function consultarClima() {
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la API');
    }
  })
  .then(data => {
    // Mostrar resultado en la tabla
    const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
    const fila = tabla.insertRow();
    fila.insertCell().innerHTML = data.name;
    fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
    fila.insertCell().innerHTML = data.weather[0].description;
  })
  .catch(error => {
    console.error('Error al consultar el clima', error);
  });
}

function consultarClimas() {
  Promise.all(ciudades.map(ciudad => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${c51b101eac0d61916ab4caf887b4aaf8}`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    });
  }))
  .then(data => {
    // Mostrar resultados en la tabla
    const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
    data.forEach(ciudad => {
      const fila = tabla.insertRow();
      fila.insertCell().innerHTML = ciudad.name;
      fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
      fila.insertCell().innerHTML = ciudad.weather[0].description;
    });
  })
  .catch(error => {
    console.error('Error al consultar el clima', error);
  });
}

function limpiarTabla() {
  // Mostrar resultado en la tabla
  const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
  for(let i = 0; i<tabla.length; i++)
  {
      tabla[i].innerHTML = "";
  }
}

searchBtn.addEventListener('click', consultarClima);
searchBtn2.addEventListener('click', consultarClimas);




