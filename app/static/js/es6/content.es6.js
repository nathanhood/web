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
    $('#add-link').click(addLinkResource);
    $('#add-video').click(addVideoResource);
    getVideos();
    getRefs();
  }


  function getRefs(){
    var refs = $('.ref').map((index, r)=>{
      var newRef = $(r).attr('data-txt').replace(/[+]/g, ' ');
      $(r).text(newRef);
    }).toArray();
    console.log(refs);
  }

  function getVideos(){
    var videos = $('.videos').find('.video').map((index, video)=>$(video).data('path')).toArray();
    for(var i = 0; i < videos.length; i++){
      $('.videos').append('<iframe width=560, height=315, src="//www.youtube.com/embed/'+videos[i]+'", frameborder=0, allowfullscreen></iframe>');
    }
	}

  function addLinkResource(){
    var resource = $('.link-resource:first').clone();
    $(resource).children().val('').appendTo('.link-resource-shell');
  }

  function addVideoResource(){
    var resource = $('.video-resource:first').clone();
    $(resource).children().val('').appendTo('.video-resource-shell');
  }

  function createContent(event){
    var array = [];
    $('#resource-links').serialize().split('&').forEach(s=>{
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
      console.log(finalTitles[j]);

      var assignment = _.assign(finalTitles[j], finalUrls[j]);
      resources.push(assignment);
    }

    var videos = $('.video-resource-shell').find('.text').map((index, video)=>{
      var split = $(video).val().split('=');
      return split[1];
    }).toArray();
    console.log(videos);
    var html = editor.getHTML();
    var title = $('h1').text();
    var courseId = $('h1').data('courseid');
    ajax(`/teacher/${courseId}/content/create`, 'POST', {title: title, bodyText:html, resources:resources, videos:videos}, html=>{
      window.location = '/courses/edit';
    });
    event.preventDefault();
  }

  function clip(string){
    return string.trim();
  }

})();
