// Aqui Se aloja la lógica de la aplicación
// Esta Api recibe información del browser y la reenvia a él.
// Para lo cual se usó el Framework Expressde Node.js  
// que permite el manejo de rutas. La renderización se hace através del pug(jade) engine

'use strict'

var express = require('express'),
	app = express(),
	http = require('http').createServer(app),
	port = process.env.PORT || 3000,
	bodyParser = require ('body-parser'),
	publicDir = express.static(`${__dirname}/public`),
	pug = require('pug'),
	viewDir = `${__dirname}/views`,
	lista = new Array()

// middleware
app
	.use(publicDir)
	.use ( bodyParser.json() ) 
	.use ( bodyParser.urlencoded({extended: false}) )
	// Configurando app
	.set('views', viewDir)
	.set('view engine', 'pug')
	.set('port', port)

app	
	.get('/', (req, res) => {
		res.render('index')
	})
	.post('/',(req, res) => {
		let mensaje = req.body.sendMessage;
		 lista.push({
	 	 	mensaje: mensaje
		  })
		  console.log(lista);
		  // Envia a la vista la lista de mensajes para renderizarla
	 	res.render('resServidor', {'lista': lista});
	})

http.listen(port, () =>{
	console.log('Iniciando Api de envio de mensajes en localhost:%d', port)
} )
module.exports = { http: http}