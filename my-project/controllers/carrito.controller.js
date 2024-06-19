const Product = require('../models/Product.js');

// Método para obtener productos por id_commerce
exports.getProductsByUsers = async (req, res) => {
    try {
        const commerceId = req.session.uCommerce.id;
        const cart = req.session.cart || []; 

        const cartProductIds = cart.map(item => item.productId);
        const dbProducts = await Product.find({ commerce: commerceId });

        // Filtrar y agregar cantidad desde el carrito
        const cartProducts = dbProducts.filter(product => cartProductIds.includes(product._id.toString()))
                                       .map(product => {
                                           const cartItem = cart.find(item => item.productId === product._id.toString());
                                           return {
                                               ...product._doc,
                                               quantity: cartItem ? cartItem.quantity : 0
                                           };
                                       });

        res.render('carrito', { products: cartProducts, user: req.session.uCommerce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


exports.addProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        if (!req.session.cart) {
            req.session.cart = [];
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (product.stock > 0) {
            const cartProductIndex = req.session.cart.findIndex(item => item.productId === productId);
            if (cartProductIndex !== -1) {
                req.session.cart[cartProductIndex].quantity += 1;
            } else {
                req.session.cart.push({ productId: productId, quantity: 1 });
            }
            
            product.stock -= 1;
            await product.save();

            res.redirect('/products');
        } else {
            await Product.deleteOne({ _id: productId });
            res.redirect('/products');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};



exports.confirmCart = async (req, res) => {
    try {
        // Aquí podrías agregar lógica para guardar la orden en la base de datos, enviar un correo, etc.
        // Por ahora, simplemente vaciaremos el carrito
        req.session.cart = [];
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al confirmar el carrito' });
    }
};

// Cancelar carrito
exports.cancelCart = async (req, res) => {
    try {
        if (!req.session.cart) {
            return res.redirect('/products');
        }

        // Restaurar el stock de los productos en el carrito
        const cart = req.session.cart;
        for (const item of cart) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        req.session.cart = [];
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cancelar el carrito' });
    }
};

// Eliminar producto del carrito
exports.removeProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const cartItem = req.session.cart.find(item => item.productId === productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        product.stock += cartItem.quantity;
        await product.save();
        req.session.cart = req.session.cart.filter(item => item.productId !== productId);
        res.redirect('/carrito'); // Redirigir a la página del carrito u otra página adecuada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto del carrito' });
    }
};
