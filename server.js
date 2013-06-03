var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    express = require('express'),
    io = require('socket.io'),
    app = express();

app.use(express.favicon());
app.use(express.logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.bodyParser({keepExtensions: true,
                            uploadDir: path.join(__dirname, 'uploads')}))

server = http.createServer(app);
server.listen(8000, '0.0.0.0', function() {
    console.log('Listening on all interfaces. http://localhost:8000/');
});


io = io.listen(server);
io.set('browser client minification', true)
io.set('browser client cache', true)
io.set('browser client gzip', true)

io.sockets.on('connection', function(socket) {
    socket.emit('established');

    socket.on('orientation', function(data, ack) {
        io.sockets.emit('orientationChange', data);
    });
    socket.on('end orientation', function(data, ack) {
        io.sockets.emit('orientationStop');
    });
    socket.on('nextSlide', function(data, ack) {
        io.sockets.emit('nextSlide');
    });
    socket.on('prevSlide', function(data, ack) {
        io.sockets.emit('prevSlide');
    });

    app.post('/img', function(req, res) {
        fs.readFile(req.files.img.path, function(err, data) {
            if (err) throw err;
            var base64data = new Buffer(data).toString('base64');
            io.sockets.emit('new image', {file: base64data});
        });
        res.redirect('back');
    });
})


app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendfile(path.join(__dirname, 'index.html'));
});
app.get('/ctrl', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendfile(path.join(__dirname, 'control.html'));
});
