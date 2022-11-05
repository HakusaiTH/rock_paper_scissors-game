const rock = document.getElementById("01").addEventListener('click',()=>{com(0)});
const paper = document.getElementById("02").addEventListener('click',()=>{com(1)});
const scissors = document.getElementById("03").addEventListener('click',()=>{com(2)});

let computer_name = "COM" + Math.floor(Math.random() * 999);
document.getElementById("top_computer").innerText = computer_name;

const item = ["rock","paper","scissors"]
const item_img = ["/img/Untitled-3.png","/img/Untitled-1.png","/img/Untitled-2.png"]

let player_img = document.getElementById("player_img");
let computer_img = document.getElementById("computer_img");
let top_result = document.getElementById("top_result");

const get_name = document.getElementById("get_name").addEventListener('click',function check_name(){
    const player_name = document.getElementById("player_name").value;
    if(player_name == false){alert("กรุณากรอกชื่อ");}
    else if(player_name.length < 3){alert("ชื่อต้องมากกว่า 3ตัว");}
    else if(player_name.length > 10){alert("ชื่อต้องน้อยกว่า 10ตัว");}
    else{
        document.getElementById("top_player").innerText = player_name;
        document.getElementById("user_name").innerText = player_name;
        document.querySelector(".popup_c").style.display = "flex";
        document.querySelector(".popup").style.display = "none";
    }
})

const c_play = document.getElementById("c_play");
const c1 = document.getElementById("c1").addEventListener('click',()=>{get_c(0)})
const c2 = document.getElementById("c2").addEventListener('click',()=>{get_c(1)})
const c3 = document.getElementById("c3").addEventListener('click',()=>{get_c(2)})
const c_item = ["/img/c-1.jpg","/img/c-2.jpg","/img/c-3.png"]

function get_c(c_n){
    document.querySelector(".popup_c").style.display = "none";
    document.querySelector(".container").style.display = "flex";
    document.getElementById("c_play_user").src = c_item[c_n]
    start_cost()
    c_play.src = c_item[c_n]
}

var cost = 0;
const cost_inter = document.getElementById("cost_inter");
function start_cost(){
    setInterval(()=>{
        cost ++;
        cost_inter.innerText = "cost "+cost;
    }, 500);
}

function com(user_input){
    const computer = Math.floor(Math.random() * 3);
    player_img.src = item_img[user_input];
    computer_img.src = item_img[computer]
    if(item[user_input] == "rock"){
        if(item[computer] == "scissors"){win()}
        else if (item[computer] == "paper"){lose()}
        else{top_result.innerText = "Always";}
    }
    if(item[user_input] == "paper"){
        if(item[computer] == "rock"){win()}
        else if (item[computer] == "scissors"){lose()}
        else{top_result.innerText = "Always";}
    }

    if(item[user_input] == "scissors"){
        if(item[computer] == "paper"){win()}
        else if (item[computer] == "rock"){lose()}
        else{top_result.innerText = "Always";}
    }
}

function win(){
    top_result.innerText = "Win";
    document.querySelector(".skill").style.display = "flex";
    document.querySelector(".sellect").style.display = "none";
}

const skill_item = [{"atk":20,"n":1,"s_cost":0},{"atk":30,"n":1,"s_cost":20},{"atk":30,"n":2,"s_cost":30},{"atk":100,"n":1,"s_cost":40}]
const button_attack = document.getElementById("button_attack").addEventListener('click',()=>{check_cost(0)});
const skill_01 = document.getElementById("skill_01").addEventListener('click',()=>{check_cost(1)});
const skill_02 = document.getElementById("skill_02").addEventListener('click',()=>{check_cost(2)});
const skill_03 = document.getElementById("skill_03").addEventListener('click',()=>{check_cost(3)});

function check_cost(get_id_skil){
    if(cost < skill_item[get_id_skil].s_cost){alert("คอสไม่พอ");}
    else{
        cost = cost - skill_item[get_id_skil].s_cost;
        cost_inter.innerText = "cost "+cost;
        attack_inter(skill_item[get_id_skil].atk,skill_item[get_id_skil].n,0)
    }
}

function lose(){
    top_result.innerText = "Lose";
    const random_s = Math.floor(Math.random() * 3);
    attack_inter(skill_item[random_s].atk,skill_item[random_s].n,1);  
}

const computer_div = document.getElementById("computer_div");
const player_div = document.getElementById("player_div");
const div_inter = [computer_div,player_div]

function attack_inter(dmg,x,div_n){
    let get_dmg = dmg * x;
    for(let i = 1;i<=x;i++){
        const random_position_x = Math.floor(Math.random() * 40)+ 40;
        const random_position_y = Math.floor(Math.random() * 100)+ 5;
        let effect_hit = document.createElement("h1");
        effect_hit.innerText = get_dmg;
        effect_hit.style.top = random_position_y+"%";
        effect_hit.style.left = random_position_x+"%";
        div_inter[div_n].appendChild(effect_hit);
        setTimeout(()=>{
            effect_hit.remove()
        }, 500);
    }
    document.querySelector(".skill").style.display = "none";
    document.querySelector(".sellect").style.display = "flex";
    hp(get_dmg,div_n)
}


let computer_hp = 500;
const computer_hp_inter = document.getElementById("computer_hp_inter");

let player_hp = 500;
const player_hp_inter = document.getElementById("player_hp_inter");
const hp_inter = [{"hp":computer_hp,"hp_text":computer_hp_inter},{"hp":player_hp,"hp_text":player_hp_inter}]

const win_or_lose = document.getElementById("win_or_lose");
function hp(dmg,hp_n){
    hp_inter[hp_n].hp -= dmg;
    if(hp_inter[hp_n].hp <= 500 && 333 <= hp_inter[hp_n].hp){hp_inter[hp_n].hp_text.style.color = "green"}
    else if(hp_inter[hp_n].hp <= 333 && 116 <= hp_inter[hp_n].hp){hp_inter[hp_n].hp_text.style.color = "yellow"}
    else if (hp_inter[hp_n].hp < 116){hp_inter[hp_n].hp_text.style.color = "red"}
    hp_inter[hp_n].hp_text.innerText = hp_inter[hp_n].hp;
    document.getElementById("hp").innerText = hp_inter[1].hp+"/500";
    if(hp_inter[1].hp <= 0){win_or_lose.style.display = "flex";win_or_lose.innerText = "Lose";reset()}
    if(hp_inter[0].hp <= 0){win_or_lose.style.display = "flex";win_or_lose.innerText = "Win";reset()}
}

function reset(){
    setTimeout(()=>{location.reload();}, 2000);
}