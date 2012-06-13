/* DO NOT MODIFY. This file was compiled Wed, 23 Nov 2011 20:28:50 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/9-complete/app/coffeescripts/time_log_spec/time_log_spec.coffee
 */

(function() {
  var app, _ref;
  app = (_ref = window.app) != null ? _ref : {};
  jasmine.Matchers.prototype.toBeRecent = function() {
    return this.actual > ((new Date).getTime() - 5);
  };
  describe("Task", function() {
    describe("new task", function() {
      beforeEach(function() {
        return this.task = new app.Task({
          title: 'punch a brick'
        });
      });
      it("populates title", function() {
        return expect(this.task.get('title')).toEqual('punch a brick');
      });
      it("sets created at date", function() {
        return expect(this.task.get('createdAt')).toBeRecent();
      });
      it("sets tag to empty", function() {
        return expect(this.task.get('tag')).toEqual(null);
      });
      return it("is not completed", function() {
        return expect(this.task.isCompleted()).toBeFalsy();
      });
    });
    describe("task with tag", function() {
      beforeEach(function() {
        return this.task = new app.Task({
          title: 'eat a mushroom #lunch'
        });
      });
      return it("extracts tag", function() {
        return expect(this.task.get('tag')).toEqual('lunch');
      });
    });
    describe("task completion", function() {
      beforeEach(function() {
        this.task = new app.Task({
          title: 'throw a fireball'
        });
        return this.task.markComplete();
      });
      it("marks as completed", function() {
        return expect(this.task.isCompleted()).toBeTruthy();
      });
      return it("marks as uncompleted", function() {
        this.task.markIncomplete();
        return expect(this.task.isCompleted()).toBeFalsy();
      });
    });
    return describe("task collection duration calculations", function() {
      var resetDb;
      resetDb = function() {
        var databaseName;
        databaseName = 'test-Tasks';
        delete localStorage.getItem(databaseName);
        return app.Tasks.localStorage = new Store(databaseName);
      };
      beforeEach(function() {
        resetDb();
        app.Tasks.create({
          title: 'Start'
        });
        app.Tasks.first().markComplete();
        return this.task = app.Tasks.first();
      });
      it("populates duration for first event", function() {
        expect(this.task.isCompleted()).toBeTruthy();
        return expect(this.task.get('duration')).toEqual(0);
      });
      it("populates duration for subsequent events", function() {
        var mostRecentTask;
        this.task.set({
          completedAt: (new Date).getTime() - 60 * 1000
        });
        app.Tasks.create({
          title: 'throw a fireball'
        });
        mostRecentTask = app.Tasks.last();
        mostRecentTask.markComplete();
        return expect(mostRecentTask.get('duration')).toEqual(60);
      });
      return it("calculates total duration seconds for all completed tasks", function() {
        var i, _i, _len, _ref2;
        this.task.set({
          completedAt: (new Date).getTime(),
          duration: 0
        });
        _ref2 = [1, 2, 3];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          i = _ref2[_i];
          app.Tasks.create({
            title: 'throw a fireball',
            completedAt: (new Date).getTime(),
            duration: i * 15 * 60
          });
        }
        return expect(app.Tasks.duration()).toEqual(91 * 60);
      });
    });
  });
  describe("Util", function() {
    return describe("formats seconds as time", function() {
      it("with less than 10 minutes", function() {
        var result;
        result = app.Util.formatSecondsAsTime(6 * 60);
        return expect(result).toEqual(':06');
      });
      it("with less than an hour", function() {
        var result;
        result = app.Util.formatSecondsAsTime(45 * 60);
        return expect(result).toEqual(':45');
      });
      it("with more than an hour", function() {
        var result;
        result = app.Util.formatSecondsAsTime(60 * 60);
        return expect(result).toEqual('1:00');
      });
      return it("with much more than an hour", function() {
        var result;
        result = app.Util.formatSecondsAsTime(75 * 60);
        return expect(result).toEqual('1:15');
      });
    });
  });
}).call(this);
