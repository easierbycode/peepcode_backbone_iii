/* DO NOT MODIFY. This file was compiled Thu, 03 Nov 2011 22:09:04 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/0-start/app/coffeescripts/time_log.coffee
 */

(function() {
  var _ref;
  this.app = (_ref = window.app) != null ? _ref : {};
  jQuery(function() {
    var setupErrorHandlers;
    setupErrorHandlers = function() {
      return $(document).ajaxError(function(error, xhr, settings, exception) {
        var message, _ref2;
        console.log(xhr.status, xhr.responseText, "EXCEPTION: " + exception);
        message = xhr.status === 0 ? "The server could not be contacted." : xhr.status === 403 ? "Login is required for this action." : (500 <= (_ref2 = xhr.status) && _ref2 <= 600) ? "There was an error on the server." : void 0;
        $('#error-message span').text(message);
        return $('#error-message').slideDown();
      });
    };
    setupErrorHandlers();
    this.app.router = new app.TimeLogRouter;
    return Backbone.history.start({
      pushState: true
    });
  });
}).call(this);
