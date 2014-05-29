/* global ajax:true */
/* jshint unused:false */

(function() {
    'use strict';

    $(document).ready(initialize);

    function initialize() {
      sortContent();
    }

    function sortContent(){
      var contentIds = [];
      $('.stage-info').map((i,div)=>{
        var id = $(div).attr('data-contentid');
        contentIds.push(id);
      });
      var infoDivs = [];
      contentIds.sort().map(id=>{
        infoDivs.push($('.stages').find('[data-contentid="'+id+'"]'));
      });
      $('.stages').empty().append(infoDivs);
    }

})();
