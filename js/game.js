const player1mark = document.querySelector(".player1mark")
const player2mark = document.querySelector(".player2mark")
const mark1 = sessionStorage.getItem("player1mark")
const mark2 = sessionStorage.getItem("player2mark")
const mode = sessionStorage.getItem("mode")
const tiles = Array.from(document.querySelectorAll(".tile"))
const score = Array.from(document.querySelectorAll(".score-count"))
const modal = document.querySelector(".modal")
const audio1 = new Audio('audio/music1.m4a')
const winp = document.querySelector(".winplayer")
const winround = document.querySelector(".winround")
const quitBtn = document.querySelector(".quitbtn")
const nextBtn = document.querySelector(".nextbtn")
const restart = document.querySelector(".restart")
const modal_2 = document.querySelector(".modal2")
const no_btn = document.querySelector(".nobtn")
const yes_btn = document.querySelector(".yesbtn")
const turn = document.querySelector(".turn-icon")
let random;
let runGame;
let occupied_tiles = []
let p1
let p2
let combNum
let winTrue
let winner
let winplayer
let winmark
let mark
let tn = 1

player1mark.textContent = mark1
player2mark.textContent = mark2

if (mark1 == "X") {
    [p1, p2] = ["xmark", "circle"]
    document.querySelector(".player1-score").classList.add("blue-score")
    document.querySelector(".player2-score").classList.add("yellow-score")
} else {
    [p2, p1] = ["xmark", "circle"]
    document.querySelector(".player1-score").classList.add("yellow-score")
    document.querySelector(".player2-score").classList.add("blue-score")


}

const combinations = {
    1: ["1", "2", "3"],
    2: ["1", "4", "7"],
    3: ["1", "5", "9"],
    4: ["4", "5", "6"],
    5: ["7", "8", "9"],
    6: ["2", "5", "8"],
    7: ["7", "5", "3"],
    8: ["3", "6", "9"],
}



class playervscpu {
    constructor(mark_1, mark_2) {
        this.mark_1 = mark_1
        this.mark_2 = mark_2
    }

    winTitle() {
        if (winplayer == "1") {
            winp.textContent = "You"
        } else {
            winp.textContent = "CPU"
        }
    }

    winCheck(x, y, z) {

        for (let i = 1; i <= 8; i++) {

            if (occupied_tiles.includes(combinations[i][0]) && occupied_tiles.includes(combinations[i][1]) && occupied_tiles.includes(combinations[i][2])) {
                winTrue = true

                for (let j = 0; j < 3; j++) {
                    combNum = Number(combinations[i][j])
                    if (!tiles[combNum - 1].classList.contains(`${x}marked`)) {
                        winTrue = false
                    }

                }
                if (winTrue) {
                    winner = true
                    score[y].innerHTML++
                    for (let k = 0; k < 3; k++) {
                        combNum = Number(combinations[i][k])
                        tiles[combNum - 1].classList.add("win")

                    }
                    winplayer = z
                    winmark = x

                    this.winTitle()

                    winround.innerHTML = `<span class="${winmark} ${winmark}-tile "></span>`
                    setTimeout(() => {
                        modal.showModal()


                    }, 250);


                    break
                }


            }

        }





    }

    turnShow() {
        if (turn.classList.contains("xmark")) {
            turn.classList.remove("xmark")
            turn.classList.add("circle")
        } else {
            turn.classList.add("xmark")
            turn.classList.remove("circle")

        }
    }

    cpuPlay() {
        random = Math.floor(Math.random() * 9)
        if (!occupied_tiles.includes(tiles[random].dataset.tile)) {
            tiles[random].insertAdjacentHTML("afterbegin", `<span class="${this.mark_2} ${this.mark_2}-tile"></span>`)
            this.turnShow()
            occupied_tiles.push(tiles[random].dataset.tile)
            tiles[random].classList.add(`${this.mark_2}marked`)
            this.winCheck(p2, 2, 2)
            if (occupied_tiles.length == 9 && winner != true) {
                score[1].innerHTML++
                setTimeout(() => {

                    modal.showModal()
                }, 250);
                winp.textContent = "No One "
                document.querySelector(".round-winner").style.display = "none"

            }
        } else {
            this.cpuPlay()

        }
    }


