var express = require('express');
var app  = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var database = require('./modules/database');
database();

var usuariosRouter = require('./routes/usuarios-router');
var categoriasRouter = require('./routes/categorias-router');
var temasRouter = require('./routes/temas-router');
var postsRouter = require('./routes/posts-router');
var rolesUsuarioRouter = require('./routes/rolesUsuarios-router');
var paginaPrincipalRouter = require('./routes/paginaPrincipal-router');
var paginasRouter = require('./routes/paginas-router');
var loginRouter = require('./routes/login-router');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/usuarios',usuariosRouter);
app.use('/categorias',categoriasRouter);
app.use('/temas',temasRouter);
app.use('/posts',postsRouter);
app.use('/roles',rolesUsuarioRouter);
app.use('/paginaPrincipal',paginaPrincipalRouter);
app.use('/paginas',paginasRouter);
app.use('/login',loginRouter);


app.get('/',function(req,res){
    res.send('Servidor de API-FLAN Levantado');
});

// app.listen(8888,function(){
//     console.log('Se levanto el servidor');
// });

app.set('port', process.env.PORT || 8888);

app.listen(app.get('port'), () => {
    console.log('Servidor levantado en el puerto: ', app.get('port'))
})


//https://api-flan.herokuapp.com/
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.3/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDqGvzZzBm88_drSv9e1xhKLfjMkmLFEOU",
//     authDomain: "flan-file.firebaseapp.com",
//     databaseURL: "https://flan-file.firebaseio.com",
//     projectId: "flan-file",
//     storageBucket: "flan-file.appspot.com",
//     messagingSenderId: "533244365252",
//     appId: "1:533244365252:web:1aeea4f2605ccfe866fc91",
//     measurementId: "G-7ZPDKRV8GW"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>