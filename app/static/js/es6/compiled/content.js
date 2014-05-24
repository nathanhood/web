(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('#create-content').click(createContent);
    $('#add-resource').click(addResource);
  }
  function addResource() {
    $('.resource:first').clone().appendTo('.resource-shell');
  }
  function createContent() {
    var forms = $('form').serialize();
    console.log(forms);
    var html = editor.getHTML();
    console.log(html);
  }
})();

//# sourceMappingURL=content.map
