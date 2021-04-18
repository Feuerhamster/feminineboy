// For people who visit the devtools
console.info("Wanna see the sourcecode? FeminineBoy.net is open source!\nhttps://github.com/Feuerhamster/feminine-boy");

/*
* Mobile navbar toggle
* */
document.querySelector("#toggleNav").addEventListener("click", () => {
    document.querySelector(".titlebar nav").classList.toggle("active");
});