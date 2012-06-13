/* DO NOT MODIFY. This file was compiled Fri, 04 Nov 2011 02:22:36 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/9-complete/app/coffeescripts/time_log/routers.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  jQuery(function() {
    var TimeLogRouter, _ref;
    TimeLogRouter = (function() {
      __extends(TimeLogRouter, Backbone.Router);
      function TimeLogRouter() {
        TimeLogRouter.__super__.constructor.apply(this, arguments);
      }
      TimeLogRouter.prototype.routes = {
        '': 'redirectToToday',
        'tasks/:year/:month/:day': 'show'
      };
      TimeLogRouter.prototype.initialize = function() {
        this.view = new app.AppView({
          collection: app.Tasks
        });
        return app.Tasks.bind('change:date', this.changeDate, this);
      };
      TimeLogRouter.prototype.changeDate = function() {
        return Backbone.history.navigate(app.Tasks.url.substring(5, 255));
      };
      TimeLogRouter.prototype.redirectToToday = function() {
        var day, month, today, year, _ref;
        today = new Date();
        _ref = [today.getDate(), today.getMonth() + 1, today.getFullYear()], day = _ref[0], month = _ref[1], year = _ref[2];
        return Backbone.history.navigate("tasks/" + year + "/" + month + "/" + day, true);
      };
      TimeLogRouter.prototype.show = function(year, month, day) {
        return app.Tasks.setDate(year, month, day);
      };
      return TimeLogRouter;
    })();
    this.app = (_ref = window.app) != null ? _ref : {};
    return this.app.TimeLogRouter = TimeLogRouter;
  });
}).call(this);
