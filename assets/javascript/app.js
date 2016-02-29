

$( document ).ready(function() {



//questions
var quiz = [{
	'questionNumber' : 1,
	'question' : "What is question 1?",
	'choices' : ["answer 1", "answer2", "answer3", "answer4"],
	'correct' : "answer4",
	'placeHolder' : 'assets/images/placeHolder1.png',
	'answerInfo' : 'this is the reason that the answer is correct or not 1'
	}, {
	'questionNumber' : 2,
	'question' : "What is question 2?",
	'choices' : ["answer 1", "answer2", "answer3", "answer4"],
	'correct' : "answer4",
	'placeHolder' : 'assets/images/placeHolder2.png',
	'answerInfo' : 'this is the reason that the answer is correct or not 2'

	} , {
	'questionNumber' : 3,		
	'question' : "What is question 3?",
	'choices' : ["answer 1", "answer2", "answer3", "answer4"],
	'correct' : "answer4",
	'placeHolder' : 'assets/images/placeHolder1.png',
	'answerInfo' : 'this is the reason that the answer is correct or not 3'
	} , {
	'questionNumber' : 4,
	'question' : "What is question 4?",
	'choices' : ["answer 1", "answer2", "answer3", "answer4"],
	'correct' : "answer4",
	'placeHolder' : 'assets/images/placeHolder2.png',
	'answerInfo' : 'this is the reason that the answer is correct or not 4' 
	}
]


//global variables

var right = 0;
var wrong = 0;
var total = right + wrong;
var unanswered = 0;
var percent = 0;
var quesNum = 0;


var timer = {
	time : 10,
	reset: function(){
		timer.time = 10;
	},
	start: function(){
		counter = setInterval(timer.count, 1000);
	},
	stop: function(){
		clearInterval(counter);
	},
	count: function(){
		timer.time --;
		var converted = timer.timeConverter(timer.time);
		$('#timeShow').html(converted);
		timer.check();

	},
	timeConverter: function(t){
    //This function is done. You do not need to touch it. It takes the current time in seconds and converts it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t/60);
    var seconds = t - (minutes * 60);
    if (seconds < 10){
      seconds = "0" + seconds;
    }
    if (minutes === 0){
      minutes = "00";
    } else if (minutes < 10){
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  },
  	check: function(){
  	if (timer.time == 0) {
  		timer.stop();
  		timer.reset();
  		unanswered++;
  		quesNum++;
  		startQuiz();
  	}
  }
}
//draw board
function createBoard(){
	$('.container').empty();
	$('#opening').removeClass().addClass('container game text-center');
	$('.container').append('<div class="row"><div class="timerContainer"><div id="timeLeft">Time Left:</div><div id="timeShow">00:00</div></div>'); 
	$('.container').append('<div class="row"><div class="col-md-10 col-md-offset-1 quizContainer"><div id="question"></div><ul id="answers"></ul></div></div>'); 
	$('.container').append('<div class="row"><div class="questionsLeftContainer"><div id="questionsLeft">Questions:</div><div class="numberLeft" id="numQuestionsLeft">1 of 10</div></div></div></div>');
	startQuiz();
};



//functions

function resetGame(){
	right = 0;
	wrong = 0;
	percent = 0;
	quesNum = 0;
	createBoard();
}



function youAreCorrect(){
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="correct">You are correct!!!</span><br>' + quiz[quesNum].answerInfo + '</div>');
	right++;
	quesNum++;
	//check  quiz is complete

	
}

function youAreIncorrect(){
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="incorrect">Sorry. You are incorrect.</span><br>' + quiz[quesNum].answerInfo + '</div>');
	wrong++;
	quesNum++;
	}



function quizEnd() {
	$('#timeShow').text('COMPLETE');
	percent = (right/quiz.length) * 100;
	$('.quizContainer').html('<div class="text-center" id="endOfGame">You have reached the end of the quiz</div><hr class="styleOne">');
	$('.quizContainer').append('<div class="text-center" id="score">Correct answers: <span id="correct">' + right + '</span></div>');
	$('.quizContainer').append('<div class="text-center" id="score">Inorrect answers: <span id="incorrect">' + wrong + '</span></div>');
	$('.quizContainer').append('<div class="text-center" id="score">Unanswered: ' + unanswered + '</div>');
	$('.quizContainer').append('<hr class="styleTwo"><div class="text-center" id="percent">You scored: <span id="incorrect">' + percent + '%</span></div>');
	$('.quizContainer').append('<div><button class="start">Restart Game</button></div>');
	$('.start').click(function(){
		resetGame();
	});
}





//choose question

function startQuiz(){


	if (quesNum == quiz.length) {
		quizEnd();
	} else {

//timer restart
		timer.reset();
		timer.start();

//number of questions left
var slideNum = quesNum + 1;
$('.numberLeft').html('<div id="numQuestionsLeft">' + slideNum + " of " + quiz.length + '</div>');

//empty div
	$('quizContainer').empty();
	



//create divs
	$('.quizContainer').html('<div id="question"></div>' + '<ul id="answers"></ul>');

	
//write question to html
	$('#question').html(quiz[quesNum].question);
	
//collect answers 		
	for (var i = 0; i < quiz[quesNum].choices.length; i++) {
		$('#answers').append('<li>' + quiz[quesNum].choices[i] + '</li>');
		}

//record user choice
	$("#answers li").click(function() {
		var userGuess = $(this).text();

//compare userchoice to correct answer
		if (userGuess == quiz[quesNum].correct){

			setTimeout(youAreCorrect, 500);

	
			setTimeout(startQuiz, 2000);

			} else {

			setTimeout(youAreIncorrect, 500);
	
			setTimeout(startQuiz, 2000);

			}


	});



}




}
			

//quizEnd();
//startQuiz();

$('.start').click(function(){
	createBoard();
});


});


/*
// Unfinished code

//push choice to questionRepeat variable so number does not repeat
	questionRepeat.push(randomNum);

//check to see if randomNumber has been used. If not, continue
if (questionRepeat.indexOf(randomNum) == -1 ) {	
	}
*/