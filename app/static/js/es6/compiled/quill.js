var Quill,
    editor;
(function() {
  'use strict';
  $(document).ready((function() {
    quill();
    appendQuill();
  }));
  function quill() {
    editor = new Quill('#editor', {
      modules: {'link-tooltip': true},
      theme: 'snow'
    });
    editor.addModule('toolbar', {container: '#toolbar'});
  }
  function appendQuill() {
    var html = editor.getHTML();
    console.log(html);
    var text = editor.getText();
    console.log(text);
  }
})();

//# sourceMappingURL=quill.map
