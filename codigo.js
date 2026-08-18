// Script genérico para mostrar datos en una página HTML
// Compatible con tablas, listas y formularios básicos

const datosIniciales = [
  { codigo: 1, modelo: 'Samsung', descripcion: 'Notebook Samsung Book4 Core 7 512GB RAM 16GB 15.6', precio_unitario: 1530540.0, stock: 10 },
  { codigo: 2, modelo: 'Toshiba', descripcion: 'Disco Duro portátil 1TB Canvio Basics', precio_unitario: 205536.50, stock: 15 },
  { codigo: 3, modelo: 'Nisuta', descripcion: 'Teclado Multimedia Bluetooth con batería recargable', precio_unitario: 30500.70, stock: 10 }
];

let datos = [...datosIniciales];

function obtenerElemento(id, fallback = null) {
  return document.getElementById(codigo) || fallback;
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
          <td>${item.codigo ?? ''}</td>
          <td>${item.modelo ?? ''}</td>
          <td>${item.descripcion ?? ''}</td>
          <td>${item.precio_unitario ?? ''}</td>
          <td>${item.stock ?? ''}</td>
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
          <strong>${item.modelo} ${item.descripcion}</strong>
          <span class="d-block text-muted">Precio: $ ${item.precio_unitario}</span>
          <span class="d-block text-muted">Cantidad: ${item.stock}</span>
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
            <h5 class="card-title">${item.modelo} ${item.descripcion}</h5>
            <p class="card-text mb-1"><strong>Precio: $</strong> ${item.precio_unitario}</p>
            <p class="card-text mb-0"><strong>Cantidad:</strong> ${item.stock}</p>
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
      item.modelo,
      item.descripcion,
      item.stock,
      String(item.precio_unitario),
      String(item.codigo)
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

  const modelo = obtenerElemento('modelo')?.value?.trim() || '';
  const descripcion = obtenerElemento('descripcion')?.value?.trim() || '';
  const precio_unitario = Number(obtenerElemento('precio_unitario')?.value || 0);
  const stock = obtenerElemento('stock')?.value?.trim() || '';

  if (!modelo || !descripcion || !stock) {
    alert('Completa los campos obligatorios');
    return;
  }

  datos.push({
    codigo: Date.now(),
    modelo,
    descripcion,
    precio_unitario,
    stock
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
                    <td>${item.codigo ?? ''}</td>
                    <td>${item.modelo ?? ''}</td>
                    <td>${item.descripcion ?? ''}</td>
                    <td>${item.precio_unitario ?? ''}</td>
                    <td>${item.stock ?? ''}</td>
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
                    <strong>${item.modelo} ${item.descripcion}</strong>
                    <span class="d-block text-muted">Precio: $ ${item.precio_unitario}</span>
                    <span class="d-block text-muted">Cantidad: ${item.stock}</span>
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
                      <h5 class="card-title">${item.modelo} ${item.descripcion}</h5>
                      <p class="card-text mb-1"><strong>Precio: $</strong> ${item.precio_unitario}</p>
                      <p class="card-text mb-0"><strong>Cantidad:</strong> ${item.stock}</p>
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
                    <td>${item.codigo ?? ''}</td>
                    <td>${item.modelo ?? ''}</td>
                    <td>${item.descripcion ?? ''}</td>
                    <td>${item.precio_unitario ?? ''}</td>
                    <td>${item.stock ?? ''}</td>
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
