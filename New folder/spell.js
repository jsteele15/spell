const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", {alpha:true});
const moveCan = document.getElementById("actionBox");
const ctx2 = moveCan.getContext("2d", {alpha:true});
const healthBar = document.getElementById("helB");
//const dec = document.getElementById("what");
//const but = document.getElementById("check");
const mana = document.getElementById("manB");


let curM = 400;
mana.style.width = curM+"px";


const img = new Image();
img.src = "images/test.png";
img.onload = function () {
    // Once the image is loaded, draw it on the canvas
    ctx.drawImage(img, 0, 0); // (x, y) coordinates where the image should be placed
};
//ctx.drawImage(img, 50, 50, 200, 150); // (x, y, width, height)


let drawPath = new Path2D();
ctx.lineWidth = 5;
ctx.strokeStyle = "#000000";

let spellLoc = [];
let curInd = -1;


canvas.addEventListener("touchstart", (e) =>{
    const touch = e.touches[0];
    drawPath.moveTo(touch.clientX, touch.clientY);
    spellLoc.push([[touch.clientX, touch.clientY], []]);
    curInd ++;
    //console.log(spellLoc[curInd]);
});

canvas.addEventListener("touchmove", (e) =>{
    const touch = e.touches[0];
    drawPath.lineTo(touch.clientX, touch.clientY);
    
    spellLoc[curInd][1] = [touch.clientX, touch.clientY];
    //console.log(spellLoc[curInd][1]);
    ctx.stroke(drawPath);
});

canvas.addEventListener("touchend", (e) =>{
    
    //console.log("hguhyuhuh");
});

function reset(manaL, act){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPath = new Path2D();
    spellLoc = [];
    curInd = -1;
    curM -= manaL;
    mana.style.width = curM+"px";
    switch(act){
        case "recH":
            char.health += 40;
            healthBar.style.width = char.health+"px";
        case "recM":
            char.mana += 40;
            mana.style.width = char.mana+"px";
        case "attE":
            //need to remove enemy health when relevant        
    };
}

function clearCanvas() {
    
    if (spellLoc.length === 1){
        if (spellLoc[0][0][1]<spellLoc[0][1][1] && spellLoc[0][1][1]-spellLoc[0][0][1]>=200){
            console.log("slash");
            reset(20, "recH");
        } else if (spellLoc[0][0][0]<spellLoc[0][1][0]){
            console.log("swipe");
            reset(0, "recM");
        }else {
            console.log("bogde");
            reset(0, "attE");
        }
    } else if(spellLoc.length === 2){
        reset(40, "attE");
    } else if(spellLoc.length === 3){
        reset(40, "attE");
    } else {
        console.log(spellLoc.length);
        console.log("wprlimg");
        reset(0);
    };
}

//but.addEventListener("mousedown", clearCanvas);

//stuff for the movment
//no dodge currently
//cant go right or left

let moveDir;
let battle = true;
let relMove = [];

moveCan.addEventListener("touchstart", (e)=>{
    const touch = e.touches[0];
    relMove.push([[touch.clientX, touch.clientY],[]])
});

moveCan.addEventListener("touchmove", (e)=>{
    const touch = e.touches[0];
    relMove[0][1] = [touch.clientX, touch.clientY];
    
    //console.log(relMove);
    if (battle===true){
        if(relMove[0][0][1] > relMove[0][1][1]){
            moveCan.addEventListener("touchend", (e)=>{
                clearCanvas();
                relMove = [];
            });
            //clearCanvas();
        } else if (relMove[0][0][1] < relMove[0][1][1]){
            moveCan.addEventListener("touchend", (e) =>{char.dod();
                char.dod();
                relMove = [];
            });
        };
    } else {
    if (relMove[0][0][1] > relMove[0][1][1] && relMove[0][0][1] - relMove[0][1][1] > 20 || relMove[0][0][1] - relMove[0][1][1] < -20){
        moveDir = "forward";
        console.log("up");
    } else if (relMove[0][0][1] < relMove[0][1][1]){
        moveDir = "back";
        console.log("back");
    } else if (relMove[0][0][0] < relMove[0][1][0]){
        moveDir = "right";
        console.log("right");
    }}
});
/*
moveCan.addEventListener("touchend", (e) =>{
    relMove = [];
});

*/
//player

function Player(health, mana, spells, dodge){
    this.health = health;
    this.mana = mana;
    this.spells = spells;
    this.dodge = dodge;

    this.dod = function(){
        this.dodge = true;
        console.log(this.dodge);
        setTimeout(()=>{
            this.dodge = false;
            console.log(this.dodge);
        }, 2000);
    };
    //this is used to recover health
    this.recoverHealth = function(){

    };
    //this is used to recover mana
    this.recoverMana = function(){

    };
};

let char = new Player(100, 100, [], false);

//enemy character stuff

function Monster(image, name, att, health, speed, weakness){
    this.image = image;
    this.name = name;
    this.att = att;
    this.health = health;
    this.speed = speed;
    this.weakness = weakness;
    

    //an attack that works out if the character has dodged
    this.attack = function(){
        if (char.dodge === false){    
            char.health -= att;
            healthBar.style.width = char.health+"px";
            console.log("attacked");}
        else if (char.dodge === true){
            console.log("dodged")
        };    
        //this will need a time to attack every set amount of seconds,
        //based on speed or something
    };
    this.blit = function(){
        //need to add the instructions to blit the character on screen
    }
}

let catMon = new Monster("images/test.png", "Cat Magoo", 20, 20, 2000, "fire");

setInterval(catMon.attack, catMon.speed);

/*
setTimeout(function(){
    console.log("hello World");
}, catMon.speed);
*/

//map stuff

let dunMap = [[1,1,1,1,1],[0,0,0,0,0]]