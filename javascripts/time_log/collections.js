/* DO NOT MODIFY. This file was compiled Wed, 23 Nov 2011 05:36:43 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/9-complete/app/coffeescripts/time_log/collections.coffee
 */

(function() {
  var Tasks, _ref;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Tasks = (function() {
    __extends(Tasks, Backbone.Collection);
    function Tasks() {
      Tasks.__super__.constructor.apply(this, arguments);
    }
    Tasks.prototype.model = app.Task;
    Tasks.prototype.url = '/api/tasks';
    Tasks.prototype.initialize = function(options) {
      return this.bind('destroy', this.willDestroyTask, this);
    };
    Tasks.prototype.setDate = function(year, month, day) {
      var date, _ref, _ref2;
      if (month === void 0 && day === void 0) {
        date = year;
        _ref = [date.getFullYear(), date.getMonth() + 1, date.getDate()], year = _ref[0], month = _ref[1], day = _ref[2];
      }
      _ref2 = [year, month, day], this.year = _ref2[0], this.month = _ref2[1], this.day = _ref2[2];
      this.url = "/api/tasks/" + year + "/" + month + "/" + day;
      this.resetUndo();
      this.fetch();
      return this.trigger('change:date');
    };
    Tasks.prototype.currentDate = function() {
      return new Date(this.year, this.month - 1, this.day);
    };
    Tasks.prototype.isToday = function() {
      var date, today;
      date = this.currentDate();
      today = new Date();
      return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
    };
    Tasks.prototype.hasStarted = function() {
      var task, _i, _len, _ref;
      if (!(this.completedTasks().length > 0)) {
        return false;
      }
      _ref = this.completedTasks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        task = _ref[_i];
        if (task.get('title') === 'Start') {
          return true;
        }
      }
      return false;
    };
    Tasks.prototype.goToPreviousDate = function() {
      var date;
      date = new Date();
      date.setDate(this.currentDate().getDate() - 1);
      return this.setDate(date);
    };
    Tasks.prototype.goToNextDate = function() {
      var date;
      date = new Date();
      date.setDate(this.currentDate().getDate() + 1);
      return this.setDate(date);
    };
    Tasks.prototype.completedTasks = function() {
      var tasks;
      tasks = this.filter(function(task) {
        return task.isCompleted();
      });
      return _.sortBy(tasks, function(task) {
        return task.get('completedAt');
      });
    };
    Tasks.prototype.incompleteTasks = function() {
      return this.reject(function(task) {
        return task.isCompleted();
      });
    };
    Tasks.prototype.createStartTask = function() {
      var attributes, options;
      attributes = {
        title: 'Start',
        completedAt: (new Date).getTime(),
        duration: 0
      };
      options = {
        success: __bind(function() {
          console.log('triggering start');
          return this.trigger('start', this);
        }, this)
      };
      return this.create(attributes, options);
    };
    Tasks.prototype.duration = function() {
      var duration, durationSeconds, _i, _len, _ref;
      durationSeconds = 0;
      _ref = this.pluck('duration');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        duration = _ref[_i];
        if (duration > 0) {
          durationSeconds += duration;
        }
      }
      return durationSeconds;
    };
    Tasks.prototype.tagReports = function() {
      var tag, tagReports, task, _i, _len, _ref;
      tagReports = {
        other: {
          name: 'other',
          duration: 0
        }
      };
      _ref = this.completedTasks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        task = _ref[_i];
        if (task.isCompleted() && task.get('duration')) {
          if (tag = task.get('tag')) {
            if (tagReports[tag]) {
              tagReports[tag].duration += task.get('duration');
            } else {
              tagReports[tag] = {
                name: tag,
                duration: task.get('duration')
              };
            }
          } else {
            tagReports.other.duration += task.get('duration');
          }
        }
      }
      if (tagReports.other.duration === 0) {
        delete tagReports.other;
      }
      return _.sortBy(tagReports, function(tagReport) {
        return -tagReport.duration;
      });
    };
    Tasks.prototype.comparator = function(task) {
      return task.get('createdAt');
    };
    Tasks.prototype.metaData = function() {
      return {
        date: this.currentDate(),
        duration: this.duration(),
        tagReports: this.tagReports()
      };
    };
    Tasks.prototype.secondsSinceLastTaskWasCompleted = function() {
      var currentTime, lastCompletedTime, lastTask, millisecondsSince, secondsSince;
      currentTime = (new Date()).getTime();
      lastTask = _.last(this.completedTasks());
      if (!lastTask) {
        return 0;
      }
      lastCompletedTime = lastTask.get('completedAt');
      millisecondsSince = currentTime - lastCompletedTime;
      secondsSince = millisecondsSince / 1000;
      return secondsSince;
    };
    Tasks.prototype.willDestroyTask = function(task) {
      return this.registerUndo(task.toJSON());
    };
    Tasks.prototype.registerUndo = function(attributes) {
      this.undoAttributes = attributes;
      if (this.undoAttributes.id) {
        delete this.undoAttributes.id;
      }
      if (this.undoAttributes.createdAt) {
        return delete this.undoAttributes.createdAt;
      }
    };
    Tasks.prototype.resetUndo = function() {
      return this.undoAttributes = null;
    };
    Tasks.prototype.applyUndo = function() {
      this.create(this.undoAttributes);
      return this.resetUndo();
    };
    Tasks.prototype.undoItem = function() {
      return this.undoAttributes;
    };
    return Tasks;
  })();
  this.app = (_ref = window.app) != null ? _ref : {};
  this.app.Tasks = new Tasks;
}).call(this);
