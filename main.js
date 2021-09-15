status = "";
objects = [];
video = "";

function preload(){
   video = createVideo('video.mp4');
   video.hide();
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status:- Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
   image(video,0,0,500,400)
   if(status != ""){
       objectDetector.detect(video , gotResults);
       for(i = 0; i < objects.length; i++){
           document.getElementById("status").innerHTML = "Status:- Objects Detected";
           document.getElementById("number_of_objects").innerHTML = "Number of Objects:-"+objects.length;

           fill("red");
           percent=floor(objects[i].confidence * 100);
           text(objects[i].length + " " + percent + "%" , objects[i].x , objects[i].y);
           noFill();
           stroke("red");
           rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
       }
   }
}