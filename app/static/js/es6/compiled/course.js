(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    sortContent();
    $('.stages').on('click', '.edit-test', goToCreateTest);
  }
  function goToCreateTest() {
    var contentId = $(this).data('contentid');
    ajax(("/teacher/" + contentId + "/test"), 'GET', null, (function() {
      window.location = ("/teacher/" + contentId + "/test");
    }));
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
