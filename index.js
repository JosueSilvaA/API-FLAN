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