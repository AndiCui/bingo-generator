(function(){"use strict";var e={4198:function(e,t,r){var n=r(9242),i=r(3396),s=r(7139);const o={key:0},a={key:1},u=(0,i._)("h1",null,[(0,i._)("span",{class:"title-name",contenteditable:""},"_______'s"),(0,i.Uk)(" Bingo Card")],-1),d={key:0},c=["disabled"];function l(e,t,r,n,l,h){const f=(0,i.up)("BingoSheet");return(0,i.wg)(),(0,i.iD)(i.HY,null,[e.id?((0,i.wg)(),(0,i.iD)("title",o,"Random Bingo Card #"+(0,s.zw)(e.id.toString().padStart(6,"0")),1)):((0,i.wg)(),(0,i.iD)("title",a,"Bingo Card Generator")),(0,i._)("main",null,[u,e.id?((0,i.wg)(),(0,i.iD)("h2",d,"Random Bingo Card #"+(0,s.zw)(e.id.toString().padStart(6,"0")),1)):(0,i.kq)("",!0),e.selectedWords?((0,i.wg)(),(0,i.j4)(f,{key:1,wordList:e.selectedWords},null,8,["wordList"])):(0,i.kq)("",!0)]),(0,i._)("nav",null,[(0,i._)("button",{onClick:t[0]||(t[0]=e=>h.generate()),disabled:!e.wordList},"Generate "+(0,s.zw)(e.id?"New":"")+" Card",9,c),(0,i._)("button",{onClick:t[1]||(t[1]=e=>h.print())},"Print")])],64)}r(6229),r(7330),r(2062),r(7658);const h=["onClick"];function f(e,t,r,n,o,a){return o.squares?((0,i.wg)(),(0,i.iD)("div",{key:0,class:(0,s.C_)(["sheet",{bingo:this.bingo}])},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.squares,(e=>((0,i.wg)(),(0,i.iD)("div",{class:(0,s.C_)(["square",{free:e.isFreeSquare,checked:e.checked,"winning-square":this.bingo&&this.bingo.includes(e.id)}]),key:e.id,onClick:t=>a.toggleSquare(e.id)},(0,s.zw)(e.isFreeSquare?"":e.text),11,h)))),128))],2)):(0,i.kq)("",!0)}var p={name:"BingoSheet",props:{size:{type:Number,default:5},freeSquare:{type:Boolean,default:!0},wordList:{type:Array}},computed:{totalSquares(){return this.size*this.size},idxFreeSquare(){return this.freeSquare&&this.size%2===1?Math.floor(this.totalSquares/2):-1},bingo(){if(!this.squares)return null;let e=[];for(let n=0;n<this.size;n++){let t=this.squares.slice(n*this.size,(n+1)*this.size);t.every((e=>e.checked))&&(e=e.concat(t.map((e=>e.id))))}for(let n=0;n<this.size;n++){let t=this.squares.filter(((e,t)=>t%this.size===n));t.every((e=>e.checked))&&(e=e.concat(t.map((e=>e.id))))}let t=this.squares.filter(((e,t)=>t%(this.size+1)===0)),r=this.squares.filter(((e,t)=>t%(this.size-1)===0&&t>0&&t<this.totalSquares-1));return t.every((e=>e.checked))?e=e.concat(t.map((e=>e.id))):r.every((e=>e.checked))&&(e=e.concat(r.map((e=>e.id)))),e=[...new Set(e)],e.length>0?e:null}},watch:{wordList(){this.generateSquares()}},data(){return{squares:null}},mounted(){this.generateSquares()},methods:{toggleSquare(e){!this.squares||e>=this.squares.length||this.squares[e].isFreeSquare||(this.squares[e].checked=!this.squares[e].checked)},generateSquares(){const e=[];for(let t=0;t<this.totalSquares;t++)e.push({id:t,text:this.wordList?this.wordList[t]:"",isFreeSquare:this.freeSquare&&t===this.idxFreeSquare,checked:t===this.idxFreeSquare});this.squares=e}}},g=r(89);const w=(0,g.Z)(p,[["render",f],["__scopeId","data-v-627f98b4"]]);var q=w,v={name:"BingoGenerator",components:{BingoSheet:q},data:function(){return{id:null,wordList:null,selectedWords:null}},watch:{id:function(){window.history.replaceState({},"",`?id=${this.id}`),this.selectedWords=this.generateSelectedWords()}},created:async function(){this.wordList=await this.readWordList();const e=new URLSearchParams(window.location.search),t=e.get("id");t&&(this.id=parseInt(t))},methods:{print:function(){window.print()},generate:function(){this.id=Math.floor(1e6*Math.random())},pseudoRandom:function(e){var t=1e4*Math.sin(e);return t-Math.floor(t)},readWordList:async function(){const e=await fetch("/word-lists/BingoListApple2023Sept.txt"),t=await e.text();return t.split("\n")},popAtRandom:function(e,t=null){const r=t?this.pseudoRandom(t):Math.random(),n=Math.floor(r*e.length);return e.splice(n,1)[0]},generateSelectedWords:function(){if(!this.wordList)return null;if(!this.id)return null;const e=[...this.wordList],t=[];for(let r=0;r<25;r++){const n=this.id+r,i=this.popAtRandom(e,n);t.push(i)}return t}}};const S=(0,g.Z)(v,[["render",l]]);var k=S;(0,n.ri)(k).mount("#app")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,r),s.exports}r.m=e,function(){var e=[];r.O=function(t,n,i,s){if(!n){var o=1/0;for(c=0;c<e.length;c++){n=e[c][0],i=e[c][1],s=e[c][2];for(var a=!0,u=0;u<n.length;u++)(!1&s||o>=s)&&Object.keys(r.O).every((function(e){return r.O[e](n[u])}))?n.splice(u--,1):(a=!1,s<o&&(o=s));if(a){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[n,i,s]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,s,o=n[0],a=n[1],u=n[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(i in a)r.o(a,i)&&(r.m[i]=a[i]);if(u)var c=u(r)}for(t&&t(n);d<o.length;d++)s=o[d],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(c)},n=self["webpackChunkbingo_generator"]=self["webpackChunkbingo_generator"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(4198)}));n=r.O(n)})();
//# sourceMappingURL=app.fa7f7db1.js.map