// javascript file for todos.html

// Get all Todos
function getAllTodos() {
  console.log("Getting all the todos.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Clear Date Field
function clearDataField() {
  console.log("Clear Data Field.");
  document.getElementById('jsonDump').innerHTML = " Data Field ";
}
// List todo that has certain ID
function getTodoById() {
  console.log("Getting the todo.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos/" +  document.getElementById("id").value, function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Get Todos by owner
function getAllTodosByOwner() {
  console.log("Getting all todos by owner.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?owner=" +  document.getElementById("owner").value, function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Get Todos by its body contains certain contents
function getAllTodosByBody() {
  console.log("Getting all todos by contains.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?contains=" +  document.getElementById("body").value, function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Get all todos that has complete status
function getAllTodosByTrue() {
  console.log("Getting all complete todos.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?status=complete", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Get all todos that has incomplete status
function getAllTodosByFalse() {
  console.log("Getting all incomplete todos.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?status=incomplete", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Get all todos by category
function getAllTodosByCategory() {
  console.log("Getting all the todos by category.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?category=" + document.getElementById("category").value, function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Sort todos by owner order
function orderByOwner() {
  console.log("Sorting all todos by owner.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?orderBy=owner", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Sort todos by category order
function orderByCategory() {
  console.log("Sorting all todos by category.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?orderBy=category", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Sort todos by status order
function orderByStatus() {
  console.log("Sorting all todos by status.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?orderBy=status", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Sort todos by body order
function orderByBody() {
  console.log("Sorting all todos by body.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?orderBy=body", function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}
// Limiting the searching terms
function getAllTodosByLimit() {
  console.log("Getting limiting todos.");

  var HttpThingy = new HttpClient();
  HttpThingy.get("/api/todos?limit=" + document.getElementById("limit").value, function(returned_json){
    document.getElementById('jsonDump').innerHTML = returned_json;
  });
}



// Built in part of HTTPCLIENT
function HttpClient() {
  // We'll take a URL string, and a callback function.
  this.get = function(aUrl, aCallback){
    var anHttpRequest = new XMLHttpRequest();

    // Set a callback to be called when the ready state of our request changes.
    anHttpRequest.onreadystatechange = function(){


      if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  }
}
