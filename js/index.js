const xcover = document.querySelector(".xcover")
const circlecover = document.querySelector(".circlecover")
const xmark = document.querySelectorAll(".xmark")[1]
const circle = document.querySelectorAll(".circle")[1]
const active_player = document.querySelector(".active-player")
const cpuBtn = document.querySelector(".btn1")
const playerBtn = document.querySelector(".btn2")
let player_postion;


// Making a Class Mark Move1 to move active mark bar 

class markMove1 {
    constructor(a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }
    direction() {
        player_postion += 4
    }
    remove(int) {
        if (player_postion > this.b) {
            clearInterval(int)
        }
    }
    addClass() {
        if (player_postion > this.c) {
            circle.classList.remove("active-border")
            xmark.classList.add("active-color")
        }
    }
    move() {
        player_postion = this.a
        let move = setInterval(() => {
            active_player.style.right = `${player_postion}%`
            this.direction()

            this.addClass()

            this.remove(move)
        }, 1);

    }


}

// Making Class MarkMove2 to override some methods of markmove1
class markMove2 extends markMove1 {
    direction() {
        player_postion -= 4
    }
    remove(int) {
        if (player_postion < this.b) {
            clearInterval(int)
        }
    }
    addClass() {
        if (player_postion < this.c) {

            circle.classList.add("active-border")
            xmark.classList.remove("active-color")
        }
    }

}


let mark1 = new markMove1(2, 50, 31)
let mark2 = new markMove2(50, 2, 24)

sessionStorage.setItem("player1mark", "O")
sessionStorage.setItem("player2mark", "X")

xcover.addEventListener("click", () => {
    if (active_player.style.right != "50%") {
        mark1.move()
        sessionStorage.setItem("player1mark", "X")
        sessionStorage.setItem("player2mark", "O")
    }
})

circlecover.addEventListener("click", () => {
    if (active_player.style.right != "2%") {
        mark2.move()
        sessionStorage.setItem("player1mark", "O")
        sessionStorage.setItem("player2mark", "X")
    }
})


const mode = (e) => {

    e.addEventListener("click", () => {
        sessionStorage.setItem("mode", e.dataset.mode)
    })

}
mode(cpuBtn)
mode(playerBtn)