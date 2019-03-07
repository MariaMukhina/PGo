//Name of package
package main

//Import packages (like include in c++)
//We can import there from github, but in front of this
//we need write go get %package name% in console.
//Example: go get github.com/gorilla/mux
import (
	"net/http"

	"github.com/BigCodilo/TimeRows/handlers"
	"github.com/gorilla/mux"
)

//Strating poinet of our app
func main() {
	r := mux.NewRouter() //Here we created new router (gorilla/mux)

	//Add handler (GET) which send html template to client
	r.HandleFunc("/average", handlers.AverageHandlerGet).Methods("GET")

	//Add handler (POST) which take json (time row with it's length) from client,
	//and make a float64 array (slice) flor string array.
	r.HandleFunc("/average", handlers.AverageHandlerPost).Methods("POST")

	//Send static files to client (css, js etc)
	r.PathPrefix("/static/").Handler(http.FileServer(http.Dir("./")))
	http.Handle("/", r)
	http.ListenAndServe(":80", nil)
}
