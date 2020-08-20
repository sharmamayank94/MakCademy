var answers = document.querySelectorAll('.answer');

var answer = [];

for(var i =0; i<answers.length; i++){
    answer.push(answers[i].innerHTML.trim());
    answers[i].remove();
}

console.log(answer);





function checkanswers(){
    var names = document.getElementsByName('option1');

    for(var i =0; i<4; i++){
        if(names[i].checked==true){
            console.log(names[i].value);
        }
    }
}
