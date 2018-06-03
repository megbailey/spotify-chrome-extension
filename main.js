define(['require', 'node_module/express/index.js'], function (require) {
    var app = require('node_module/express/index.js');
});
app.use(express.static(__dirname + '/public'));
console.log('Listening on 8888');
app.listen(8888);

