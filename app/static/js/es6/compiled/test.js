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
    createForm();
    $('#add-answer').click(addPossibleAnswer);
    $('.answer-box').on('blur', 'input:last', addAnswer);
    $('.answer-box').on('click', 'button', deleteAnswer);
    $('.created-questions').on('click', 'button', deleteQuestion);
    $('#add-question').click(addQuestion);
    $('#create-test').click(createTest);
    $('#submit-test').click(submitTest);
  }
  function createForm() {
    $('.question').empty().append('<input class=form-control type=text, placeholder="Write Question">');
    $('.answer-box').empty().append('<input class=form-control type=text, placeholder="Possible Answer">').append('<button class=btn>Delete</button>');
    var answer = $('<select class=answer>').append('<option>Correct Answer</option>');
    $('.correct-answer').empty().append(answer);
  }
  function addAnswer() {
    var answer = [];
    $('.answer-box').find('input').map((function(i, a) {
      return answer.push($(a).val());
    }));
    var options = answer.map((function(a) {
      return $('<option>').text(a);
    }));
    $('.answer').empty().append(options);
  }
  function addPossibleAnswer() {
    $('.answer-box').append('<input class=form-control type=text, placeholder="Possible Answer">').append('<button class=btn>Delete</button>');
  }
  function deleteAnswer() {
    $(this).prev('input').remove();
    $(this).remove();
    addAnswer();
  }
  function addQuestion(event) {
    var question = $('.question').children().val();
    var answers = [];
    $('.answer-box').children().map((function(i, answer) {
      return answers.push($(answer).val());
    }));
    var correct = $('.answer > option').filter(':selected').text();
    var contentId = $('#contentId').attr('data-contentid');
    ajax(("/test/create/" + contentId), 'POST', {
      question: question,
      answers: answers,
      correct: correct
    }, (function(jsonObj) {
      var questions = jsonObj.test.qAndA.map((function(q) {
        return q.question;
      }));
      var correct = jsonObj.test.qAndA.map((function(q) {
        return q.correct;
      }));
      var qDivs = questions.map((function(q, i) {
        return $('<div>').text((i * 1 + 1) + ') ' + q + ' - ' + correct[$traceurRuntime.toProperty(i)]).append('<button class=btn>Delete</button>');
      }));
      $('.created-questions').empty().append('<h2 class=created-q-header>Created Questions</h2>').append(qDivs);
    }), 'json');
    createForm();
    event.preventDefault();
  }
  function deleteQuestion(event) {
    var question = $(this).parent().text().split(')')[0] - 1;
    var contentId = $('#contentId').attr('data-contentid');
    ajax(("/test/question/delete/" + contentId), 'POST', {questionIndex: question}, (function(jsonObj) {
      var questions = jsonObj.test.qAndA.map((function(q) {
        return q.question;
      }));
      var correct = jsonObj.test.qAndA.map((function(q) {
        return q.correct;
      }));
      var qDivs = questions.map((function(q, i) {
        return $('<div>').text((i * 1 + 1) + ') ' + q + ' - ' + correct[$traceurRuntime.toProperty(i)]).append('<button class=btn>Delete</button>');
      }));
      $('.created-questions').empty().append('<h2 class=created-q-header>Created Questions</h2>').append(qDivs);
    }), 'json');
    event.preventDefault();
  }
  function submitTest(event) {
    var testId = $('#testId').attr('data-testid');
    var form = $('form#test').serializeArray();
    ajax(("/learn/" + testId + "/grade"), 'POST', form, (function(html) {
      console.log(html);
      $('#results').append(html);
    }));
    event.preventDefault();
  }
  var form = [];
  var test = [];
  function createTest() {
    form = $('form').serializeArray();
    while (form.length > 0) {
      formatQuestions(form);
    }
    indexQuestions();
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
  function indexQuestions() {
    for (var i = 0; i < test.length; i++) {
      var obj = {};
      obj.index = i;
      test[$traceurRuntime.toProperty(i)].push(obj);
    }
  }
  function formatQuestions(array) {
    var question = [];
    for (var i = 0; i < 6; i++) {
      question.push(array[0]);
      array.splice(0, 1);
    }
    test.push(question);
  }
})();

//# sourceMappingURL=test.map
