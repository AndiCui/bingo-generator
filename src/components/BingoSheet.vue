<template>
    <div class="sheet" id="sheet" v-if="squares" :class="{ 'bingo': this.bingo }"
        :style="{ '--grid-template': cssGridTemplateColumns }">
        <div class="square" v-for="sqr of squares" :key="sqr.id"
            :class="{ 'free': sqr.isFreeSquare, 'checked': sqr.checked, 'winning-square': this.bingo && this.bingo.includes(sqr.id) }"
            @click="toggleSquare(sqr.id)">{{ !sqr.isFreeSquare ? sqr.text : "" }}
        </div>
    </div>
</template>
<style scoped>
@media print {
    .square {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
        print-color-adjust: exact;
    }
}

.sheet {
    display: grid;
    grid-template-columns: var(--grid-template);
    /* Load this from size variable */
    margin: auto auto;

    font-size: 12pt;
}

@media screen and (max-width: 768px) {
    .sheet {
        font-size: 9pt;
        line-height: 1;
    }
}

.sheet.bingo {}

.square {
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    padding: 8pt;

    border: 1pt solid black;
    box-sizing: border-box;

    aspect-ratio: 1;

    overflow: hidden;
    /* text-overflow: clip; */;
}

@media screen and (max-width: 768px) {
    .square {
        padding: 4pt;

        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
    }
}

.square.free {
    background: url(@/assets/icons/free-square.svg) no-repeat center center / 66.7%;
}

.square.checked:not(.free) {
    /* overlay a cross */
    background: url(@/assets/icons/check.svg) no-repeat center center / 66.7%;
}

.square.checked.winning-square {
    background: none;
    background-color: black;
    color: white;
}

.square.winning-square.free {
    background: url(@/assets/icons/free-square-white.svg) no-repeat center center / 66.7%;
    background-color: black;
    color: white;
}
</style>
<script>
export default {
    name: 'BingoSheet',
    props: {
        size: {
            type: Number,
            default: 5
        },
        freeSquare: {
            type: Boolean,
            default: true
        },
        wordList: {
            type: Array
        }
    },
    computed: {
        totalSquares() {
            return this.size * this.size
        },
        idxFreeSquare() {
            // The free square is always in the middle of the board, none if the board is even
            return this.freeSquare && this.size % 2 === 1 ? Math.floor(this.totalSquares / 2) : -1
        },
        bingo() {
            if (!this.squares) {
                return null
            }
            // A bingo is when a row, column, or diagonal has all squares checked
            // Return all the ids of the squares that are part of the bingo
            // If there are multiple bingos, return all of them
            // If there are no bingos, return null

            let winningSquares = []

            // Check rows
            for (let i = 0; i < this.size; i++) {
                let row = this.squares.slice(i * this.size, (i + 1) * this.size)
                if (row.every(sqr => sqr.checked)) {
                    winningSquares = winningSquares.concat(row.map(sqr => sqr.id))
                }
            }

            // Check columns
            for (let i = 0; i < this.size; i++) {
                let col = this.squares.filter((_, idx) => idx % this.size === i)
                if (col.every(sqr => sqr.checked)) {
                    winningSquares = winningSquares.concat(col.map(sqr => sqr.id))
                }
            }

            // Check diagonals
            let diag1 = this.squares.filter((_, idx) => idx % (this.size + 1) === 0)
            let diag2 = this.squares.filter((_, idx) => idx % (this.size - 1) === 0 && idx > 0 && idx < this.totalSquares - 1)
            if (diag1.every(sqr => sqr.checked)) {
                winningSquares = winningSquares.concat(diag1.map(sqr => sqr.id))
            } else if (diag2.every(sqr => sqr.checked)) {
                winningSquares = winningSquares.concat(diag2.map(sqr => sqr.id))
            }

            // Make sure there are no duplicates
            winningSquares = [...new Set(winningSquares)]

            return winningSquares.length > 0 ? winningSquares : null
        },
        cssGridTemplateColumns() {
            // Get viewport width
            const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const squareSize = width > 768 ? '96pt' : '54pt';
            return `repeat(${this.size}, ${squareSize})`
        }
    },
    watch: {
        wordList() {
            this.generateSquares()
        }

    },
    data() {
        return {
            squares: null
        }
    },
    mounted() {
        this.generateSquares()
    },
    methods: {
        toggleSquare(id) {
            if (!this.squares || id >= this.squares.length || this.squares[id].isFreeSquare) {
                return
            }
            // Toggle the checked state of a square
            this.squares[id].checked = !this.squares[id].checked
        },
        generateSquares() {
            const squares = []
            for (let i = 0; i < this.totalSquares; i++) {
                squares.push({
                    id: i,
                    text: this.wordList ? this.wordList[i] : "",
                    isFreeSquare: this.freeSquare && i === this.idxFreeSquare,
                    checked: i === this.idxFreeSquare // The free square is always checked
                })
            }
            this.squares = squares
        }
    }
}
</script>