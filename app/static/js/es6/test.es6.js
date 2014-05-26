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
    $('#add-question').click(addQuestion);
    $('.question-shell').on('click', '.add-possible', addPossibleAnswer);
    $('#create-test').click(createTest);
  }

  var form = [];
  var test = [];

  function createTest(){
    form = $('form').serializeArray();
    while(form.length > 0){
      formatQuestionAnswers(form);
    }

    var contentId = $('#contentId').data('contentid');
    var contentTitle = $('#contentId').text();
    ajax(`/teacher/${contentId}/test/create`, 'POST', {contentId:contentId, contentTitle:contentTitle, qAndA:test}, ()=>{
      window.location('/courses/edit');
    });
  }

  function formatQuestionAnswers(array){
    var question = [];
    for(var i = 0; i < 6; i++){
      question.push(array[0]);
      array.splice(0, 1);
    }
    test.push(question);
  }

  function addPossibleAnswer(event){
    var answers = [];
    $(this).prevAll('.possible-answer').map((index, a)=>{
      answers.push($('<option>').text($(a).val()));
    });
    $(this).next('.answer').append(answers);
    event.preventDefault();
  }

  function addQuestion(){
    var question = $('.question:first').clone();
    var option = $('<option>').text('Correct Answer');
    $(question).children('.answer').empty().append(option);
    $(question).children().val('').appendTo('.question-shell');
  }


})();
