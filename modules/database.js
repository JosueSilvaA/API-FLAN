var mongoose = require('mongoose');

// Nombre base de dato 
// let bd = 'FlanDB';
// let port = '27017';
// let host = 'localhost';

const URI = "mongodb+srv://admin:flan@cluster0-sibnl.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () =>{
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(result=>{
        console.log('Se conecto a mongodb');
    })
    .catch(error =>{
        console.log(error);
    });
};

module.exports = connectDB;
// class Database{
//     constructor(){
//         this.conectar();
//     }

//     conectar(){
//         mongoose.connect(URL,{ 
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })
//         .then(result=>{
//             console.log('Se conecto a mongodb');
//         })
//         .catch(error =>{
//             console.log(error);
//         });
//     }
// }

// module.exports = new Database();

