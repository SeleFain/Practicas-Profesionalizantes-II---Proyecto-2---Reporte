// Script genérico para mostrar datos en una página HTML
// Compatible con tablas, listas y formularios básicos

const datosIniciales = [
  { id: 1, nombre: 'Ana', apellido: 'García', edad: 22, correo: 'ana@email.com' },
  { id: 2, nombre: 'Luis', apellido: 'Pérez', edad: 28, correo: 'luis@email.com' },
  { id: 3, nombre: 'María', apellido: 'López', edad: 25, correo: 'maria@email.com' }
];

let datos = [...datosIniciales];

function obtenerElemento(id, fallback = null) {
  return document.getElementById(id) || fallback;
}

function renderTabla() {
  const tabla = obtenerElemento('tablaDatos');
  const cuerpo = obtenerElemento('tbodyDatos');
  const contenedor = obtenerElemento('contenedorTabla');

  if (!tabla && !cuerpo && !contenedor) return;

  const filas = datos
    .map(
      (item) => `
        <tr>
          <td>${item.id ?? ''}</td>
          <td>${item.nombre ?? ''}</td>
          <td>${item.apellido ?? ''}</td>
          <td>${item.edad ?? ''}</td>
          <td>${item.correo ?? ''}</td>
        </tr>
      `
    )
    .join('');

  if (cuerpo) {
    cuerpo.innerHTML = filas || '<tr><td colspan="5">No hay datos disponibles</td></tr>';
  }

  if (tabla) {
    tabla.innerHTML = filas || '<tr><td colspan="5">No hay datos disponibles</td></tr>';
  }
}

function renderLista() {
  const lista = obtenerElemento('listaDatos');
  if (!lista) return;

  lista.innerHTML = datos
    .map(
      (item) => `
        <li class="list-group-item">
          <strong>${item.nombre} ${item.apellido}</strong>
          <span class="d-block text-muted">Edad: ${item.edad} años</span>
          <span class="d-block text-muted">Correo: ${item.correo}</span>
        </li>
      `
    )
    .join('') || '<li class="list-group-item">No hay datos disponibles</li>';
}

function mostrarDatos() {
  const salida = obtenerElemento('resultado');
  const panel = obtenerElemento('panelDatos');

  if (!salida && !panel) return;

  const html = datos
    .map(
      (item) => `
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">${item.nombre} ${item.apellido}</h5>
            <p class="card-text mb-1"><strong>Edad:</strong> ${item.edad}</p>
            <p class="card-text mb-0"><strong>Correo:</strong> ${item.correo}</p>
          </div>
        </div>
      `
    )
    .join('');

  if (salida) {
    salida.innerHTML = html || '<p>No hay datos para mostrar</p>';
  }

  if (panel) {
    panel.innerHTML = html || '<p>No hay datos para mostrar</p>';
  }
}

function buscarDatos(texto) {
  const filtro = texto.trim().toLowerCase();

  if (!filtro) {
    return [...datos];
  }

  return datos.filter((item) => {
    const valores = [
      item.nombre,
      item.apellido,
      item.correo,
      String(item.edad),
      String(item.id)
    ];
    return valores.some((valor) => String(valor).toLowerCase().includes(filtro));
  });
}

function actualizarVista() {
  renderTabla();
  renderLista();
  mostrarDatos();
}

function agregarDato(event) {
  if (event) event.preventDefault();

  const form = obtenerElemento('formDatos');
  if (!form) return;

  const nombre = obtenerElemento('nombre')?.value?.trim() || '';
  const apellido = obtenerElemento('apellido')?.value?.trim() || '';
  const edad = Number(obtenerElemento('edad')?.value || 0);
  const correo = obtenerElemento('correo')?.value?.trim() || '';

  if (!nombre || !apellido || !correo) {
    alert('Completa los campos obligatorios');
    return;
  }

  datos.push({
    id: Date.now(),
    nombre,
    apellido,
    edad,
    correo
  });

  form.reset();
  actualizarVista();
}

function limpiarDatos() {
  datos = [];
  actualizarVista();
}

function inicializarApp() {
  actualizarVista();

  const form = obtenerElemento('formDatos');
  if (form) {
    form.addEventListener('submit', agregarDato);
  }

  const buscarInput = obtenerElemento('buscarDatos');
  if (buscarInput) {
    buscarInput.addEventListener('input', (event) => {
      const resultados = buscarDatos(event.target.value);

      const tabla = obtenerElemento('tablaDatos');
      const cuerpo = obtenerElemento('tbodyDatos');
      const lista = obtenerElemento('listaDatos');
      const salida = obtenerElemento('resultado');

      if (cuerpo) {
        cuerpo.innerHTML = resultados.length
          ? resultados
              .map(
                (item) => `
                  <tr>
                    <td>${item.id ?? ''}</td>
                    <td>${item.nombre ?? ''}</td>
                    <td>${item.apellido ?? ''}</td>
                    <td>${item.edad ?? ''}</td>
                    <td>${item.correo ?? ''}</td>
                  </tr>
                `
              )
              .join('')
          : '<tr><td colspan="5">No se encontraron resultados</td></tr>';
      }

      if (lista) {
        lista.innerHTML = resultados.length
          ? resultados
              .map(
                (item) => `
                  <li class="list-group-item">
                    <strong>${item.nombre} ${item.apellido}</strong>
                    <span class="d-block text-muted">Edad: ${item.edad} años</span>
                    <span class="d-block text-muted">Correo: ${item.correo}</span>
                  </li>
                `
              )
              .join('')
          : '<li class="list-group-item">No se encontraron resultados</li>';
      }

      if (salida) {
        salida.innerHTML = resultados.length
          ? resultados
              .map(
                (item) => `
                  <div class="card mb-2">
                    <div class="card-body">
                      <h5 class="card-title">${item.nombre} ${item.apellido}</h5>
                      <p class="card-text mb-1"><strong>Edad:</strong> ${item.edad}</p>
                      <p class="card-text mb-0"><strong>Correo:</strong> ${item.correo}</p>
                    </div>
                  </div>
                `
              )
              .join('')
          : '<p>No se encontraron resultados</p>';
      }

      if (tabla) {
        tabla.innerHTML = resultados.length
          ? resultados
              .map(
                (item) => `
                  <tr>
                    <td>${item.id ?? ''}</td>
                    <td>${item.nombre ?? ''}</td>
                    <td>${item.apellido ?? ''}</td>
                    <td>${item.edad ?? ''}</td>
                    <td>${item.correo ?? ''}</td>
                  </tr>
                `
              )
              .join('')
          : '<tr><td colspan="5">No se encontraron resultados</td></tr>';
      }
    });
  }

  const btnLimpiar = obtenerElemento('limpiarDatos');
  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', limpiarDatos);
  }
}

document.addEventListener('DOMContentLoaded', inicializarApp);

window.mostrarDatos = mostrarDatos;
window.agregarDato = agregarDato;
window.limpiarDatos = limpiarDatos;
window.buscarDatos = buscarDatos;
