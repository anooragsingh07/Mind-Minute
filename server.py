import http.server
import socketserver

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving MindMinute at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever() 