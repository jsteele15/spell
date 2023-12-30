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

//check the currect level
let curLevel = 0;

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

let mon2 = new Image();
mon2.src = "images/mon-export2.png";

let attImage = new Image();
attImage.src = "images/fire.png";

let buttImage = new Image();
buttImage.src = "images/fire.png";

//function for the ui
//need to check if clicked in
function Butts(ind, imageCut, pos, size){
    this.ind = ind;
    this.imageCut = imageCut;
    this.pos = pos;
    this.size = size;

    this.draw = function(){
        if (ori === "landscape"){
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(buttImage, imageCut[0], imageCut[1], 100, 100,pos[0], pos[1], 100, 100);
        } else {
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(buttImage, imageCut[0], imageCut[1], 100, 100,pos[0], pos[1], size[0], size[1]);
        }
    }
}
const start = new Butts(1, [0, 0], [40, 40], [400, 400])
const lv2 = new Butts(2, [0, 0], [300, 600], [400, 400])

let buttList = [start, lv2];

document.addEventListener('click', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    console.log('x: ' + x + ', y: ' + y);
    for(let i = 0; i < buttList.length; i++){
        if (x >= buttList[i].pos[0] && x <= buttList[i].pos[0]+ buttList[i].size[0]){
            if (y >= buttList[i].pos[1] && y <= buttList[i].pos[1]+ buttList[i].size[1]){
                console.log(buttList[i].ind)
        };
        };
    };
  });
  

//i want to monsters to cycle in and out after getting deffeated
//i need some random chose of monster
//maybe it ends after killing ten monsters
//maybe the monsters get harder over time

function Monster(image, name, attack, imageCut, health, score, frame, maxFrames){
    this.image = image;
    this.name = name;
    this.attack = attack;
    this.imageCut = imageCut;
    this.health = health;
    this.score = score;
    this.frames = frame;
    this.initialFrame = frame;
    this.maxFrames = maxFrames;
    
    this.draw = function(){
        if (ori === "landscape"){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(image, imageCut[0], imageCut[1]*frames, 460, 500,scrW/2-230, -40, 460, 500);
        } else {
            //every time we turn the rotation it speeds up likely due to the draw function
            //being called multiple times without clearing the interval
            let inter = setInterval(() => {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(image, imageCut[0], imageCut[1]*frames, 460, 500,scrW/2-460, -40, 920, 1000);
            
            //counter();
            //if(frames >= 100){
                //clearInterval(counter);
                //console.log("cleared")
            //}
            if(this.health <= 0){
                console.log("interval cleared");
                clearInterval(inter);
            }
        
            if(frames < maxFrames){
                ++frames;
            } else {
                frames = this.initialFrame;
            }
            }, 200);
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
let wormyBoy = new Monster(mon2, 'wormy boy', 10, [460, 500], 10, 10000, 14, 19);
let wormyBoy1 = new Monster(monImage, 'wormy boy1', 10, [460, 0], 10, 10000,1, 1);
let wormyBoy2 = new Monster(monImage, 'wormy boy2', 10, [460, 0], 10, 10000, 1, 1);
let wormyBoy3 = new Monster(monImage, 'wormy boy3', 10, [460, 0], 10, 10000, 1, 1);
let badDrawnFella = new Monster(monImage, 'sad man', 10, [0, 0], 10, 20000,1 , 1);

let monList = [wormyBoy, badDrawnFella, wormyBoy1, wormyBoy2, wormyBoy3];
//the list of lists will need implementing at some point
let listLevs = [buttList, monList];

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
    sUI.innerHTML = scr;
    
    //this check if the player has gone through the list of enemies
    if(curInd >= enList.length){
        console.log("you killed them all");
        for(let i = 0; i < buttList.length; i++){
            buttList[i].draw();
        };
    }

    else if(enList[curInd].health >= 1){
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
            buttList.draw();
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

window.onload = function(){
    start.draw();
    lv2.draw();
    console.log("jndiub");
};

starBut.addEventListener("click", function(){
    gameScene = true;
    battle(monList);
    starBut.style.visibility = 'hidden';
});
