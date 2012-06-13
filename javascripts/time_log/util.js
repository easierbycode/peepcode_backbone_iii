/* DO NOT MODIFY. This file was compiled Thu, 10 Nov 2011 21:52:57 GMT from
 * /Users/topfunky/repos/peepcode/press/2011/peepcode-meet-backbone/code/iii/9-complete/app/coffeescripts/time_log/util.coffee
 */

(function() {
  var Util;
  Util = {
    formatSecondsAsTime: function(seconds) {
      var hours, hoursString, minutes, minutesString, secondsInt;
      secondsInt = parseInt(seconds, 10);
      hours = parseInt(secondsInt / 60 / 60, 10);
      minutes = parseInt((secondsInt / 60) % 60, 10);
      hoursString = hours > 0 ? hours : '';
      minutesString = minutes > 9 ? minutes : '0' + minutes;
      return hoursString + ':' + minutesString;
    },
    escapeHTML: function(string) {
      return string.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
    },
    formatDateAsTitle: function(date) {
      return date.toLocaleDateString();
    }
  };
  this.app = window.app || {};
  this.app.Util = Util;
}).call(this);
