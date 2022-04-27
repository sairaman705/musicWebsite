alert("welcome to musix !!");

// initialising the variables :
let songIndex = 0;

let audioElement = new Audio("1.mp3");

let masterPlay = document.getElementById("masterPlay");

let myProgress = document.getElementById("myProgress");

let gif = document.getElementById("gif");

let masterSongName = document.getElementById("masterSongName");

let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "the future bass", filePath: "the-future-bass-15017.mp3", coverPath: "4.png", coverduration: "01:06"},
    {songName: "honor and sword", filePath: "2.mp3", coverPath: "4.png", coverduration: "02:13"},
    {songName: "let it go", filePath: "3.mp3", coverPath: "4.png", coverduration: "04:01"},
    {songName: "chill abstract", filePath: "4.mp3", coverPath: "4.png", coverduration: "01:06"},
    {songName: "penguin music", filePath: "5.mp3", coverPath: "4.png", coverduration: "01:28"}
]

songItem.forEach((element, i)=>{
   // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songTime")[0].innerText = songs[i].coverduration;
})

// handel pause / play click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
})

// listen to events :
audioElement.addEventListener('timeupdate', ()=>{
    
    // update seekbar :
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);

    myProgress.value = progress;

})

myProgress.addEventListener('change', ()=>{
    audioElement.currentTime = myProgress.value * audioElement.duration/100;
})  

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{   
            element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlay();       
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})