/* DO NOT MODIFY. This file was compiled Wed, 23 Nov 2011 20:29:57 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/9-complete/app/coffeescripts/time_log/views.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery(function() {
    var AppView, ClocksView, CompletedTaskView, CompletedTasksView, DateTitleView, ElapsedClockView, IncompleteTaskView, IncompleteTasksView, MenuView, NewTaskView, TasksView, UndoView, _ref;
    AppView = (function() {
      __extends(AppView, Backbone.View);
      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }
      AppView.prototype.el = '#wrap';
      AppView.prototype.initialize = function(options) {
        this.collection.bind('reset', this.render, this);
        return this.subviews = [
          new MenuView({
            collection: this.collection
          }), new DateTitleView({
            collection: this.collection
          }), new TasksView({
            collection: this.collection
          }), new NewTaskView({
            collection: this.collection
          })
        ];
      };
      AppView.prototype.render = function() {
        var subview, _i, _len, _ref;
        $(this.el).empty();
        _ref = this.subviews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subview = _ref[_i];
          $(this.el).append(subview.render().el);
        }
        return this;
      };
      return AppView;
    })();
    MenuView = (function() {
      __extends(MenuView, Backbone.View);
      function MenuView() {
        MenuView.__super__.constructor.apply(this, arguments);
      }
      MenuView.prototype.tagName = 'nav';
      MenuView.prototype.template = _.template($('#menu-template').html());
      MenuView.prototype.events = {
        'click .previous': 'goToPreviousDate',
        'click .today': 'goToToday',
        'click .next': 'goToNextDate'
      };
      MenuView.prototype.render = function() {
        $(this.el).html(this.template());
        this.delegateEvents();
        return this;
      };
      MenuView.prototype.goToPreviousDate = function(event) {
        return this.collection.goToPreviousDate();
      };
      MenuView.prototype.goToToday = function(event) {
        return this.collection.setDate(new Date);
      };
      MenuView.prototype.goToNextDate = function(event) {
        return this.collection.goToNextDate();
      };
      return MenuView;
    })();
    DateTitleView = (function() {
      __extends(DateTitleView, Backbone.View);
      function DateTitleView() {
        DateTitleView.__super__.constructor.apply(this, arguments);
      }
      DateTitleView.prototype.template = _.template($('#date-title-template').html());
      DateTitleView.prototype.render = function() {
        $(this.el).html(this.template(this.collection.metaData()));
        return this;
      };
      return DateTitleView;
    })();
    TasksView = (function() {
      __extends(TasksView, Backbone.View);
      function TasksView() {
        TasksView.__super__.constructor.apply(this, arguments);
      }
      TasksView.prototype.className = 'tasks';
      TasksView.prototype.template = _.template($('#tasks-template').html());
      TasksView.prototype.blankStateTemplate = _.template($('#blank-state-template').html());
      TasksView.prototype.events = {
        'click .start-tracking': 'startTracking'
      };
      TasksView.prototype.initialize = function(options) {
        this.completedSubviews = [
          new CompletedTasksView({
            collection: this.collection
          }), new ClocksView({
            collection: this.collection
          }), new ElapsedClockView({
            collection: this.collection
          })
        ];
        this.incompleteSubviews = [
          new IncompleteTasksView({
            collection: this.collection
          })
        ];
        return this.collection.bind('start', this.render, this);
      };
      TasksView.prototype.render = function() {
        var subview, _i, _j, _len, _len2, _ref, _ref2;
        if (this.collection.hasStarted()) {
          $(this.el).html(this.template());
          _ref = this.completedSubviews;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            subview = _ref[_i];
            $(this.el).append(subview.render().el);
          }
          if (this.collection.isToday()) {
            this.$('.elapsed-clock').show();
          } else {
            this.$('.elapsed-clock').hide();
          }
        } else {
          $(this.el).html(this.blankStateTemplate());
          if (!this.collection.isToday()) {
            this.$('.message-blank').text('No tasks were tracked on this day.');
          }
        }
        _ref2 = this.incompleteSubviews;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          subview = _ref2[_j];
          $(this.el).append(subview.render().el);
        }
        if (!this.collection.hasStarted()) {
          this.$('.is-done').prop('disabled', true);
        }
        this.delegateEvents();
        return this;
      };
      TasksView.prototype.startTracking = function() {
        this.collection.createStartTask();
        return $('#new-task').val('').focus();
      };
      return TasksView;
    })();
    ElapsedClockView = (function() {
      __extends(ElapsedClockView, Backbone.View);
      function ElapsedClockView() {
        ElapsedClockView.__super__.constructor.apply(this, arguments);
      }
      ElapsedClockView.prototype.className = 'elapsed-clock';
      ElapsedClockView.prototype.template = _.template($('#elapsed-clock-template').html());
      ElapsedClockView.prototype.initialize = function() {
        return this.collection.bind('change', this.render, this);
      };
      ElapsedClockView.prototype.render = function() {
        $(this.el).html(this.template({
          elapsedSeconds: this.collection.secondsSinceLastTaskWasCompleted()
        }));
        setTimeout(__bind(function() {
          return this.render();
        }, this), 1000 * 60);
        return this;
      };
      return ElapsedClockView;
    })();
    ClocksView = (function() {
      __extends(ClocksView, Backbone.View);
      function ClocksView() {
        ClocksView.__super__.constructor.apply(this, arguments);
      }
      ClocksView.prototype.className = 'clocks';
      ClocksView.prototype.template = _.template($('#clocks-template').html());
      ClocksView.prototype.initialize = function() {
        return this.collection.bind('change', this.render, this);
      };
      ClocksView.prototype.render = function() {
        $(this.el).html(this.template(this.collection.metaData()));
        return this;
      };
      return ClocksView;
    })();
    CompletedTasksView = (function() {
      __extends(CompletedTasksView, Backbone.View);
      function CompletedTasksView() {
        CompletedTasksView.__super__.constructor.apply(this, arguments);
      }
      CompletedTasksView.prototype.id = 'completed-tasks';
      CompletedTasksView.prototype.tagName = 'ul';
      CompletedTasksView.prototype.initialize = function() {
        this.collection.bind('change', this.render, this);
        this.collection.bind('add', this.render, this);
        return this.collection.bind('remove', this.render, this);
      };
      CompletedTasksView.prototype.render = function() {
        var completedTaskView, task, _i, _len, _ref;
        $(this.el).empty();
        _ref = this.collection.completedTasks();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          task = _ref[_i];
          completedTaskView = new CompletedTaskView({
            model: task
          });
          $(this.el).append(completedTaskView.render().el);
          if (this.collection.completedTasks().length === 1) {
            completedTaskView.disable();
          } else {
            if (task === _.last(this.collection.completedTasks())) {
              completedTaskView.enable();
            } else {
              completedTaskView.disable();
            }
          }
        }
        return this;
      };
      return CompletedTasksView;
    })();
    CompletedTaskView = (function() {
      __extends(CompletedTaskView, Backbone.View);
      function CompletedTaskView() {
        CompletedTaskView.__super__.constructor.apply(this, arguments);
      }
      CompletedTaskView.prototype.className = 'task';
      CompletedTaskView.prototype.tagName = 'li';
      CompletedTaskView.prototype.template = _.template($('#completed-task-template').html());
      CompletedTaskView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      };
      CompletedTaskView.prototype.disable = function() {
        return this.$('input').prop('disabled', true);
      };
      CompletedTaskView.prototype.enable = function() {
        return this.$('input').prop('disabled', false);
      };
      CompletedTaskView.prototype.events = {
        'click input.is-done': 'markComplete'
      };
      CompletedTaskView.prototype.markComplete = function() {
        if (this.$('.is-done').prop('checked')) {
          this.model.markComplete();
        } else {
          this.model.markIncomplete();
        }
        return this.model.save();
      };
      return CompletedTaskView;
    })();
    IncompleteTasksView = (function() {
      __extends(IncompleteTasksView, Backbone.View);
      function IncompleteTasksView() {
        IncompleteTasksView.__super__.constructor.apply(this, arguments);
      }
      IncompleteTasksView.prototype.id = 'tasks-to-complete';
      IncompleteTasksView.prototype.tagName = 'ul';
      IncompleteTasksView.prototype.initialize = function(options) {
        this.collection.bind('add', this.render, this);
        this.collection.bind('change', this.render, this);
        return this.collection.bind('destroy', this.render, this);
      };
      IncompleteTasksView.prototype.render = function() {
        var incompleteTaskView, task, undoView, _i, _len, _ref;
        $(this.el).empty();
        _ref = this.collection.incompleteTasks();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          task = _ref[_i];
          incompleteTaskView = new IncompleteTaskView({
            model: task
          });
          $(this.el).append(incompleteTaskView.render().el);
        }
        if (this.collection.undoItem()) {
          undoView = new UndoView({
            collection: this.collection
          });
          $(this.el).append(undoView.render().el);
        }
        return this;
      };
      return IncompleteTasksView;
    })();
    IncompleteTaskView = (function() {
      __extends(IncompleteTaskView, Backbone.View);
      function IncompleteTaskView() {
        IncompleteTaskView.__super__.constructor.apply(this, arguments);
      }
      IncompleteTaskView.prototype.className = 'task';
      IncompleteTaskView.prototype.tagName = 'li';
      IncompleteTaskView.prototype.template = _.template($('#incomplete-task-template').html());
      IncompleteTaskView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      };
      IncompleteTaskView.prototype.events = {
        'click input.is-done': 'markComplete',
        'click .destroy': 'destroy',
        'click .edit': 'edit',
        'keypress .edit-task': 'saveOnEnter'
      };
      IncompleteTaskView.prototype.markComplete = function() {
        if (this.$('.is-done').prop('checked')) {
          this.model.markComplete();
        } else {
          this.model.markIncomplete();
        }
        return this.model.save();
      };
      IncompleteTaskView.prototype.edit = function() {
        $(this.el).html(this.make('input', {
          type: 'text',
          "class": 'edit-task',
          value: this.model.get('title')
        }));
        return this.$('.edit-task').focus();
      };
      IncompleteTaskView.prototype.saveOnEnter = function(event) {
        if (event.keyCode === 13) {
          this.model.save({
            title: this.$('.edit-task').val()
          });
          return this.render();
        }
      };
      IncompleteTaskView.prototype.destroy = function() {
        return this.model.destroy();
      };
      return IncompleteTaskView;
    })();
    UndoView = (function() {
      __extends(UndoView, Backbone.View);
      function UndoView() {
        UndoView.__super__.constructor.apply(this, arguments);
      }
      UndoView.prototype.id = 'undo-template';
      UndoView.prototype.className = 'task';
      UndoView.prototype.tagName = 'li';
      UndoView.prototype.events = {
        'click .undo-button': 'applyUndo'
      };
      UndoView.prototype.template = _.template($('#undo-template').html());
      UndoView.prototype.render = function() {
        $(this.el).html(this.template(this.collection.undoItem()));
        return this;
      };
      UndoView.prototype.applyUndo = function() {
        return this.collection.applyUndo();
      };
      return UndoView;
    })();
    NewTaskView = (function() {
      __extends(NewTaskView, Backbone.View);
      function NewTaskView() {
        this.flashWarning = __bind(this.flashWarning, this);
        NewTaskView.__super__.constructor.apply(this, arguments);
      }
      NewTaskView.prototype.tagName = 'form';
      NewTaskView.prototype.template = _.template($('#new-task-template').html());
      NewTaskView.prototype.events = {
        'keypress #new-task': 'saveOnEnter',
        'focusout #new-task': 'hideWarning'
      };
      NewTaskView.prototype.render = function() {
        if (this.collection.isToday()) {
          $(this.el).html(this.template());
          this.delegateEvents();
        } else {
          $(this.el).empty();
        }
        return this;
      };
      NewTaskView.prototype.saveOnEnter = function(event) {
        var errorCallback, newAttributes;
        if (event.keyCode === 13) {
          event.preventDefault();
          newAttributes = {
            title: $('#new-task').val()
          };
          errorCallback = {
            error: this.flashWarning
          };
          if (this.collection.create(newAttributes, errorCallback)) {
            this.hideWarning();
            return this.focus();
          }
        }
      };
      NewTaskView.prototype.focus = function() {
        return $('#new-task').val('').focus();
      };
      NewTaskView.prototype.hideWarning = function() {
        return $('#warning').hide();
      };
      NewTaskView.prototype.flashWarning = function(model, error) {
        console.log(error);
        $('#warning').fadeOut(100);
        return $('#warning').fadeIn(400);
      };
      return NewTaskView;
    })();
    this.app = (_ref = window.app) != null ? _ref : {};
    return this.app.AppView = AppView;
  });
}).call(this);
