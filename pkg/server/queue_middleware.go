package server

import (
	"net/http"
)

// Limit concurrent HTTP requests to n.
func QueueMiddleware(n int, next http.Handler) http.Handler {
	sema := make(chan struct{}, n)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sema <- struct{}{}
		defer func() { <-sema }()
		next.ServeHTTP(w, r)
	})
}
