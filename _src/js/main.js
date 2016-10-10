// Copy to clipboard

var clipboard = new Clipboard('span.git-repo--link');

clipboard.on('success', () => {
  $('.copy-notification.success').fadeIn(300).delay(2000).fadeOut(300);
});

clipboard.on('error', () => {
  $('.copy-notification.error').addClass('active').delay(2000).fadeOut(300);
});
