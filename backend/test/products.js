let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();

chai.use(chaiHttp);

describe("Products", () => {
  describe("/GET products", () => {
    it("it should GET all the products", done => {
      chai
        .request(server)
        .get("/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.eql(0);
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('image');
          done();
        });
    });
  });
});
