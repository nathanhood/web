var Quill, editor;

(function(){
  'use strict';

  $(document).ready( () => {
    quill();
    appendQuill();
  });

  function quill() {

    editor = new Quill('#editor', {
      modules: {
        'link-tooltip': true,
      },
      theme: 'snow',
      formats: ['image']
    });

    editor.addModule('toolbar', {
      container: '#toolbar'
    });

  }

  function appendQuill() {

    var html = editor.getHTML();
    console.log(html);

    var text = editor.getText();
    console.log(text);

  }


})();
