

$( document ).ready(function() {

//questions
var quiz = [{
	'questionNumber' : 1,
	'question' : 'What college did Jerry and George attend?',
	'choices' : ['NYU', 'Rutgers', 'Queens College', 'Did not go to college'],
	'correct' : 'Queens College',
	'placeHolder' : 'assets/images/q1.png',
	'answerInfo' : 'Jerry and George both attended Queens College'
	}, {
	'questionNumber' : 2,
	'question' : 'When Kramer encourages Jerry to dress as a character, which one did he not suggest?',
	'choices' : ['Indian', 'Cowboy', 'Pirate'],
	'correct' : 'Indian',
	'placeHolder' : 'assets/images/q2.png',
	'answerInfo' : 'Kramer did not suggest that Jerry dress like an Indian'

	}, {
	'questionNumber' : 3,		
	'question' : "When George examines his mother's bra, what happens to it?",
	'choices' : ['He breaks the strap', 'He wears it', 'He freezes it', 'He gets ketchup on it'],
	'correct' : "answer4",
	'placeHolder' : 'assets/images/q3.png',
	'answerInfo' : "When George examines his mother's bra, he gets ketchup on it"
	}, {
	'questionNumber' : 4,
	'question' : 'When Kramer gets Bette Midler an Italian Ice, what flavor does she want?',
	'choices' : ['Pineapple', 'Tutti-frutti', 'Strawberry', 'Banana'],
	'correct' : 'Pineapple',
	'placeHolder' : 'assets/images/q4.png',
	'answerInfo' : 'Bette Midler requests a pineapple Italian Ice' 
	}, {
	'questionNumber' : 5,
	'question' : 'During the final episode, what does George confess when he thinks the plane will crash?',
	'choices' : ['He loves Elaine', 'He cheated on the Contest', 'He had a fear of flying', 'He stole a magazine at the airport'],
	'correct' : 'He cheated on the Contest',
	'placeHolder' : 'assets/images/q5.png',
	'answerInfo' : 'George confesses that he cheated in the Contest' 
	}, {
	'questionNumber' : 6,
	'question' : "When Elaine's boyfriend tries to rekindle their romance while in the hospital, Jerry says the date would interfere with them going where?",
	'choices' : ['The Catskills', 'The Poconos', 'The Hamptons', 'Atlantic City'],
	'correct' : 'The Poconos',
	'placeHolder' : 'assets/images/q6.png',
	'answerInfo' : 'Jerry says the date would interfere with them going to the Poconos' 
	}, {
	'questionNumber' : 7,
	'question' : "What candy bar is George upset about not getting out of the candy machine at Puddy's dealership?",
	'choices' : ['Almond Joy', 'Kit-kat', 'Twix', 'Heath'],
	'correct' : 'Twix',
	'placeHolder' : 'assets/images/q7.png',
	'answerInfo' : 'George is upset he did not get a Twix out of the machine' 
	}, {
	'questionNumber' : 8,
	'question' : 'When Elaine visits the elderly woman with the goiter, who did the woman claim she had an affair with?',
	'choices' : ['Franklin Roosevelt', 'Douglas MacArthur', 'Al Capone', 'Ghandi'],
	'correct' : 'Ghandi',
	'placeHolder' : 'assets/images/q8.png',
	'answerInfo' : 'The elderly woman claims to have had an affair with Ghandi' 
	}, {
	'questionNumber' : 9,
	'question' : 'When Elaine dated a doctor, what part of her body did he grab?',
	'choices' : ['Her tongue', 'Her rear end', 'Her hair', 'Her foot'],
	'correct' : 'Her tongue',
	'placeHolder' : 'assets/images/q9.png',
	'answerInfo' : 'When Elaine dated the doctor, he grabbed her tongue' 
	}, {
	'questionNumber' : 10,
	'question' : 'In the final episode, what was the last topic of conversation when they were in the jail cell together?',
	'choices' : ['How they miss the coffee shop', 'How they wish they helped the man who was robbed', 'How the second button on a shirt can be too high', 'How bad the food in jail is'],
	'correct' : 'How the second button on a shirt can be too high',
	'placeHolder' : 'assets/images/q10.png',
	'answerInfo' : 'They talk about how the second button on a shirt can be too high'
	}
]


//global variables

var right = 0;
var wrong = 0;
var total = right + wrong;
var unanswered = 0;
var percent = 0;
var quesNum = 0;
var audio1 = $("#clickSound")[0];

var timer = {
	time : 11,
	reset: function(){
		timer.time = 11;
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
  		setTimeout(timesUp, 500);
		setTimeout(startQuiz, 4000);
  	}
  }
}

//functions
//draw board
function createBoard(){
	$('.container').empty();
	$('#opening').removeClass().addClass('container game text-center');
	$('.container').append('<div class="row"><div class="timerContainer"><div id="timeLeft">Time Left:</div><div id="timeShow">00:10</div></div>'); 
	$('.container').append('<div class="row"><div class="col-md-10 col-md-offset-1 quizContainer"><div id="question"></div><ul id="answers"></ul></div></div>'); 
	$('.container').append('<div class="row"><div class="questionsLeftContainer"><div id="questionsLeft">Questions:</div><div class="numberLeft" id="numQuestionsLeft">1 of 10</div></div></div></div>');
	startQuiz();
};


function resetGame(){
	right = 0;
	wrong = 0;
	percent = 0;
	quesNum = 0;
	createBoard();
}


function timesUp(){
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="incorrect">OUT OF TIME!</span><br>' + quiz[quesNum].answerInfo + '</div>');
  	unanswered++;
  	quesNum++;
}



function youAreCorrect(){
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="correct">You are correct!!!</span><br>' + quiz[quesNum].answerInfo + '</div>');
	right++;
	quesNum++;
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
	$("#clickSound").get(0).play();
	$('.start').click(function(){
		resetGame();
	});
}


function startQuiz(){

//pause audio
	$("#clickSound").get(0).pause();

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
			setTimeout(startQuiz, 4000);

			} else {

			setTimeout(youAreIncorrect, 500);
			setTimeout(startQuiz, 4000);
			}
	});
}

}
			
$('.start').click(function(){
	createBoard();
});

//audio stat playing
$("#clickSound").get(0).play();

});
