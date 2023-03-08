let poldeck = [0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1,1,1];
let indextop = poldeck.length-1;
let libpol = 0;
let fpol = 0;
let veto = false;
// 0 for liberal or 9a, 1 for fascist or 9b
//the bottom of the array is the top of the deck^

const actionslist = [[0,0,1,4,4],[0,2,3,4,4],[2,2,3,4,4]];
let numplayers;
// 5 to 6 players, 7 to 8 players, 9 to 10 players
// 0-nothing, 1-policy peek, 2-investigate, 3-special election, 4-assassinate
const numtoaction = ["nothing", "Deck Peek", "Identity Check", "Special Election", "Expel"];
let aplaynum;
let anumref = [5,7,9,6,8,10];

shuffle(poldeck);
console.log(poldeck);

function topthree(){
  if(indextop<2){
    poldeck = [];
    for(let i = 0; i < 6-libpol; i++)
      poldeck.push(0);
    for(let i = 0; i < 11-fpol; i++)
      poldeck.push(1);
    shuffle(poldeck);
    console.log(poldeck);
    indextop = poldeck.length-1;
    document.getElementById("nocards").innerHTML = indextop+1;
    document.getElementById("nodcards").innerHTML = "0";
  }
  let form = document.getElementById("drawn");
  form.style.display = "block";
  let p1 = document.getElementById("p1");
  let p2 = document.getElementById("p2");
  let p3 = document.getElementById("p3");
  p1.setAttribute("value", poldeck[indextop]?"b":"a");
  p2.setAttribute("value", poldeck[indextop-1]?"b":"a");
  p3.setAttribute("value", poldeck[indextop-2]?"b":"a");
  p1 = document.getElementById("lp1");
  p2 = document.getElementById("lp2");
  p3 = document.getElementById("lp3");
  // why are there variables here
  p1.innerHTML = poldeck[indextop]?"9B":"9A";
  p1.style.color = poldeck[indextop]?"maroon":"royalblue";
  p2.innerHTML = poldeck[indextop-1]?"9B":"9A";
  p2.style.color = poldeck[indextop-1]?"maroon":"royalblue";
  p3.innerHTML = poldeck[indextop-2]?"9B":"9A";
  p3.style.color = poldeck[indextop-2]?"maroon":"royalblue";
  document.getElementById("nocards").innerHTML = (indextop+1)-3;
}

function enacttop(){
  const elco = document.getElementById("elnum");
  let numbero = Number(elco.innerHTML);
  if(numbero<3){
    elco.innerHTML = numbero+1;
    if(numbero==2){
      document.getElementById("eb").innerHTML = "Enact top policy";
    }
    return;
  }
  if(indextop<0){
    poldeck = [];
    for(let i = 0; i < 6-libpol; i++)
      poldeck.push(0);
    for(let i = 0; i < 11-fpol; i++)
      poldeck.push(1);
    shuffle(poldeck);
    console.log(poldeck);
    indextop = poldeck.length-1;
    document.getElementById("nodcards").innerHTML = "0";
  }
  const lasten = document.getElementById("lasten")
  lasten.innerHTML = poldeck[indextop]?"9B":"9A";
  lasten.style.color = poldeck[indextop]?"maroon":"royalblue";
  let chang = document.getElementById(poldeck[indextop]?"br":"gr");
  if(poldeck[indextop]) fpol++; else libpol++;
  chang.innerHTML = Number(chang.innerHTML) + 1;
  indextop--;
  document.getElementById("nocards").innerHTML = indextop+1;
    document.getElementById("eb").innerHTML = "Increase";
    elco.innerHTML = "0";
  if(libpol>=5)return alert("9A wins!!!");
  else if(fpol>=6)return alert("9B wins!!!");
  if(fpol==5){
    veto = true;
    document.getElementById("vetopower").style.display="block";
  }
}

let cursecl;
let cursecl2;

function discardc(){
  cursecl = document.querySelector('input[name="p"]:checked');
  if(cursecl == null){
    return alert("Select one to discard");
  }
  cursecl2 = document.getElementById("l"+cursecl.id);
  cursecl2.style.display = "none";
  cursecl.style.display = "none";
  const chaise = document.getElementById("disb");
  chaise.innerHTML = "Select";
  chaise.setAttribute("onclick", "select();");
  document.getElementById("nodcards").innerHTML = Number(document.getElementById("nodcards").innerHTML)+1;
  cursecl.checked = false;
  if(veto){
    document.getElementById("vetob").style.display = "block";
  }
}

