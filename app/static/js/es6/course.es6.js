/* global ajax:true */
/* jshint unused:false */

(function() {
    'use strict';

    $(document).ready(initialize);

    function initialize() {
      $('.stages').on('click', '.edit-test', goToCreateTest);
      $('.courseinfo').on('click', '#take-course', takeCourse);
    }

    function takeCourse(){
      var courseId = $(this).attr('data-courseid');
      
    }

    function goToCreateTest(){
      var contentId = $(this).data('contentid');
      ajax(`/teacher/${contentId}/test`, 'GET', null, ()=>{
        window.location = `/teacher/${contentId}/test`;
      });
    }


})();
