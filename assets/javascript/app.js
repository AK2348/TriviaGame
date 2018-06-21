var triviaQuestions = [{
	question: "What type of animal is a seahorse?",
	answerList: ["Crustacean", "Arachnid", "Fish", "Shell"],
	answer: 2
},{
	question: "Which of the following dogs is the smallest?",
	answerList: ["Dachshund", "Poodle", "Pomeranianl", "Chihuahua"],
	answer: 3
},{
	question: "What color are zebras?",
	answerList: ["White with black stripes", "Black with white stripes", "Both of the above", "None of the above"],
	answer: 1
},{
	question: "What existing bird has the largest wingspan?",
	answerList: ["Stork", "Swan", "Condor", "Albatross"],
	answer: 3
},{
	question: "What is the biggest animal that has ever lived?",
	answerList: ["Blue whale", "African elephant", "Apatosaurus (aka brontosaurus)", "Spinosaurus"],
	answer: 0
},{
	question: "What pets do more families own?",
	answerList: ["Birds", "Cats", "Dogs", "Horses"],
	answer: 1
},{
	question: "What animal lives the longest?",
	answerList: ["Ocean quahog (clam)", "Red sea urchin", "Galapagos tortois", "Rougheye rockfish"],
	answer: 0
},{
	question: "What are female elephants called?",
	answerList: ["Mares", "Sows", "Cows", "Dams"],
	answer: 2
},{
	question: "Which of the following animals sleep standing up?",
	answerList: ["Gorillas", "Flamingos", "Camels", "Ravens"],
	answer: 1
},{
	question: "What is the fastest water animal?",
	answerList: ["Porpoise", "Sailfish", "Flying fish", "Tuna"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Oops, timed out!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.jpg" width = "400px">');
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}