document.addEventListener("DOMContentLoaded", function(){
    
    var scene1 = document.querySelector(".choose");
    var scene2 = document.querySelector(".result");

    function playAgain(){

    }

    function compare(player1, player2){

        if(player1 == player2) 
            return 0;
        else if(player1 == "rock" && player2 == "paper")
            return 1;
        else if(player1 == "paper" && player2 == "rock")
            return 1;
        else if(player1 == "scissors" && player2 == "paper")
            return 1;
        else
            return 2;

    }

    function getAssetByChoosen(choosen){

        switch(choosen){
            case "rock":
                return "assets/rock.svg";
            case "paper":
                return "assets/paper.svg";
            case "scissors":
                return "assets/scissors.svg";
            default:
                throw "Seçilen: " + choosen;
        }

    }

    function getChoosenByNumber(choosen){
        return (
            choosen == 0 ? "rock" :
            choosen == 1 ? "paper" : 
            "scissors"
        );
    }

    function choose(choosen){

        let aiChoosen = Math.floor(Math.random() * 3);
        aiChoosen = getChoosenByNumber(aiChoosen);

        document.body.style.background = "white";
        scene1.style.opacity = '0';
        scene2.style.display = 'block';
        
        let handElements = document.querySelectorAll(".hand");
        let handImgElements = document.querySelectorAll(".hand > img");
        let resultText = document.querySelector("#result-text");

        function handAnimationEnd() {

            handImgElements[0].removeEventListener("animationend", handAnimationEnd);

            document.querySelector(".player.left > .hand > img").src = getAssetByChoosen(choosen); 
            document.querySelector(".player.right > .hand > img").src = getAssetByChoosen(aiChoosen);
            
            let results = compare(choosen, aiChoosen);

            resultText.innerHTML = 
               results == 0 ? "Kaybettin!" :
               results == 1 ? "Kazandın!" : "Galibiyet!"
            
            resultText.style.color =
                results == 0 ? resultText.style.color :
                results == 1 ? "green" : "red"

        }

        function scene2In(){
            handElements.forEach( (value) => value.querySelector("img").style.animation = 'handanim 0.5s 3' );
            handImgElements[0].addEventListener("animationend", handAnimationEnd);
            scene2.removeEventListener('transitionend', scene2In);
        }

        function scene1Out() {
            scene2.style.opacity = '1';
            scene1.style.display = 'none';

            document.removeEventListener('transitionend', scene1Out);
            scene2.addEventListener('transitionend', scene2In);
        }

        document.addEventListener('transitionend', scene1Out);
    
    }

    var buttons = document.querySelectorAll(".buttons > button");
    buttons.forEach((button) => {
        button.onclick = () => choose(button.attributes["pass"].value);
    });

});