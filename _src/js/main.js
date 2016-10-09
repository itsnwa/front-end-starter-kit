// Copy to clipboard

var btn = document.getElementById('btn');
var clipboard = new Clipboard(btn);

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});
