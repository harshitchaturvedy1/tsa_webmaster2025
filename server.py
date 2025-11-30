import http.server
import socketserver
import os
import json

PORT = 5000
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        if self.path.startswith('/api/sheets/'):
            self.handle_sheets_api()
        else:
            super().do_GET()
    
    def handle_sheets_api(self):
        try:
            parts = self.path.split('/')
            if len(parts) >= 4:
                sheet_id = parts[3].split('?')[0]
            else:
                sheet_id = '0'
            
            if sheet_id == '0':
                file_path = 'data/events.csv'
            elif sheet_id == '1':
                file_path = 'data/resources.csv'
            else:
                file_path = f'data/sheet_{sheet_id}.csv'
            
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    csv_data = f.read()
                
                self.send_response(200)
                self.send_header('Content-Type', 'text/csv; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()
                self.wfile.write(csv_data.encode('utf-8'))
            else:
                self.send_error_response(404, f'Data file not found: {file_path}')
                
        except Exception as e:
            self.send_error_response(500, f'Server error: {str(e)}')
    
    def send_error_response(self, code, message):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_json = json.dumps({'error': message})
        self.wfile.write(error_json.encode('utf-8'))

if __name__ == "__main__":
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}/")
        httpd.serve_forever()
