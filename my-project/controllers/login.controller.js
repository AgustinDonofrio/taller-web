const Commerce = require('../models/Commerce');
const User = require('../models/User');

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let commerce = await Commerce.findOne({ email });
        let user = await User.findOne({ email });

        if (!commerce && !user) {
            return res.render('login', { error: 'Correo electrónico no registrado' });
        }

        if (commerce) {
            const isMatch = await bcrypt.compare(password, commerce.password);
            if (!isMatch) {
                return res.render('login', { error: 'La contraseña es incorrecta' });
            }

            req.session.uCommerce = {
                id: commerce._id,
                name: commerce.name,
                email: commerce.email
            };

            return res.redirect('/commerces');
        }

        if (user) {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.render('login', { error: 'La contraseña es incorrecta' });
            }

            req.session.user = {
                id: user._id,
                name: user.firstName,
                email: user.email
            };

            return res.redirect('/home');
        }

    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Error en el servidor' });
    }
};