var Quill,
    editor;
(function() {
  'use strict';
  $(document).ready((function() {
    quill();
  }));
  function quill() {
    editor = new Quill('#editor', {
      modules: {
        'link-tooltip': true,
        'image-tooltip': true
      },
      theme: 'snow'
    });
    editor.addModule('toolbar', {container: '#toolbar'});
  }
})();

//# sourceMappingURL=quill.map
