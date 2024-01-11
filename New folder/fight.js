//what about making it like bop it where its endless and you
//have to remember what came before
//testing
//this is for the main canvas the monsters are blitted onto
const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

//this is for the secondary canvas
const fireCanv = document.getElementById("atCanvas");
let ctx2 = fireCanv.getContext('2d');

//this is for the third canvas
//const backCan = document.getElementById("backCanvas");
//let ctx3 = backCan.getContext('2d');

//current mode
let gameScene;

//the movement for the attacks
let movePosY = 20;
let movePosX = 20;
//0 to represent x, 1 to represent y
let moveVars = [[movePosX, movePosY]]

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

//the curent ind in any given level
let curInd = 0;

//relmove
let relMove = [];

//spritesheets
let monImage = new Image();
monImage.src = "images/mon-export2.png";

//let mon2 = new Image();
//mon2.src = "images/mon-export2.png";

let attImage = new Image();
attImage.src = "images/fire.png";

let buttImage = new Image();
buttImage.src = "images/fire.png";

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

///////////////////////////////////////////////////////
/*to add touch event listeners to the canvas         */
///////////////////////////////////////////////////////
let drawPath = new Path2D();
ctx.lineWidth = 50;
ctx.strokeStyle = "#000000";

fireCanv.addEventListener("touchstart", (e)=>{
    const touch = e.touches[0];
    relMove.push([[touch.clientX, touch.clientY],[]])
});

fireCanv.addEventListener("touchmove", (e)=>{
    const touch = e.touches[0];
    relMove[0][1] = [touch.clientX, touch.clientY];
    console.log("we touched");
    
});

fireCanv.addEventListener("touchmove", (e) =>{
    const touch = e.touches[0];
    drawPath.lineTo(touch.clientX, touch.clientY);
    
    //spellLoc[curInd][1] = [touch.clientX, touch.clientY];
    //console.log(spellLoc[curInd][1]);
    ctx.stroke(drawPath);
});

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
const start = new Butts(1, [100, 0], [40, 40], [400, 400])
const lv2 = new Butts(2, [200, 0], [300, 600], [400, 400])

let buttList = [start, lv2];

document.addEventListener('click', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    //console.log('x: ' + x + ', y: ' + y);
    if(curLevel === 0){
        for(let i = 0; i < buttList.length; i++){
            if (x >= buttList[i].pos[0] && x <= buttList[i].pos[0]+ buttList[i].size[0]){
                if (y >= buttList[i].pos[1] && y <= buttList[i].pos[1]+ buttList[i].size[1]){
                    gameScene = true;
                    curLevel = buttList[i].ind;
                    lvUI.innerHTML = "lv: " + buttList[i].ind;
                    battle(listLevs[buttList[i].ind]);
        };
    }}};
});

