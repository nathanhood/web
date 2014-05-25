function ajax(url, verb) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: verb,
    dataType: dataType,
    data: data,
    success: success
  });
}
(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('#create-content').click(createContent);
    $('#add-link').click(addLinkResource);
    $('#add-video').click(addVideoResource);
  }
  function addLinkResource() {
    var resource = $('.link-resource:first').clone();
    $(resource).children().val('').appendTo('.link-resource-shell');
  }
  function addVideoResource() {
    var resource = $('.video-resource:first').clone();
    $(resource).children().val('').appendTo('.video-resource-shell');
  }
  function createContent(event) {
    var array = [];
    $('#resource-links').serialize().split('&').forEach((function(s) {
      var string = s.split('=');
      var obj = {};
      $traceurRuntime.setProperty(obj, string[0], string[1]);
      array.push(obj);
    }));
    var titles = array.map((function(obj, i) {
      if (i % 2 === 0) {
        return obj;
      }
    }));
    var urls = array.map((function(obj, i) {
      if (i % 2) {
        return obj;
      }
    }));
    var finalTitles = _.compact(titles);
    var finalUrls = _.compact(urls);
    var resources = [];
    for (var j = 0; j < finalTitles.length; j++) {
      var assignment = _.assign(finalTitles[$traceurRuntime.toProperty(j)], finalUrls[$traceurRuntime.toProperty(j)]);
      resources.push(assignment);
    }
    var videos = $('.video-resource-shell').find('.text').map((function(index, video) {
      return $(video).val();
    })).toArray();
    var html = editor.getHTML();
    var title = $('h1').text();
    var courseId = $('h1').data('courseid');
    ajax(("/teacher/" + courseId + "/content/create"), 'POST', {
      title: title,
      bodyText: html,
      resources: resources,
      videos: videos
    }, (function(html) {
      window.location = '/courses/edit';
    }));
    event.preventDefault();
  }
  function clip(string) {
    return string.trim();
  }
})();

//# sourceMappingURL=content.map
