var i=0;
var allQuestions = [{ question: "a,b or c?", options: ["a","b","c"], correct: "a"}, {question: "name?", options: ["marie", "chris", "erika", "sofia"], correct: "sofia"},
{ question: "a,b or c?", options: ["a","b","c"], correct: "a"}];
     test(i);
var selectedArray = [];
var flag = false;
$(document).ready(function(){
               
   
    $("#next").on("click", function(){
        selected = $("input[name=choices]:checked").val();
        
          
        if(selected===undefined){
            alert("please select a choice!");
        }else{
            i++;
            selectedArray[i-1]=selected;
            $("#back").css("display","block");
            
            if(i==allQuestions.length){
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
    $("#question").text(questionNo + allQuestions[i].question).fadeIn("slow");
    
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
	$.getJSON( "js/questions.json", function( data ) {
  
       alert('test');
    

				/*for(var j=0; j<allQuestions[no].options.length; j++){
					output+="<p><input class='choice' type='radio' name='choices' value='" + allQuestions[i].options[j]+ "'>" + allQuestions[i].options[j]+"</p>";
				   
				}*/
	});
    //alert(output);
    $(".choices").html(output);
    $(".choices").fadeIn("slow");
}
    
function goBack(no){ 
      var output="";

    for(var j=0; j<allQuestions[no].options.length; j++){
        if(allQuestions[no].options[j]==selectedArray[no]){
            output+="<p><input class='choice' type='radio' name='choices' value='" + allQuestions[no].options[j]+ "' checked>" + allQuestions[no].options[j]+"</p>";
        }else{
            output+="<p><input class='choice' type='radio' name='choices' value='" + allQuestions[no].options[j]+ "'>" + allQuestions[no].options[j]+"</p>";
        }   
     }
	    $(".choices").html(output);
        $(".choices").fadeIn("slow");
}
    
function score(){
    var finalScore=0;
    for(var a=0; a<selectedArray.length; a++){
       
        if(selectedArray[a]==allQuestions[a].correct){
              finalScore++;
        }
    }
    printScore(finalScore);
}

function printScore(score){
   $("#quiz").remove();
    $("#score").append("<h2>you've got " + score + " correct answers!</h2>");
}