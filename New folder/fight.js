const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

let monImage = new Image();
monImage.src = "images/mon.png";

//i want to monsters to cycle in and out after getting deffeated
//i need some random chose of monster
//maybe it ends after killing ten monsters
//maybe the monsters get harder over time

console.log(canvas.width/3);
function Monster(name, attack, imageCut, health){
    this.name = name;
    this.attack = attack;
    this.imageCut = imageCut;
    this.health = health;

    this.draw = function(){
        ctx.drawImage(monImage, imageCut[0], imageCut[1], 460, 500,20, 20, 460/4, 500/4);
    }

};
let wormyBoy = new Monster('wormy boy', 10, [460, 0], 10);
let badDrawnFella = new Monster('sad man', 10, [0, 0], 10);

let monList = [wormyBoy, badDrawnFella];
let curInd = 0;
//a battle function i guess
let battle = function(enList){
    //need to fill in this i guess
    //
    if(enList[curInd].health >= 1){
        enList[curInd].draw();
    } else {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        curInd ++;
        enList[curInd].draw();
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
        console.log("uhsdgi9hu");
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
    battle(monList);
});
