// Definiendo constantes y variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {

    // Cuando se agrega un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {

        articulosCarrito = [];

        limpiarHTML();
    });
}


// Funciones
function agregarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito 
function eliminarCurso(e) {

    if(e.target.classList.contains('borrar-curso')) {

        const cursoId =  e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML();
    }
}

// Leer el contenido y extraer información
function leerDatosCurso(curso) {
    
    //Creando un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {

        //Actualizar la cantidad
        const nevosCursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        } );
        articulosCarrito = [...nevosCursos];
    } else {

        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
}

// Mostrando el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    //Recorrer ek carrito y generar el HTML
    articulosCarrito.forEach( curso => {

        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //Agregando el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    } );
}

function limpiarHTML() {
    
    while(contenedorCarrito.firstChild) {

        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}