function select(){
  const selected = document.querySelector('input[name="p"]:checked');
  if(selected == null){
    return alert("Select one to enact");
  }
  const lasten = document.getElementById("lasten")
  lasten.innerHTML = selected.value=="b"?"9B":"9A";
  lasten.style.color = selected.value=="b"?"maroon":"royalblue";
  let chang = document.getElementById(selected.value=="b"?"br":"gr");
  if(selected.value=="b") fpol++; else libpol++;
  chang.innerHTML = Number(chang.innerHTML) + 1;
  if(selected.value=="b"){
    // provide executive action
  }
  indextop-=3;
  // im changing the deck value back in the topthree function so there we dont need to do it here
  let form = document.getElementById("drawn");
  form.style.display = "none";
  cursecl2.style.display = "inline";
  cursecl.style.display = "inline";
  const chaise = document.getElementById("disb");
  chaise.innerHTML = "Discard";
  chaise.setAttribute("onclick", "discardc();");
  document.getElementById("nodcards").innerHTML = Number(document.getElementById("nodcards").innerHTML)+1
    document.getElementById("eb").innerHTML = "Increase";
    document.getElementById("elnum").innerHTML = "0";
      document.getElementById("vetob").style.display = "none";
  if(libpol>=5)return alert("9A wins!!!");
  else if(fpol>=6)return alert("9B wins!!!");
  if(selected.value=="b"){
    let agshun = actionslist[numplayers][fpol-1];
    if(agshun==0) return;
    document.getElementById("execact").style.display="block";
    document.getElementById("execb").innerHTML=numtoaction[agshun];
    if(fpol==5){
      veto = true;
      document.getElementById("vetopower").style.display="block";
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function executive(){
  document.getElementById("execact").style.display="none";
  const zazi = document.getElementById("execb").innerHTML;
  if(zazi == "Identity Check"){
    return alert("The class leader may learn the class (but not role) of any one player.");
  }else if(zazi == "Expel"){
    return alert("The class leader can expel any player from the class (and the game). If the player is See-Darth, the 9A students win.");
  }else if(zazi == "Special Election"){
    return alert("The class leader can choose the class leader for the next turn. After the special election, leadership goes back to the person who would have originally gotten it.");
  }else if(zazi == "Deck Peek"){
    if(indextop<2){
      poldeck = [];
      for(let i = 0; i < 6-libpol; i++)
        poldeck.push(0);
      for(let i = 0; i < 11-fpol; i++)
        poldeck.push(1);
      shuffle(poldeck);
      console.log(poldeck);
      indextop = poldeck.length-1;
      document.getElementById("nocards").innerHTML = indextop+1;
      document.getElementById("nodcards").innerHTML = "0";
    }
    return alert(`The top three cards on the policy deck are: ${poldeck[indextop]?"9B":"9A"}, ${poldeck[indextop-1]?"9B":"9A"}, ${poldeck[indextop-2]?"9B":"9A"}`);
  }
}

function vetofunc(){
indextop-=3;
let form = document.getElementById("drawn");
form.style.display = "none";
cursecl2.style.display = "inline";
cursecl.style.display = "inline";
const chaise = document.getElementById("disb");
chaise.innerHTML = "Discard";
chaise.setAttribute("onclick", "discardc();");
document.getElementById("nodcards").innerHTML = Number(document.getElementById("nodcards").innerHTML)+2;
    document.getElementById("vetob").style.display = "none";
  enacttop();
}

function numplays() {
  const selected = document.querySelector('input[name="no"]:checked');
  if(selected == null){
    return alert("Select an option");
  }
  aplaynum = anumref[Number(selected.value)];
  numplayers = Number(selected.value)%3;
  console.log(aplaynum);
  console.log(numplayers);
  document.getElementById("blaka").style.display = "none";
  document.getElementById("actions"+numplayers).style.display="block";
  let brukas = "";
  let rols = [0];
  // 0-sid, 1-9b, 2-9a
  if(aplaynum%2 == 0){
    for(let i = 0; i<(((aplaynum-2)/2)-1); i++){
      rols.push(1)
    }
    for(let i = 0; i < (((aplaynum+2)/2)); i++){
      rols.push(2)
    }
  }
  if(aplaynum%2 == 1){
    for(let i = 0; i<(((aplaynum-1)/2)-1); i++){
      rols.push(1)
    }
    for(let i = 0; i < (((aplaynum+1)/2)); i++){
      rols.push(2)
    }
  }
  shuffle(rols);
  for(let i = 0; i < rols.length; i++){
    brukas += `<button id="roleviewb" type="button" onclick="alert('${rols[i]==0?"Siddarth":(rols[i]==1?"9B":"9A")}');">Player ${i+1}'s identity</button><br>`;
  }
  document.getElementById('rolebtns').innerHTML = brukas;
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
