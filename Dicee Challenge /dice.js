
var n=Math.floor(Math.random()*6)+1;
var m="images/dice"+n+".png";
document.querySelector(".img1").setAttribute("src",m);
var n2=Math.floor(Math.random()*6)+1;
var m2="images/dice"+n2+".png";
document.querySelector(".img2").setAttribute("src",m2);
var s="⚖DRAW⚖";
if(n2>n){
    s="Player 2 wins✌️✌️"
}
else if(n>n2){
    s="Player 1 wins✌️"
}
document.querySelector(".container h1").textContent=s;