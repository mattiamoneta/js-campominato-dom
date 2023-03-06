const domGrid = document.getElementById('grid');
const domBtnPlay = document.getElementById('btnPlay');



domBtnPlay.addEventListener('click', function(){

    const gameMode = document.getElementById('selMode').value;
    console.log(gameMode);

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

});

function loadGrid(gridSize, colNumber){

    domGrid.classList.remove('hidden');
    domGrid.innerHTML = "";

    for(let i = 1; i < gridSize + 1; i++){

        let box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(${domGrid.offsetWidth - 2}px / ${colNumber}`;
        box.style.height = `calc(${domGrid.offsetWidth - 2}px / ${colNumber}`;
        box.style.lineHeight = `calc(${domGrid.offsetWidth - 2}px / ${colNumber}`;
        box.innerText = i;
        domGrid.append(box);

        box.addEventListener('click', function(){

            this.classList.toggle('active');
            console.log(`Cella cliccata: ${i}`);

        });

    }




}