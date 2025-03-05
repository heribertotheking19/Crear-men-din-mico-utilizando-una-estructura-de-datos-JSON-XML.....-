document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.getElementById("menu");
    let menuData = [];

    // Cargar hamburguesas desde JSON
    fetch("menu.json")
        .then(response => response.json())
        .then(data => {
            menuData = data;
            cargarMenu(menuData);
        })
        .catch(error => console.error("Error cargando el menú:", error));

    function cargarMenu(menu) {
        menuContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar

        menu.forEach(item => {
            let div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='images/default.jpg'">
                <h3>${item.nombre}</h3>
                <p>${item.descripcion}</p>
                <p><strong>Precio: $${item.precio}</strong></p>
            `;
            menuContainer.appendChild(div);
        });
    }

    // Agregar nueva hamburguesa
    document.getElementById("addMenuForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;

        let nuevaHamburguesa = {
            nombre: nombre,
            descripcion: `Deliciosa hamburguesa de ${nombre.toLowerCase()}`,
            precio: precio,
            imagen: "images/default.jpg"
        };

        menuData.push(nuevaHamburguesa);
        cargarMenu(menuData);
        document.getElementById("addMenuForm").reset();
    });
});
