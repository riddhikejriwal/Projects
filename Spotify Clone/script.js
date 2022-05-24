console.log("Welcome to Spotify");

//Initialise the variables
let songIndex=0;
let audioElement=new Audio('songs/song1.mp3');
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('progressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let masterSongImage=document.getElementById('masterSongImage');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Jaane De", filePath:"songs/song1.mp3", coverPath:"images/song1.jpg"},
    {songName:"Kabhi Kabhi Aditi", filePath:"songs/song2.mp3", coverPath:"images/song2.jpg"},
    {songName:"Phir Le Aaya Dil-Reprise", filePath:"songs/song3.mp3", coverPath:"images/song3.jpg"},
    {songName:"Khudaya Ve", filePath:"songs/song4.mp3", coverPath:"images/song4.jpg"},
    {songName:"Passion Fruit", filePath:"songs/song5.mp3", coverPath:"images/song5.jpg"},
    {songName:"On & On", filePath:"songs/song6.mp3", coverPath:"images/song6.jpg"},
    {songName:"Tum Ho", filePath:"songs/song7.mp3", coverPath:"images/song7.jpg"},
    {songName:"Tujh Mein Rab Dikhta Hai", filePath:"songs/song8.mp3", coverPath:"images/song8.jpg"},
    {songName:"Madno", filePath:"songs/song9.mp3", coverPath:"images/song9.jpg"},
    {songName:"Mirrors", filePath:"songs/song10.mp3", coverPath:"images/song10.jpg"},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// audioElement.play();

//handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime=progressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })    
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/song${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        masterSongImage.src = `images/song${songIndex + 1}.jpg`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`songs/song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    masterSongImage.src = `images/song${songIndex + 1}.jpg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity=1;
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    masterSongImage.src = `images/song${songIndex + 1}.jpg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity=1;
})