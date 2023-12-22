//this is for the main canvas the monsters are blitted onto
const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

//this is for the secondary canvas
const fireCanv = document.getElementById("atCanvas");
let ctx2 = fireCanv.getContext('2d');

//current mode
let gameScene;

//the movement for the attacks
let movePosY = 20;
let movePosX = 20;

//screen widths
let scrW = window.innerWidth;
let scrH = window.innerHeight;

//ui still for score and things
const sUI = document.getElementById('s');
const lvUI = document.getElementById('lv');
const mS = document.getElementById('monS');

//this is to check the orientation of the screen
let ori;

window.addEventListener("resize", function(){
    if(window.matchMedia('(orientation: portrait)').matches === true){
        ori = "portrait";
        scrW = window.innerWidth;
        scrH = window.innerHeight;
        fireCanv.width = scrW;
    } else {
        ori = "landscape";
        scrW = window.innerWidth;
        scrH = window.innerHeight;

    }
    if(gameScene === true){
        monList[curInd].draw();
    }
})

window.addEventListener('load', function(){
    if(scrH > scrW){
        ori = "portrait";
        fireCanv.width = scrW;
        fireCanv.height = scrH - (scrH/3);
    } else {
        ori = "landscape";
    }
})

let monImage = new Image();
monImage.src = "images/mon.png";

let attImage = new Image();
attImage.src = "images/fire.png";

//i want to monsters to cycle in and out after getting deffeated
//i need some random chose of monster
//maybe it ends after killing ten monsters
//maybe the monsters get harder over time

function Monster(name, attack, imageCut, health, score){
    this.name = name;
    this.attack = attack;
    this.imageCut = imageCut;
    this.health = health;
    this.score = score;
    
    this.draw = function(){
        if (ori === "landscape"){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(monImage, imageCut[0], imageCut[1], 460, 500,scrW/2-230, -40, 460, 500);
        } else {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(monImage, imageCut[0], imageCut[1], 460, 500,scrW/2-460, -40, 920, 1000);
        }
    }
    this.att = function(){
        //if (char.dodge === false){    
            //char.health -= att;
            //healthBar.style.width = char.health+"px";

        ctx2.clearRect(0,0, fireCanv.width, fireCanv.height);
        mS.innerHTML = score;
        save = score;
        if(score >= 10){
            score -= 10;
        }
        
        if(ori === "landscape"){
            ctx2.drawImage(attImage, 0, 0, 100, 100, movePosX, movePosY, 100, 100);
        } else {
            ctx2.drawImage(attImage, 0, 0, 100, 100, movePosX, movePosY, 200, 200);
        }
        
        if (movePosY > scrH){
            movePosY = 0;
            movePosX = Math.random()*fireCanv.width-100;
        } else {
            movePosY += 20;
        }; 
    }
        //else if (char.dodge === true){
            //console.log("dodged") 
};
let wormyBoy = new Monster('wormy boy', 10, [460, 0], 10, 10000);
let wormyBoy1 = new Monster('wormy boy1', 10, [460, 0], 10, 10000);
let wormyBoy2 = new Monster('wormy boy2', 10, [460, 0], 10, 10000);
let wormyBoy3 = new Monster('wormy boy3', 10, [460, 0], 10, 10000);
let badDrawnFella = new Monster('sad man', 10, [0, 0], 10, 20000);

let monList = [wormyBoy, badDrawnFella, wormyBoy1, wormyBoy2, wormyBoy3];
let curInd = 0;

/*
current problem with the set interval timer
where it wont stop and reset when changing to another enemy
*/
//a battle function i guess
let timer;
let scr = 0;
let save = 0;
let level = 0

let battle = function(enList){
    //need to fill in this i guess
    //
    sUI.innerHTML = scr;
    
    if(enList[curInd].health >= 1){
        enList[curInd].draw();
        //if the monster is alive, and the battle is on, this will cause them to attack every interval
        console.log('set interval');
        timer = setInterval(monList[curInd].att, 10);
        
    } else {
        
        clearInterval(timer);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        
        
        if(curInd < enList.length){
            curInd ++;
            scr += save;

            //enList[curInd].draw();
            console.log(scr);
            battle(enList);
        } else {
            console.log("you killed them all");
        };
    }
};

//a function to test out monsters dying
let test = function(enList){
    enList[curInd].health = -100;
    console.log(enList[curInd].name + enList[curInd].health);
};

document.addEventListener('keydown', function(event){
    if(event.key==="d"){
        test(monList);

        battle(monList);
    };
});

//context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
//the sx and sy are the most important when getting a sub section of a spritesheet
/*
window.onload= function(){
    battle(monList);
    //monList[1].draw();
    //ctx.drawImage(monImage, 460 , 0, 460, 500, 0, 0, 460, 500);
};
*/
//this is a function that starts the game if the button is clicked
const starBut = document.getElementById("menuStart");

starBut.addEventListener("click", function(){
    gameScene = true;
    battle(monList);
    starBut.style.visibility = 'hidden';
});
