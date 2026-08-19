document.addEventListener('DOMContentLoaded', () => {
    const buscarInput = document.getElementById('buscarDatos');
    const selectColumna = document.getElementById('filtroColumna');
    const selectOrden = document.getElementById('filtroOrden');
    const btnLimpiar = document.getElementById('limpiarDatos');
    const tbody = document.getElementById('tbodyDatos');

    if (!tbody) return;

    // Función para ordenar la tabla
    function ordenarTabla() {
        const columnaIndex = parseInt(selectColumna.value);
        const direccion = selectOrden.value;
        const filas = Array.from(tbody.querySelectorAll('tr'));

        filas.sort((a, b) => {
            const celdaA = a.querySelectorAll('td')[columnaIndex]?.textContent.trim() || '';
            const celdaB = b.querySelectorAll('td')[columnaIndex]?.textContent.trim() || '';

            // Limpiar símbolos de moneda si es precio (ej: "$1530540.0" -> "1530540.0")
            const valorAStr = celdaA.replace('$', '').replace(/\./g, '').replace(',', '.');
            const valorBStr = celdaB.replace('$', '').replace(/\./g, '').replace(',', '.');

            const numA = parseFloat(valorAStr);
            const numB = parseFloat(valorBStr);

            let resultado = 0;

            // Comprobar si son números para ordenar matemáticamente
            if (!isNaN(numA) && !isNaN(numB)) {
                resultado = numA - numB;
            } else {
                // Si son textos, ordenar alfabéticamente
                resultado = celdaA.localeCompare(celdaB, 'es', { numeric: true });
            }

            return direccion === 'asc' ? resultado : -resultado;
        });

        // Volver a insertar las filas ordenadas en el tbody
        filas.forEach(fila => tbody.appendChild(fila));
    }

    // Función para buscar por texto
    function filtrarTabla() {
        const textoBuscado = buscarInput.value.toLowerCase().trim();
        const filas = tbody.querySelectorAll('tr');

        filas.forEach(fila => {
            const contenidoFila = fila.textContent.toLowerCase();
            if (contenidoFila.includes(textoBuscado)) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    }

    // Eventos
    if (buscarInput) {
        buscarInput.addEventListener('input', filtrarTabla);
    }

    if (selectColumna) {
        selectColumna.addEventListener('change', ordenarTabla);
    }

    if (selectOrden) {
        selectOrden.addEventListener('change', ordenarTabla);
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            if (buscarInput) buscarInput.value = '';
            if (selectColumna) selectColumna.value = '0';
            if (selectOrden) selectOrden.value = 'asc';
            
            const filas = tbody.querySelectorAll('tr');
            filas.forEach(fila => fila.style.display = '');
            ordenarTabla();
        });
    }
});