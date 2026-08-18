const { describe, it } = require("mocha");
const { expect } = require("chai");

let token;

describe("API Automation Tugas - Sesi 7", function () {
  
 
  // ---------------------------------------------------------
  it("Valid Login", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin" })
    });
    
    
    expect(response.status).to.equal(200);
    const data = await response.json();
    
    
    expect(data.message).to.eql("Login successful");
    
    
    token = data.token; 
  });

  
  // ---------------------------------------------------------
  it("GET - Data Users", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });
    
   
    expect(response.status).to.equal(200);
    const data = await response.json();
    
    
    expect(data).to.have.property("users");
  });

  
  // ---------------------------------------------------------
  it("POST - Positif (Add User)", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      
      body: JSON.stringify({ username: "QA_Tester", age: 25 })
    });

    
    expect(response.status).to.be.oneOf([200, 201]);
    const data = await response.json();
    
  
    expect(data).to.be.an('object');
  });

  
  // ---------------------------------------------------------
  it("POST - Negative (Salah Password)", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      
      body: JSON.stringify({ username: "admin", password: "password_salah" })
    });

    
    expect(response.status).to.equal(401);
    const data = await response.json();
    
    
    expect(data).to.not.have.property("token");
  });

});