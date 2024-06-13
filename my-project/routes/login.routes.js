const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    res.render('login');
  });
  


/*
// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let commerce = await Commerce.findOne({ email });
    if (!commerce) {
      return res.status(404).json({ message: 'Correo electrónico no registrado' });
    }
    const isMatch = await bcrypt.compare(password, commerce.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Generar y enviar token JWT
    const payload = {
      commerce: {
        id: commerce._id,
        email: commerce.email,
      },
    };
    jwt.sign(payload, 'jwt_secret_key', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
*/


module.exports = router;
