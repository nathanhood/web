(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('#add-question').click(addQuestion);
    $('.question-shell').on('click', '.add-possible', addPossibleAnswer);
    $('#create-test').click(createTest);
  }
  function createTest() {
    var questions = $('form').serialize();
    console.log(questions);
  }
  function addPossibleAnswer(event) {
    var answer = $(this).prev('.possible-answer').val();
    var option = $('<option>').text(answer);
    $(this).next('.answer').append(option);
    $('.possible-answer').val('');
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
