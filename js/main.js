const domGrid = document.getElementById('grid');
const domScore = document.getElementById('score');
const domBtnPlay = document.getElementById('btnPlay');
const domBtnTryAgain = document.getElementById('btnTryAgain');
const domOverlay = document.getElementById('overlay');
const domOverlayTitle = document.getElementById('overlay-title');


// Pulsante PLAY
domBtnPlay.addEventListener('click', function(){

   startNewGame();

});

// Pulsante TRY AGAIN
domBtnTryAgain.addEventListener('click', function(){
    domOverlay.classList.remove('show');
    startNewGame();
});

function loadGrid(gridSize, colNumber){

    let score = 0;
    domScore.innerHTML = 0;
    domGrid.classList.remove('hidden');
    domGrid.innerHTML = "";
    domGrid.classList.remove('blocked');
    const bombs = arrayBombs(gridSize);


    // Genero le tiles
    for(let i = 1; i < gridSize + 1; i++){

        let box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(${domGrid.offsetWidth - 2}px / ${colNumber}`;
        box.style.height = `calc(${domGrid.offsetWidth - 2}px / ${colNumber}`;
        box.style.lineHeight = `calc(${domGrid.offsetWidth - 2}px / ${colNumber}`;
        box.innerText = i;

    
        domGrid.append(box);

        // Al Click sulla tessera
        box.addEventListener('click', function(){

            if(bombs.includes(i)){
                // this.classList.add('bomb');
                domGrid.classList.add('blocked');
                gameOver(bombs);
            } else {
                
                if(score < (gridSize - 17)){
                    
                    if(!this.classList.contains('active')){
                        this.classList.add('active');
                        score++;
                    }
                
                    domScore.innerHTML = score;
                }else{
                    this.classList.add('active');
                    winner();
                }

            }

            

        });

    }

}

// Posizione delle bombe
function arrayBombs(range){

    let result = [];

    for(let i = 0; i < 16; i++){

        let generatedNumber;
        
        do{
            generatedNumber = Math.floor(Math.random() * range) + 1;

        }while(result.includes(generatedNumber))

        result.push(generatedNumber);

    }

    return result;
}

function startNewGame(){
    const gameMode = document.getElementById('selMode').value;

    switch (gameMode){
        case 'modeEasy':
            loadGrid(100, 10);
            break;
        case 'modeMid':
            loadGrid(81, 9);
            break;
        case 'modeHard':
            loadGrid(49, 7);
            break;
        default:
            console.log("ERRORE. Valore di input non valido");
    }
}

// Overlay Vittoria/sconfitta
function gameOver(allBombs){

    const domAllBoxes = document.getElementsByClassName('box');

    for (let i = 0; i < domAllBoxes.length; i++){

        const currentItem = parseInt(domAllBoxes[i].innerText);

        if(allBombs.includes(currentItem)){
            domAllBoxes[i].classList.add('bomb');
        }
    }

    domOverlayTitle.innerText = "YOU LOSE!";
    domOverlayTitle.classList.remove('win');
    domOverlayTitle.classList.add('lose');
    domOverlay.classList.add('show');
}

function winner(){
    domOverlayTitle.innerText = "YOU WIN!";
    domOverlayTitle.classList.remove('lose');
    domOverlayTitle.classList.add('win');
    domOverlay.classList.add('show');
}