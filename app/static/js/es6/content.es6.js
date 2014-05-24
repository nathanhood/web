/* global editor, _ */
/* jshint unused:false */

function ajax(url, verb, data={}, success=r=>console.log(r), dataType='html'){//defaulting to html
    'use strict';
  $.ajax({url:url, type:verb, dataType:dataType, data:data, success:success});
}



(function() {
  'use strict';

  $(document).ready(initialize);

  function initialize() {
    $('#create-content').click(createContent);
    $('#add-resource').click(addResource);
  }

  function addResource(){
    var resource = $('.resource:first').clone();
    $(resource).children().val('').appendTo('.resource-shell');
  }

  function createContent(){
    var array = [];
    $('form').serialize().split('&').forEach(s=>{
      var string = s.split('=');
      var obj = {};
      obj[string[0]] = string[1];
      array.push(obj);
    });

    var titles = array.map((obj, i)=>{
      if(i % 2 === 0){
        return obj;
      }
    });

    var urls = array.map((obj, i)=>{
      if(i % 2){
        return obj;
      }
    });

    var finalTitles = _.compact(titles);
    var finalUrls = _.compact(urls);
    var resources = [];
    for(var j = 0 ; j < finalTitles.length; j++){
      var assignment = _.assign(finalTitles[j], finalUrls[j]);
      resources.push(assignment);
    }

    var html = editor.getHTML();
    var title = $('h1').text();
    var courseId = $('h1').data('courseid');
    ajax(`/teacher/${courseId}/content/create`, 'POST', {title: title, bodyText:html, resources:resources}, ()=>{});

  }

  // function createObject(title, titleVal, url, urlVal, ...rest){
  //   var obj = {title:titleVal, url:urlVal};
  //   console.log(obj);
  //   console.log(rest);
  // }


})();