fireCanv.addEventListener("mousemove", function(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  for(let i = 0; i < moveVars.length; i++){
    if(x >= moveVars[i][0]-100 && x <= moveVars[i][0] + 200){
        if(y >= moveVars[i][1]-100 && y <= moveVars[i][1]+200){
            console.log("splat");
            ctx2.drawImage(monImage, 120, 60, 60, 60, moveVars[i][0], moveVars[i][1], 200, 200);
            moveVars[i][1] = 2000;
            
}}}});


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
            ctx.clearRect(0,0, 1000,1000);
            ctx.drawImage(image, imageCut[0], imageCut[1]*frames, 460, 500,scrW/2-230, -40, 460, 500);
        } else {
            //every time we turn the rotation it speeds up likely due to the draw function
            //being called multiple times without clearing the interval


            
            let inter = setInterval(() => {

            ctx.clearRect(0,0, 1000,1000);
            
            ctx.drawImage(image, imageCut[0], imageCut[1]*frames, 460, 500,scrW/2-460, -40, 920, 1000);
            //
            //this is for the main character, its a proof of concept, will need moving
            //
            //ctx.drawImage(image, 180, 120, 60, 60,160, 1800, 220, 220);
            if(frames < maxFrames){
                ++frames;
            } else {
                frames = this.initialFrame;
            }
            
            if(this.health <= 0){
                clearInterval(inter);
                ctx.clearRect(0,0, 1000,1000);
                ctx2.clearRect(0,0, fireCanv.width, fireCanv.height);
                movePosY = 20;
                movePosX = Math.random()*fireCanv.width-100;
                battle(listLevs[curLevel]);
                
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
        switch(attack[0]){
            case "fire":
                if(ori === "landscape"){
                    ctx2.drawImage(attImage, 0, 0, 98, 98, moveVars[0][0], moveVars[0][1], 100, 100);
                } else {
                    ctx2.drawImage(image, 0, 50, 98, 98, moveVars[0][0], moveVars[0][1], 200, 200);
                }

                if (moveVars[0][1] > scrH){
                    moveVars[0][1] = 0;
                    moveVars[0][0] = Math.random()*fireCanv.width-100;
                } else {
                    moveVars[0][1] += 20;
                }; 
                break;

            case "spawn":
                if(ori === "landscape"){
                    ctx2.drawImage(attImage, 0, 0, 98, 98, moveVars[0][0], moveVars[0][1], 100, 100);
                } else {
                    ctx2.drawImage(image, attack[1], 0, 40, 40, moveVars[0][0], moveVars[0][1], 200, 200);
                }
                
                if (moveVars[0][1] > scrH){
                    moveVars[0][1] = 0;
                    moveVars[0][0] = Math.random()*fireCanv.width-100;
                    imageCut[1]+= 500;
                    loseHealth(listLevs[curLevel], 20);
                } else {
                    moveVars[0][1] += 10;
                }; 
                if(attack[1]< 660){
                    attack[1] += 60;
                } else{
                    attack[1] = 0;
                }
                break;
        };
    }
        //else if (char.dodge === true){
            //console.log("dodged") 
};
//attack includes the switch statment for what attack they do, the second is the number that controls the spritesheet, the third the speed of the attack
let wormyBoy = new Monster(monImage, 'wormy boy', ["fire", 1, 20], [460, 500], 10, 10000, 1, 6);
let wormyBoy1 = new Monster(monImage, 'wormy boy1', ["fire", 1, 20], [460, 500], 10, 10000, 1, 6);
let wormyBoy2 = new Monster(monImage, 'wormy boy2', ["fire", 1, 20], [460, 500], 10, 10000, 1, 6);
let wormyBoy3 = new Monster(monImage, 'wormy boy3', ["fire", 1, 20], [460, 500], 10, 10000, 1, 6);
let badDrawnFella = new Monster(monImage, 'sad man', ["fire", 1, 20], [0, 500], 10, 20000,1 , 2);
//test out some more enemies
let badDrawnFella1 = new Monster(monImage, 'sad man', ["fire", 1, 20], [0, 500], 10, 20000,1 , 2);
let badDrawnFella2 = new Monster(monImage, 'sad man', ["fire", 1, 20], [0, 500], 10, 20000,1 , 2);
let badDrawnFella3 = new Monster(monImage, 'sad man', ["fire", 1, 20], [0, 500], 10, 20000,1 , 2);
let legLad = new Monster(monImage, 'leg guy', ["spawn", 1, 20], [960, 500], 100, 10000, 1, 1);
let legLad2 = new Monster(monImage, 'leg guy', ["spawn", 1, 20], [960, 500], 100, 10000, 1, 1);
let legLad3 = new Monster(monImage, 'leg guy', ["spawn", 1, 20], [960, 500], 100, 10000, 1, 1);

let monList = [wormyBoy, badDrawnFella, wormyBoy1, wormyBoy2, wormyBoy3];
let monListlv2 = [legLad, legLad2, legLad3,badDrawnFella1, badDrawnFella2, badDrawnFella3];
//the list of lists will need implementing at some point
let listLevs = [buttList, monList, monListlv2];

/*
stuff for the character
*/

function Char(img, imageCut, health, pos){
    this.img = img;
    this.imageCut = imageCut;
    this.health = health;
    this.pos = pos;
    
    this.draw = function(){
        ctx.clearRect(pos[0], pos[1], 250, 250);
        ctx.drawImage(img, imageCut[0], imageCut[1], 60, 60, pos[0], pos[1], 220, 220);
    }
};

let guy = new Char(monImage, [180,120], 100, [160, 1800]);

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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        curLevel = 0;
        curInd = 0;
        save = 0;
        mS.innerHTML = save;
        for(let i = 0; i < buttList.length; i++){
            buttList[i].draw();
        }
    }

    else if(enList[curInd].health >= 1){
        enList[curInd].draw();
        guy.draw();
        //if the monster is alive, and the battle is on, this will cause them to attack every interval
        timer = setInterval(enList[curInd].att, enList[curInd].attack[2]);
        
    } else {
        
        clearInterval(timer);
        ctx.clearRect(0,0, 1000,1000);
        
        
        if(curInd < enList.length){
            curInd ++;
            scr += save;

            //enList[curInd].draw();
            battle(enList);
        };
    }
};

//a function to test out monsters dying
let loseHealth = function(enList, reduce){
    if(curLevel !== 0){
    enList[curInd].health -= reduce;
    };
};

document.addEventListener('keydown', function(event){
    if(event.key==="f"){
        moveVars[0][1] = 2000;
        loseHealth(listLevs[curLevel], 100);
        //battle(listLevs[curLevel]);
    } else if(event.key==="d"){
        guy.pos[0]+= 20;
        guy.draw();
        //move the character right
    } else if(event.key==="a"){
        guy.pos[0]-= 20;
        guy.draw();
        //move the character left
    }
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

window.onload = function(){
    start.draw();
    lv2.draw();
};
