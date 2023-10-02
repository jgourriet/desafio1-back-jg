class ProductManager {
    constructor() {
        this.products = [];
        this.counterId = 0;
    }

    newId() {
        this.counterId++;
        return this.counterId;
    }

    getProducts() {
        const allMyProducts = this.products.map((product) => { return product });
        return allMyProducts;
    }

    getProductsById(id) {
        for (const productId of this.products) {
            if (productId.id === id) { return productId }
            else { console.log('No se encontró el ID') }
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const validarCampoCodeRepetido = this.products.some((product) => product.code === code);
        const validarCamposVacios = { title, description, price, thumbnail, code, stock };

        if (validarCampoCodeRepetido) {
            console.log('------------------------------------');
            console.log('------------------------------------');
            console.log(`El código del Producto ${title} ya está registrado, por lo tanto, no es posible agregarlo nuevamente.`);
            console.log('------------------------------------');
            console.log('------------------------------------');
        } else if (validarCamposVacios.title === '' || validarCamposVacios.description === '' || validarCamposVacios.price <= 0 || validarCamposVacios.thumbnail === '' || validarCamposVacios.code === '' || validarCamposVacios.stock <= 0) {
            console.log('------------------------------------');
            console.log('------------------------------------');
            console.log(`Debe completar todos los campos requeridos: Nombre del producto: ${title}, Descripción del producto: ${description}, Precio del producto debe ser mayor a CERO: ${price}, Ruta de Imagen: ${thumbnail}, Código del producto no debe repetirse: ${code}, Número de Piezas Dispobibles debe ser mayor a 0: ${stock}`);
            console.log('------------------------------------');
            console.log('------------------------------------');
        } else {
            const productId = this.newId();
            const product = { id: productId, title, description, price, thumbnail, code, stock };
            this.products.push(product);
        }
    }
}



const productos = new ProductManager();

productos.addProduct('Producto Prueba 1', 'Este es un producto de prueba 1', 200, 'Sin imagen', 'abc123', 25);
productos.addProduct('Producto Prueba 2', 'Este es un producto de prueba 2', 300, 'Sin imagen', 'abc124', 25);
productos.addProduct('Producto Prueba 3', 'Este es un producto de prueba 3', 400, 'Sin imagen', 'abc125', 25);
productos.addProduct('Producto Prueba 4', 'Este es un producto de prueba 4', 500, 'Sin imagen', 'abc126', 25);
productos.addProduct('Producto Prueba 5', 'Este es un producto de prueba 5', 600, 'Sin imagen', 'abc127', 25);
productos.addProduct('Producto Prueba 6', 'Este es un producto de prueba 6', -600, 'Sin imagen', 'abc128', 25);
productos.addProduct('Producto Prueba 7', 'Este es un producto de prueba 7', 800, 'Sin imagen', 'abc127', 25);
productos.addProduct('Producto Prueba 8', 'Este es un producto de prueba 8', 1000, 'Sin imagen', 'abc128', 25);

console.log('----------- PRODUCTO PRUEBA 1 ------------------');
console.log('Array de Productos: ', productos.getProducts());
console.log(' Producto por ID: ', productos.getProductsById(1));