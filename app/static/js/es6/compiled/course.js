(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    sortContent();
  }
  function sortContent() {
    var contentIds = [];
    $('.stage-info').map((function(i, div) {
      var id = $(div).attr('data-contentid');
      contentIds.push(id);
    }));
    var infoDivs = [];
    contentIds.sort().map((function(id) {
      infoDivs.push($('.stages').find('[data-contentid="' + id + '"]'));
    }));
    $('.stages').empty().append(infoDivs);
  }
})();

//# sourceMappingURL=course.map
