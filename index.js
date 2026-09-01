let print = (x) => console.log(x);



let wordlist = ["apple", "grape", "peach", "mango", "lemon", "berry", "melon", "guava", "plums", "dates"];

let word = wordlist[Math.floor(Math.random() * wordlist.length)];
print(word);

let GameName = "Guess The Word";
document.title = GameName;
document.querySelector("h1").innerHTML = GameName;
document.querySelector("footer").innerHTML = GameName + " create by kolty Elbo3bo3 ";

let Try = 5;
let Nletters = 5;
let currentTry = 1;
let checkbtn;
let hintbtn;
let refreshbtn;

function startGame() {
    word = wordlist[Math.floor(Math.random() * wordlist.length)];
    print(word);

    const inputcont = document.querySelector(".inputs");
    if (inputcont) inputcont.innerHTML = "";

    const messdiv = document.querySelector(".message");
    if (messdiv) messdiv.innerHTML = "";

    currentTry = 1;
    inputGEN();

    if (checkbtn) checkbtn.disabled = false;
    if (hintbtn) hintbtn.disabled = false;
}

function inputGEN() {
    const inputcont = document.querySelector(".inputs");
    for (let i = 1; i <= Try; i++) {
        let trydiv = document.createElement("div");
        trydiv.classList.add(`try-${i}`);
        trydiv.innerHTML = `<span>Try ${i}</span>`

        if (i !== 1) trydiv.classList.add(`disableinputs`);


        for (let j = 1; j <= Nletters; j++) {
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.id = `geuss-${i}-input-${j}`;
            input.setAttribute("maxlength", "1");
            trydiv.appendChild(input);
        }



        inputcont.appendChild(trydiv);
    }
    inputcont.children[0].children[1].focus();

    let disableinputs = document.querySelectorAll(".disableinputs input");
    disableinputs.forEach((input) => input.disabled = true);

    let inputs = document.querySelectorAll("input");


    inputs.forEach((input, index) => {

        // Add event listener for input event
        // When the user types in the input, convert it to lowercase and move focus to the next input

        input.addEventListener("input", function () {
            this.value = this.value.toLowerCase();

            if (!this.value) return;

            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });

        input.addEventListener("keydown", function (event) {
            let currentInput = Array.from(inputs).indexOf(event.target);
            if (event.key === "Backspace" && !this.value) {
                const prevInput = inputs[index - 1];
                if (prevInput) prevInput.focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = inputs[index - 1];
                if (prevInput) prevInput.focus();
            }

            if (event.key === "ArrowRight") {
                const nextInput = inputs[index + 1];
                if (nextInput) nextInput.focus();
            }

            if (event.key === "Enter") {
                event.preventDefault();
                checkfuc();
            }

        });
    })


};


checkbtn = document.querySelector(".check");
hintbtn = document.querySelector(".hint");
refreshbtn = document.querySelector(".refresh");

checkbtn.addEventListener("click", checkfuc);
hintbtn.addEventListener("click", hintfuc);
refreshbtn.addEventListener("click", startGame);

function hintfuc() {
    const activeTryDiv = document.querySelector(`.try-${currentTry}`);
    if (!activeTryDiv || activeTryDiv.classList.contains("disableinputs")) return;

    const inputs = Array.from(activeTryDiv.querySelectorAll("input"));
    const emptyInput = inputs.find((input) => input.value === "");

    if (!emptyInput) return;

    const index = inputs.indexOf(emptyInput);
    emptyInput.value = word[index].toLowerCase();

    const nextInput = inputs[index + 1];
    if (nextInput) nextInput.focus();
}

function checkfuc() {
    let success = true;

    for (let i = 1; i <= Nletters; i++) {
        let input = document.getElementById(`geuss-${currentTry}-input-${i}`);
        let letter = input.value.toLowerCase();
        let targetletter = word[i - 1].toLowerCase();

        if (letter === targetletter) {
            input.classList.add("inplace");
        } else if (word.includes(letter)) {
            input.classList.add("wrongplace");
            success = false;
        } else {
            input.classList.add("worng");
            success = false;
        }
    }

    let messdiv = document.querySelector(".message");
    if (success) {

        messdiv.innerHTML = "you won!! the word is " + word;
        let alltrys = document.querySelectorAll(".inputs > div");
        alltrys.forEach((trydiv) => trydiv.classList.add("disableinputs"));
        checkbtn.disabled = true;
    } else {
        if (currentTry < Try) {
            let currenttrydiv = document.querySelector(`.try-${currentTry}`);
            currenttrydiv.classList.add("disableinputs");
            currenttrydiv.querySelectorAll("input").forEach((input) => input.disabled = true);
            currentTry++;
            let nexttrydiv = document.querySelector(`.try-${currentTry}`);
            nexttrydiv.classList.remove("disableinputs");
            nexttrydiv.querySelectorAll("input").forEach((input) => input.disabled = false);
            nexttrydiv.querySelector("input").focus();
        }

    }
};

window.onload = function () {
    startGame();
}
