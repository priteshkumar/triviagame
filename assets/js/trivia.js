var triviaOb = {
	"gameStarted":false,
  "answers":{
              "Four":{"correctanswer":"Four","currentanswer":null},
              "Unix":{"correctanswer":"Unix","currentanswer":null},
              "Python":{"correctanswer":"Python","currentanswer":null},
              "BrendanEich":{"correctanswer":"BrendanEich","currentanswer":null},
              "vari":{"correctanswer":"vari","currentanswer":null},
              "Styling":{"correctanswer":"Styling","currentanswer":null},
              "Pagerank":{"correctanswer":"Pagerank","currentanswer":null},
              "tsection":{"correctanswer":"tsection","currentanswer":null},
              "color":{"correctanswer":"color","currentanswer":null},
              "GuidovanRossum":{"correctanswer":"GuidovanRossum","currentanswer":null},
              "querybackend":{"correctanswer":"querybackend","currentanswer":null},
              "webackend":{"correctanswer":"webackend","currentanswer":null},
              "htp":{"correctanswer":"htp","currentanswer":null},
              "spring":{"correctanswer":"spring","currentanswer":null},
            },
	"correctAnswers":0,
	"incorrectAnswers":0,
  "unanswered":14,
	"timeExpired":false,
	"tCounter":40,
	"intervalId":null,
	setupTimer:function(){
		this.intervalId = setInterval(this.updateTime,1000);
	},
  resetGame: function(){
    this.gameStarted = false;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.unanswered = 14;
    this.tCounter = 40;
    this.intervalId = null;
    for (var key in this.answers){
      this.answers[key].currentanswer = null;
    }
  },
	updateTime:function(){
		    //console.log(triviaOb.tCounter);
		  console.log("increment timer by 1 second");
			triviaOb.tCounter= triviaOb.tCounter - 1;
			if(triviaOb.tCounter > 0){
					$("#timereport").html("Time Remaining:  " + triviaOb.tCounter + " seconds");
			}
			else{
				clearInterval(triviaOb.intervalId);
				triviaOb.displayResults();
			}
	},
	displayResults:function(){
		console.log("gameresults");
    $("#timestats").addClass("hidden");
    $(".query").each(function(){
       $(this).addClass("hidden");
    });
    $("#donebtncont").addClass("hidden");
    var $resdiv = $("<div>");
    $resdiv.addClass("row");
    for (var key in this.answers){
      if(this.answers[key].currentanswer === this.answers[key].correctanswer){
        this.correctAnswers = this.correctAnswers + 1;
        this.unanswered = this.unanswered - 1;
      }
      else if(this.answers[key].currentanswer != null && this.answers[key].currentanswer !== this.answers[key].correctanswer ){
         this.incorrectAnswers = this.incorrectAnswers + 1;
         this.unanswered = this.unanswered -1;
      }
    }
    $resdiv.html("<div " + "class=col-xs-12 text-center" + ">" + "<h3 " + "class=text-center>"  +
                   "Correct Answers: " +
                   triviaOb.correctAnswers + "</h3>" + "<h3 " + "class=text-center>" + "Wrong Answers: " + 
                   triviaOb.incorrectAnswers + "</h3>" + 
                   "<h3 " + "class=text-center>" + "Total Unanswered: " + triviaOb.unanswered + "</h3>" + "</div>");

    $("#maincontainer").append($resdiv);
    clearInterval(triviaOb.intervalId);
    this.resetGame();


		//var $querydiv = $(".query");
    
	}
};

 function doneBtnClicked(){
     $(this).parent().parent().addClass("hidden");
     triviaOb.displayResults();
 }

 $("#startbtn").on("click",function(){
 		$(this).addClass("hidden");
 		$("#timestats").removeClass("hidden");
 		triviaOb.setupTimer();
 		var $querydivs = $(".query");
 		$querydivs.each(function(){
          $(this).removeClass("hidden");
          $(this).css("margin-bottom","30px");
 		});
 		$(this).addClass("hidden");
    $("#donebtncont").removeClass("hidden");
    $("#donebtn").bind("click",doneBtnClicked);

 		
 });



 $("form input:radio").on("click",function(){
  console.log("radioclicked");
  var $fdatakey = $(this).parent().parent().attr("id");
  triviaOb.answers[$fdatakey].currentanswer = $(this).val();  
  console.log(triviaOb.answers[$fdatakey].currentanswer);
  console.log(triviaOb.answers[$fdatakey].correctanswer);

 });
