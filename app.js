// Elements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// modèle de coeurs
const coeurVide = '<ion-icon name = "heart-outline"></ion-icon>';
const coeurPlein =  '<ion-icon name = "heart"></ion-icon>';

// Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)';
const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgBrulant ='linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(180deg, #2af598 0%, #009efd 100%)';

const bgLoose = 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)';

//play
const play = () => {

    //nombre aléatoire
    const randomNumber = Math.floor(Math.random()*101) ;
    const totalVies = 6;
    let vies = totalVies;
    console.log(randomNumber);

    //actualisation a chaque essayer
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value);

        if(valeurInput < 0 || valeurInput > 100) return;

        if (valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent =`BRAVO !!! le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = 'block';
            essayerBtn.setAttribute('disabled', '');
        }

        if(valeurInput !== randomNumber){
            if( randomNumber < valeurInput +3 && randomNumber > valeurInput -3){
                body.style.backgroundImage = bgBrulant;
                message.textContent= "c'est chaud !!!🔥🔥🔥";
            }else if( randomNumber < valeurInput +6 && randomNumber> valeurInput -6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "c'est chaud !🔥";
            }else if( randomNumber < valeurInput +11 && randomNumber> valeurInput -11){
                body.style.backgroundImage = bgTiede;
                message.textContent= "c'est Tiède 😐";
            } else {
            body.style.backgroundImage = bgFroid;
            message.textContent = "c'est Froid 🥶";
            }
            vies--;
            verifyLoose();


        }

        actualiseCoeurs(vies);
    })

    const verifyLoose = () =>{
        if (vies === 0){
            body.style.backgroundImage=bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute('disabled', '');
            message.textContent = `Vous avez perdu. la réponse était ${randomNumber}`;
            rejouerBtn.style.display= 'block' ;

        }
    }
    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for (let i = 0 ; i < vies ; i++ ){
            tableauDeVies.push(coeurPlein);
        }
        for (let i = 0 ; i < totalVies - vies ; i++ ){
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur ;
        })
    }
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
    })
}

play()

