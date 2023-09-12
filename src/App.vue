<template>
    <title v-if="id">Random Bingo Card #{{ id.toString().padStart(6, '0') }}</title>
    <title v-else>Bingo Card Generator</title>
    <main>
        <h1><span class="title-name" contenteditable>_______'s</span> Bingo Card</h1>
        <h2 v-if="id">Random Bingo Card #{{ id.toString().padStart(6, '0') }}</h2>
        <BingoSheet v-if="selectedWords" :wordList="selectedWords" :size="size"/>
    </main>
    <nav>
        <!-- <button @click="edit()">Edit</button> -->
        <button @click="generate()" :disabled="!wordList">Generate {{ id ? "New" : "" }} Card</button>
        <button @click="print()">Print</button>
    </nav>
</template>

<script>
import BingoSheet from "@/components/BingoSheet.vue"

import "@/assets/fonts/fonts.css"

export default {
    name: 'BingoGenerator',
    components: {
        BingoSheet
    },
    data: function () {
        return {
            id: null,
            wordList: null,
            selectedWords: null,
            size: 5,
        };
    },
    watch: {
        id: function () {
            // Make the seed id into get parameter
            window.history.replaceState({}, "", `?id=${this.id}`);
            this.generateSelectedWords();
        },
        size: function () {
            this.generateSelectedWords();
        },
    },
    created: async function () {
        this.wordList = await this.readWordList();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        if (id) {
            this.id = parseInt(id);
        }
    },
    methods: {
        print: function () {
            window.print();
        },
        generate: function () {
            this.id = Math.floor(Math.random() * 1_000_000);
        },
        pseudoRandom: function (seed) {
            // https://stackoverflow.com/a/19303725
            var x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        },
        readWordList: async function () {
            let url = "./word-lists/BingoListApple2023Sept.txt";
            const response = await fetch(url);
            const text = await response.text();
            return text.split("\n");
        },
        popAtRandom: function (array, seed = null) {
            const random = seed ? this.pseudoRandom(seed) : Math.random();
            const index = Math.floor(random * array.length);
            return array.splice(index, 1)[0];
        },
        generateSelectedWords: function () {
            if (!this.wordList) {
                this.selectedWords = null;
            }
            if (!this.id) {
                this.selectedWords = null;
            }
            const wordList = [...this.wordList];
            const selectedWords = [];
            for (let i = 0; i < (this.size * this.size); i++) {
                const seed = this.id + i;
                const word = this.popAtRandom(wordList, seed);
                selectedWords.push(word);
            }
            this.selectedWords = selectedWords;
        },
    }
}

</script>

<style>
:root {
    font-family: 'IBM Plex Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@media print {
    @page {
        /* Prints on A4 with 1in margin */
        width: 210mm;
        height: 297mm;
        padding: 1in;

        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    nav {
        display: none !important;
    }
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* min-height: 100vh; */
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Bitter Pro', 'IBM Plex Serif', Georgia, serif;
    margin: 0;
}

h1 {
    font-weight: 900;
}

main {
    margin-bottom: 12pt;
}

nav {
    display: flex;
    gap: 12pt;
    align-items: center;
    justify-content: center;
}

nav button {
    font-size: 16pt;
    font-family: 'IBM Plex Sans', Helvetica, Arial, sans-serif;
    font-weight: 400;
}
</style>
