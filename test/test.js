'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var http= require("../app.js").http;

chai.use(chaiHttp);

 
describe('Return message: ',()=>{
    after(function (done) {
        http.close();
        done();
    });

	it('should insert a message', (done) => {
		chai.request(http.listen())
			.post('/')
			.send({sendMessage: "Enviando mensaje"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
            });
    
    });
});