var Quill;
(function() {
  'use strict';
  $(document).ready((function() {
    quill();
  }));
  function quill() {
    console.log('quilling it up');
    var editor = new Quill('#editor');
    editor.addModule('toolbar', {container: '#toolbar'});
  }
})();

//# sourceMappingURL=main.map
