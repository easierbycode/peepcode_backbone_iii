/* DO NOT MODIFY. This file was compiled Tue, 15 Nov 2011 06:05:20 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/9-complete/app/coffeescripts/time_log/models.coffee
 */

(function() {
  var Task, _ref;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Task = (function() {
    __extends(Task, Backbone.Model);
    function Task() {
      Task.__super__.constructor.apply(this, arguments);
    }
    Task.prototype.defaults = {
      tag: ''
    };
    Task.prototype.url = function() {
      if (this.id) {
        return "/api/tasks/" + this.id;
      } else {
        return "/api/tasks";
      }
    };
    Task.prototype.initialize = function(attributes, options) {
      var tag;
      if (!attributes.createdAt) {
        this.attributes.createdAt = (new Date).getTime();
      }
      if (tag = this.extractTag(attributes.title)) {
        this.attributes.tag = tag;
      } else {
        this.attributes.tag = null;
      }
      return this.bind('change:title', this.updateTag, this);
    };
    Task.prototype.validate = function(attributes) {
      var mergedAttributes;
      mergedAttributes = _.extend(_.clone(this.attributes), attributes);
      if (!mergedAttributes.title || mergedAttributes.title.trim() === '') {
        return "Task title must not be blank.";
      }
    };
    Task.prototype.updateTag = function(model, newTitle) {
      var tag;
      if (tag = this.extractTag(newTitle)) {
        return this.set({
          tag: tag
        });
      } else {
        return this.set({
          tag: null
        });
      }
    };
    Task.prototype.extractTag = function(text) {
      var matches;
      if (this.attributes.title) {
        matches = this.attributes.title.match(/\s#(\w+)/);
        if (matches != null ? matches.length : void 0) {
          return matches[1];
        }
      }
      return '';
    };
    Task.prototype.markComplete = function() {
      var completedAt, duration, durationInMilliseconds, floatDurationSeconds, mostRecentCompletedTask;
      completedAt = (new Date).getTime();
      duration = 0;
      if (this.collection) {
        mostRecentCompletedTask = _.last(this.collection.completedTasks());
        if (mostRecentCompletedTask) {
          durationInMilliseconds = completedAt - mostRecentCompletedTask.get('completedAt');
          floatDurationSeconds = durationInMilliseconds / 1000;
          duration = parseInt(floatDurationSeconds, 10);
        }
      }
      return this.set({
        completedAt: completedAt,
        duration: duration
      });
    };
    Task.prototype.markIncomplete = function() {
      return this.set({
        completedAt: null,
        duration: 0
      });
    };
    Task.prototype.isCompleted = function() {
      return this.attributes.completedAt;
    };
    return Task;
  })();
  this.app = (_ref = window.app) != null ? _ref : {};
  this.app.Task = Task;
}).call(this);