    runCpuPlay() {
        if (!winner == true && occupied_tiles.length != 9) {

            setTimeout(() => {
                console.log("j")
                this.cpuPlay()

            }, 400);
        }
    }



    userPlay() {
        tiles.forEach((e) => {
            e.addEventListener("click", () => {
                if (!occupied_tiles.includes(e.dataset.tile)) {
                    e.insertAdjacentHTML("afterbegin", `<span class="${this.mark_1} ${this.mark_1}-tile"></span>`)
                    audio1.play()
                    this.turnShow()
                    occupied_tiles.push(e.dataset.tile)
                    e.classList.add(`${this.mark_1}marked`)
                    this.winCheck(p1, 0, 1)
                    if (occupied_tiles.length == 9 && winner != true) {
                        score[1].innerHTML++
                        setTimeout(() => {

                            modal.showModal()
                        }, 250);
                        winp.textContent = "No One "
                        document.querySelector(".round-winner").style.display = "none"

                    }
                    this.runCpuPlay()


                }

            })
        })
    }



    runAll() {
        if (this.mark_1 == "xmark") {
            this.userPlay()
        } else {
            setTimeout(() => {
                this.cpuPlay()
                this.userPlay()
            }, 200);
        }



    }




}

class playervsplayer extends playervscpu {

    winTitle() {
        if (winplayer == "1") {
            winp.textContent = "Player 1"
        } else {
            winp.textContent = "Player 2"
        }
    }

    runAll() {

        tiles.forEach((e) => {
            e.addEventListener("click", () => {
                if (!occupied_tiles.includes(e.dataset.tile)) {
                    if (tn == 1) {
                        tn = 2
                        if (this.mark_1 == "xmark") {
                            mark = this.mark_1
                        } else {
                            mark = this.mark_2

                        }
                    } else {
                        tn = 1
                        if (this.mark_2 == "circle") {

                            mark = this.mark_2
                        } else {

                            mark = this.mark_1
                        }
                    }
                    e.insertAdjacentHTML("afterbegin", `<span class="${mark} ${mark}-tile"></span>`)
                    audio1.play()
                    this.turnShow()
                    occupied_tiles.push(e.dataset.tile)
                    e.classList.add(`${mark}marked`)
                    if (this.mark_1 == mark) {

                        this.winCheck(p1, 0, 1)
                    } else {
                        this.winCheck(p2, 2, 2)

                    }
                    if (occupied_tiles.length == 9 && winner != true) {
                        score[1].innerHTML++
                        setTimeout(() => {

                            modal.showModal()
                        }, 250);
                        winp.textContent = "No One "
                        document.querySelector(".round-winner").style.display = "none"

                    }

                    this.runAll()


                }

            })
        })

    }





}


const p1title = document.querySelector(".p1")
const p2title = document.querySelector(".p2")
const runMode = () => {

    if (mode == "cpu") {
        runGame = new playervscpu(p1, p2)
    } else {
        runGame = new playervsplayer(p1, p2)
        p1title.textContent = "(Player 1)"
        p2title.textContent = "(Player 2)"

    }
    runGame.runAll()
}


runMode()


quitBtn.addEventListener("click", () => {
    location.href = "index.html"
})

nextBtn.addEventListener("click", () => {
    document.querySelector(".round-winner").style.display = "flex"

    tiles.forEach((e) => {
        e.innerHTML = ""
        e.classList.remove("win")
    })
    occupied_tiles = []
    winner = null
    winTrue = null
    tiles.forEach((e) => {
        e.classList.remove("xmarkmarked")
        e.classList.remove("circlemarked")
    })
    modal.close()
    runMode()
})

restart.addEventListener("click", () => {

    modal_2.showModal()
    yes_btn.addEventListener("click", () => {
        modal_2.close()
        score.forEach((e) => {
            e.innerHTML = "0"
        })

    })
    no_btn.addEventListener("click", () => {
        modal_2.close()
    })

})