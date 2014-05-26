(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('.stages').on('click', '.edit-test', goToCreateTest);
  }
  function goToCreateTest() {
    var contentId = $(this).data('contentid');
    ajax(("/teacher/" + contentId + "/test"), 'GET', null, (function() {
      window.location = ("/teacher/" + contentId + "/test");
    }));
  }
})();

//# sourceMappingURL=course.map
