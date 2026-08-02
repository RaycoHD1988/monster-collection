let coleccion = [];

// Cargar los datos desde el archivo JSON
fetch('latas.json')
  .then(response => response.json())
  .then(data => {
    // Ordenar alfabéticamente por nombre
    coleccion = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarLatas(coleccion);
  });

function mostrarLatas(lista) {
  const container = document.getElementById('container');
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No se encontró ninguna lata con ese término.</p>';
    return;
  }

  lista.forEach(lata => {
    const card = document.createElement('div');
    
    // Comprobar la propiedad nelly (true/false)
    const tieneLata = lata.nelly === true;
    const estadoClase = tieneLata ? 'tiene' : 'no-tiene';
    const textoBadge = tieneLata ? '✓ En colección' : '✗ Falta';

    card.className = `card ${estadoClase}`;
    card.innerHTML = `
      <img src="${lata.imagen}" alt="${lata.nombre}" loading="lazy">
      <h3>${lata.nombre}</h3>
      <div>
        <span class="badge">${textoBadge}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Escuchar lo que se escribe en el buscador
document.getElementById('searchInput').addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase().trim();
  
  const filtradas = coleccion.filter(lata => 
    lata.nombre.toLowerCase().includes(termino) ||
    lata.tags.some(tag => tag.toLowerCase().includes(termino))
  );

  mostrarLatas(filtradas);
});