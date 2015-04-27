var i=0;
/*var allQuestions = [{ question: "a,b or c?", options: ["a","b","c"], correct: "a"}, {question: "name?", options: ["marie", "chris", "erika", "sofia"], correct: "sofia"},
{ question: "a,b or c?", options: ["a","b","c"], correct: "a"}];
     test(i);*/
var selectedArray = [];
var questions = {};
var flag = false;
var selected;
$(document).ready(function(){
        
    readJsonFile();     
    $("#quiz").hide(); 
   
    $("#signin").on("click", function(){
    	login(i);
    }
   	
    $("#next").on("click", function(){
        selected = $("input[name=choices]:checked").val();
        
          
        if(selected===undefined){
            alert("please select a choice!");
        }else{
            i++;
            selectedArray[i-1]=selected;
            $("#back").css("display","block");
            
            if(i==questions.length){
                score();
            }
            
          
            test(i, selectedArray);
        }        
    });
    
      $("#back").on("click", function(){
          i--;
          
          $(".choices").find("p").fadeOut("fast");
          $(".choices").hide();  
          $("#question").hide();   
          flag=true;
          test(i);
      });
 
});
function test(i){
    var questionNo = "Q"+(i+1) +"- ";
    $("#question").hide();
    $("#quiz").show();
    
    $("#question").text(questionNo + questions[i].question).fadeIn("slow");
      console.log(questions[0].question + " " + i);
      $(".choices").find("p").fadeOut("fast");
      $(".choices").hide();  
      
    if(flag){
       goBack(i);
    }else{
        goNext(i);
    }
//    alert(i);
}

function goNext(no){
    var output="";
    
    for(var j=0; j<questions[no].options.length; j++){
  	if(questions[no].options[j]==selectedArray[no]){
            output+="<p><input class='choice' type='radio' name='choices' value='" + questions[no].options[j]+ "' checked>" + questions[no].options[j]+"</p>";
        }else{
            output+="<p><input class='choice' type='radio' name='choices' value='" + questions[no].options[j]+ "'>" + questions[no].options[j]+"</p>";
        }      
    }
    //alert(output);
    $(".choices").html(output);
    $(".choices").fadeIn("slow");
    
}
    
function goBack(no){ 
      var output="";

    for(var j=0; j<questions[no].options.length; j++){
        if(questions[no].options[j]==selectedArray[no]){
            output+="<p><input class='choice' type='radio' name='choices' value='" + questions[no].options[j]+ "' checked>" + questions[no].options[j]+"</p>";
        }else{
            output+="<p><input class='choice' type='radio' name='choices' value='" + questions[no].options[j]+ "'>" + questions[no].options[j]+"</p>";
        }   
     }
	    $(".choices").html(output);
        $(".choices").fadeIn("slow");
}
    
function score(){
    var finalScore=0;
    for(var a=0; a<selectedArray.length; a++){
       
        if(selectedArray[a]==questions[a].correct){
              finalScore++;
        }
    }
    printScore(finalScore);
}

function printScore(score){
   $("#quiz").remove();
    $("#score").append("<h2>you've got " + score + " correct answers!</h2>");
}

function readJsonFile() {
    $.ajax({
        type: 'GET',
        url: 'js/questions.json',
        dataType: 'json',
        success: function(data) {
            questions = data;
            console.log("success!");
        },
        // This forces the Ajax callback to respond only when completed
        async: false
    });
    console.log("done reading file!");
}

function login(){
    var user= $("#username").val();
    var pass= $("#password").val();
    
    if(user=="guizar11" && pass=="12345"){
    	test(i);
    }else{
    	alert("invalid username or password");
    }
}
