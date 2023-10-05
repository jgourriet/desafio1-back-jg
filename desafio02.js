
const fs = require('fs');

//? Se crea la clase ProudctManager
class ProductManager {

    constructor(path) {

        this.path = path;
        this.format = 'UTF-8';

    }


    //++ Se muestran todos los productos en el array
    getProducts = async () => {

        try {

            const allMyProducts = await fs.promises.readFile(this.path, this.format);
            return JSON.parse(allMyProducts.toString());

        } catch (error) {

            console.log('ERROR: Lista de Productos vacía', error);
            return [];

        }

    };

    //++ Se genera el nuevo ID
    newId = async () => {

        const productList = await this.getProducts();
        let counterId = 0;

        productList.forEach(producto => {

            if (producto.id > counterId) {

                counterId = producto.id;

            }

        });

        const newCount = ++counterId;
        return newCount;

    };

    //++ Se agrega un producto
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const validarCamposVacios = { title, description, price, thumbnail, code, stock };

        if (validarCamposVacios.title === '' || validarCamposVacios.description === '' || validarCamposVacios.price <= 0 || validarCamposVacios.thumbnail === '' || validarCamposVacios.code === '' || validarCamposVacios.stock <= 0) {

            console.log('------------------------------------');
            console.log('------------------------------------');
            return console.log(`Debe completar todos los campos requeridos: Nombre del producto: ${title}, Descripción del producto: ${description}, Precio del producto debe ser mayor a CERO: ${price}, Ruta de Imagen: ${thumbnail}, Código del producto no debe repetirse: ${code}, Número de Piezas Dispobibles debe ser mayor a 0: ${stock}`);

        };

        const productList = await this.getProducts();

        const validarCampoCodeRepetido = productList.find(product => product.code === code);

        if (validarCampoCodeRepetido) {

            console.log('------------------------------------');
            console.log('------------------------------------');
            return console.log(`El código del Producto ${title} ya está registrado, por lo tanto, no es posible agregarlo nuevamente.`);

        }

        const productId = await this.newId();

        const product = {
            id: productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        productList.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productList));

    };


    //++ Se obtiene un producto por el ID
    getProductsById = async (id) => {

        const productList = await this.getProducts();
        let product = productList.find(product => product.id === id);

        if (product) {

            return `Código: ${id} Encontrado` + JSON.stringify(product);

        } else {

            //++ En caso de no encontrar el ID
            return `Código ${id} No Encontrado`;

        };

    };

    //++ Se actualiza el producto usando su ID para buscarlo
    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {

        //++ Se crea un objeto con las variables nuevas
        const update = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        //++ Obtenemos la información
        const productList = await this.getProducts();

        //++ Buscamos el Id
        const buscarID = productList.findIndex(product => product.id === id);

        //++ Si no existe
        if (buscarID === -1) {

            return console.log(`Error: Producto con el ID: ${id} no se encontró.`);

        };

        //++ Si existe, sobreescribimos el producto usando el objeto nuevo
        const updatedProduct = { ...productList[buscarID], ...update };
        productList[buscarID] = updatedProduct;

        //++ Lo cargamos al archivo
        await fs.promises.writeFile(this.path, JSON.stringify(productList));

        //++ Mensaje de éxito
        console.log(`Producto con el Id: ${id} ha sido actualizado.`);
    };


    //++ Funcion para borrar producto por id
    deleteProduct = async (id) => {

        //++ Obtenemos la información
        const productList = await this.getProducts();

        //++ Buscamos el Id
        const buscarID = productList.findIndex(product => product.id === id);

        //++ Si no existe
        if (buscarID === -1) {

            return console.log(`Error: Producto con el ID: ${id} no se encontró.`);

        }

        //++ Si existe, borramos ese id
        productList.splice(buscarID, 1);

        //++ Sobreescribimos el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(productList));
        console.log(`El Producto con el Id: ${id} ha sido eliminado satisfactoriamente.`);
    };


};


//++ TEST
async function run() {

    const test = new ProductManager('./path/product.json');

    await test.addProduct('Producto Prueba 1', 'Este es un producto de prueba 1', 200, 'Sin imagen', 'abc123', 25);
    await test.addProduct('Producto Prueba 2', 'Este es un producto de prueba 2', 300, 'Sin imagen', 'abc124', 25);
    await test.addProduct('Producto Prueba 3', 'Este es un producto de prueba 3', 400, 'Sin imagen', 'abc125', 25);
    await test.addProduct('Producto Prueba 4', 'Este es un producto de prueba 4', 500, 'Sin imagen', 'abc126', 25);
    await test.addProduct('Producto Prueba 5', 'Este es un producto de prueba 5', 600, 'Sin imagen', 'abc127', 25);
    await test.addProduct('Producto Prueba 6', 'Este es un producto de prueba 6', -600, 'Sin imagen', 'abc128', 25);
    await test.addProduct('Producto Prueba 7', 'Este es un producto de prueba 7', 800, 'Sin imagen', 'abc127', 25);
    await test.addProduct('Producto Prueba 8', 'Este es un producto de prueba 8', 1000, 'Sin imagen', 'abc128', 25);

    await test.updateProduct(1, 'Producto Prueba 1', 'Este es un producto de prueba 1', 200, 'Sin imagen', 'abc123', 555);

    let buscarProducto1 = await test.getProductsById(10);
    let buscarProducto2 = await test.getProductsById(1);
    let borrarProducto = await test.deleteProduct(4);

    console.log(await test.getProducts());
    console.log(buscarProducto1);
    console.log(buscarProducto2);

}

run();