const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store __.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within ___ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];
  
  var time = document.getElementById("time");
  var timeCount = 50;
  var score = 0;
  var name = '';
  var question = document.getElementById("question");
  var questionIndex = 0;
  var highScores = [];
  
  function startQuiz(){
      timeCount=50;
      score=0;
      name='';
      document.getElementById("quizContent").style.display = "block";
      document.getElementById("startContent").style.display = "none";
      time.innerHTML = "Time: "+timeCount;
      question.innerHTML = questions[questionIndex].questionText;
      
      startTiming();
      for(let i=0;i<questions.length;i++){
          document.getElementById(i+1).innerHTML = questions[questionIndex].options[i];
      }
  }
  
  function goBack() {
      timeCount = 50;
      name= '';
      score=0;
      
      document.getElementById("finalScore").style.display = "none";
      document.getElementById("quizContent").style.display = "none";
      document.getElementById("startContent").style.display = "block";
      document.getElementById("highScores").style.display = "none";
      time.innerHTML = "Time: "+timeCount;
      question.innerHTML = questions[questionIndex].questionText;
      
      startTiming();
      for(let i=0;i<questions.length;i++){
          document.getElementById(i+1).innerHTML = questions[questionIndex].options[i];
      }
  }
  
  function startTiming() {
      var x = setInterval(function(){
          timeCount--;
          time.innerHTML = "Time: "+timeCount;
          if(timeCount<=0){
              clearInterval(x);
          }
      },1000);
  }
  
  function checkAnswer(id){
      let userAnswer = document.getElementById(id).innerHTML;
      let answer = questions[questionIndex].answer;
      if(userAnswer == answer){
          document.getElementById("result").innerHTML = "Correct!!";
          document.getElementById("result").style.color="green";
          setTimeout(() => correctAnswer(),1000) ;
          
      }   
      else{
          timeCount-=10;
          startTiming();
          if(timeCount-10<=0) timeCount = 0;
          document.getElementById("result").innerHTML = "Incorrect!!";
          document.getElementById("result").style.color="red";
          setTimeout(() => correctAnswer(),1000) ;
          score-=10;
      }
  }
  function correctAnswer(){
      document.getElementById("result").innerHTML = "";
      score+=10;
      timeCount+=1;
      questionIndex += 1;
      if(questionIndex >= questions.length){
          document.getElementById("finalScore").style.display = "block";
          document.getElementById("finalResult").innerHTML = "Your final score is " + score;
          document.getElementById("quizContent").style.display = "none";
          document.getElementById("startContent").style.display = "none";
      }
      else{
          question.innerHTML = questions[questionIndex].questionText;
          for(let i=0;i<questions.length;i++){
              document.getElementById(i+1).innerHTML = questions[questionIndex].options[i];
          }
      }
  }
  
  function submit() {
      name = document.getElementById("initial").value;
      localStorage.setItem(name,score);
      viewscore();
  }
  
  function viewscore(){
      document.getElementById("finalScore").style.display = "none";
      document.getElementById("quizContent").style.display = "none";
      document.getElementById("startContent").style.display = "none";
      document.getElementById("highScores").style.display = "block";
      if(name=='') name='UnKnown'
      document.getElementById("displayScore").innerHTML = name + ": " + score;
      
      timeCount = 0;
      time.innerHTML = "Time: ";
  }
