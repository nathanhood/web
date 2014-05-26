function ajax(url, verb) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: verb,
    dataType: dataType,
    data: data,
    success: success
  });
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
  function createTest() {
    form = $('form').serializeArray();
    while (form.length > 0) {
      formatQuestionAnswers(form);
    }
    var contentId = $('#contentId').data('contentid');
    var contentTitle = $('#contentId').text();
    ajax(("/teacher/" + contentId + "/test/create"), 'POST', {
      contentId: contentId,
      contentTitle: contentTitle,
      qAndA: test
    }, (function() {
      window.location('/courses/edit');
    }));
  }
  function formatQuestionAnswers(array) {
    var question = [];
    for (var i = 0; i < 6; i++) {
      question.push(array[0]);
      array.splice(0, 1);
    }
    test.push(question);
  }
  function addPossibleAnswer(event) {
    var answers = [];
    $(this).prevAll('.possible-answer').map((function(index, a) {
      answers.push($('<option>').text($(a).val()));
    }));
    $(this).next('.answer').append(answers);
    event.preventDefault();
  }
  function addQuestion() {
    var question = $('.question:first').clone();
    var option = $('<option>').text('Correct Answer');
    $(question).children('.answer').empty().append(option);
    $(question).children().val('').appendTo('.question-shell');
  }
})();

//# sourceMappingURL=test.map
