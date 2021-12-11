input="";
noline="";
object=[];
function preload(){
}
function setup(){
    canvas=createCanvas(400,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
    input=document.getElementById("object").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    noline=true;
    objectDetector.detect(video,gotResults);
}
function draw(){
    image(video,0,0,400,300);
    if(noline==true){
        for (i = 0; i<object.length; i++) {
            percent=floor(object[i].confidence*100);
            label=object[i].label;
            textSize(10);
            strokeWeight(5);
            stroke('#32a869');
            text(label+"    "+percent+"%",object[i].x-30,object[i].y-30);
            noFill();
            stroke('#3b429c');
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(input=objects[i].label){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("detect").innerHTML="Object Mentioned Found";
                var synth=window.speechSynthesis;
                var texter = "Object Mentioned Found";
                var utterThis=new SpeechSynthesisUtterance(texter);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("detect").innerHTML="Object Mentioned Not Found";
            }
        }
    }
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}