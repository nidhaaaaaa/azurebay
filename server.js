const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// 💾 Simple memory database for users
let users = [];

const server = http.createServer((req, res) => {
    
    // 🔐 Handle Register POST
    if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = querystring.parse(body);
            users.push(data);
            console.log('✨ New User Registered:', data);
            // 🎉 After register -> Go to Login
            res.writeHead(302, { 'Location': '/login.html' });
            res.end();
        });
        return;
    }

    // 🔑 Handle Login POST
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = querystring.parse(body);
            const user = users.find(u => u.email === data.email && u.password === data.password);
            if (user) {
                console.log('💙 User Logged In:', user.email);
                res.writeHead(302, { 'Location': '/shop.html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                <div style="font-family:Segoe UI; text-align:center; margin-top:100px;">
                    <h1>❌ Login Failed 😢</h1>
                    <p>Wrong Email or Password Bro!</p>
                    <a href="/login.html" style="color:#667eea; text-decoration:none; font-weight:600;">Try Again 💙 →</a>
                </div>`);
                return;
            }
            res.end();
        });
        return;
    }

    // 📁 SERVE FILES  🌊
    let file = req.url === '/' ? '/register.html' : req.url;
    let filePath = path.join(__dirname, file);
    let ext = path.extname(filePath);
    let type = 'text/html';
    if (ext === '.css') type = 'text/css';
    if (ext === '.js') type = 'text/javascript';
    if (ext === '.jpg' || ext === '.jpeg') type = 'image/jpeg';
    if (ext === '.png') type = 'image/png';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <div style="font-family:Segoe UI; text-align:center; margin-top:100px;">
                    <h1>🌊 Oops! 404 - Not Found 😅</h1>
                    <p>File not found: ${file}</p>
                    <a href="/register.html" style="background:linear-gradient(135deg,#667eea,#764ba2); color:white; padding:12px 25px; border-radius:25px; text-decoration:none;">Go to Register ✨</a>
                </div>`);
        } else {
            res.writeHead(200, { 'Content-Type': type + '; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('🚀✨ Server running at http://localhost:3000 🌊🦈');
    console.log('💙 AzureBay Seafood Market is Live!');
});
