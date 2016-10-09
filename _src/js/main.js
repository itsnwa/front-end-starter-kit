// Copy to clipboard (C = key 67)

var clipboard = new Clipboard('');

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});
