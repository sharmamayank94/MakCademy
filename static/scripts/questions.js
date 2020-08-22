var answers = document.querySelectorAll('.answer');

var answer = [];

for(var i =0; i<answers.length; i++){
    answer.push(answers[i].innerHTML.trim());
    answers[i].remove();
}

//console.log(answer);





function checkanswers(){
	var points = 0;
	for(var j = 1; j<=answer.length; j++)
	{
		var names = document.getElementsByName('option'+j);
 	
 	
	    for(var i =0; i<4; i++){
	    	
	    	if(names[i].checked==true){

	        	var q = names[i].value.replace(/\s/g, '') + j;
           		console.log(q);
           		var element = document.getElementById(q);
	        	element.style.backgroundColor = "Tomato";


	        	if(names[i].value==answer[j-1]) points++;

	        }

	    	if(names[i].value==answer[j-1])
           	{
           		var q = answer[j-1].replace(/\s/g, '') + j;
           		
           		var element = document.getElementById(q);
       			element.style.backgroundColor = "rgb(179, 255, 102)"; 
       					

           	} 


	       
	    }
	}
	var score = document.querySelector("#score");
	if(points*2>answer.length)
	{
		score.textContent = "Congratulations you scored: "+points+"/"+answer.length;
	}
	else
	{
		score.textContent = "Try Hard you scored: "+points+"/"+answer.length;	
	}
	console.log(points);
    
}
