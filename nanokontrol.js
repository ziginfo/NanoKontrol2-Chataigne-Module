//This script is based on the "MackieUniversal.js" written by : Guesn
// https://github.com/Guesn/Mackie-Control-Chataigne-Module
// thanks for his great job !!


function init()
{
    script.log();

    //Synchronize Arrays 1-7
    for(counter=0;counter<8;counter++){
       
        //Init Mute
        local.sendNoteOn(1,counter+16,local.values.strips.getChild('Strip '+(counter+1)).mute.get());
        //Init Solo
        local.sendNoteOn(1,counter+8,local.values.strips.getChild('Strip '+(counter+1)).solo.get());
        //Init Rec
        local.sendNoteOn(1,counter+0,local.values.strips.getChild('Strip '+(counter+1)).rec.get());
        
        
    }

    

}

//*****MIDI MODULE SPECIFIC SCRIPTS*****

function noteOnEvent(channel, pitch, velocity)
{
    // Is it a 'Rec' button ?
    if (pitch >= 0 && pitch <= 7){
        var index = pitch;
        if (local.values.strips.getChild('Strip '+(index+1)).rec.get()==0){
            local.values.strips.getChild('Strip '+(index+1)).rec.set("on");
        }else{
            local.values.strips.getChild('Strip '+(index+1)).rec.set("off");
        }
    }

    //Is it a 'Solo' button ?
    if (pitch >= 8 && pitch <= 15){
        //Change solo strip state
        var index = pitch-8;
        if (local.values.strips.getChild('Strip '+(index+1)).solo.get()==0){
            if (local.parameters.flashOnSolo.get()){local.values.strips.getChild('Strip '+(index+1)).solo.set("flash");}
            else {local.values.strips.getChild('Strip '+(index+1)).solo.set("on");}
        }else{
            local.values.strips.getChild('Strip '+(index+1)).solo.set("off");
        }
    }

    //Is it a 'Mute' button ?
    if (pitch >= 16 && pitch <= 23){
        // Change mute strip state
        var index = pitch-16;
        if (local.values.strips.getChild('Strip '+(index+1)).mute.get()==0){
            local.values.strips.getChild('Strip '+(index+1)).mute.set("on");
        }else{
            local.values.strips.getChild('Strip '+(index+1)).mute.set("off");
        }
    }

    //Is it a 'Select' button?
    if (pitch >= 24 && pitch <= 31){
        //Set new selected strip value    
        local.parameters.stripIndex.set(pitch-23);
    }
    
    //Is it a 'Push' button?
    if (pitch >= 32 && pitch <= 39){
        var index = pitch-32;
        if(velocity==127) {local.values.strips.getChild('Strip '+(index+1)).push.set(1);}
    }
    
   
    //Is it a 'Move' button?
    if (pitch >= 46 && pitch <= 49){
        if (pitch == 46) {local.parameters.bankIndex.set(local.parameters.bankIndex.get()-1);}
        if (pitch == 47) {local.parameters.bankIndex.set(local.parameters.bankIndex.get()+1);}
        if (pitch == 48) {local.parameters.stripIndex.set(local.parameters.stripIndex.get()-1);}
        if (pitch == 49) {local.parameters.stripIndex.set(local.parameters.stripIndex.get()+1);}
    }
    
  
    //Is it a 'Transport' button?
    if (pitch >= 84 && pitch <= 95){
        if (pitch == 84) {if(velocity==127){script.log("Marker");local.values.transport.marker.set(1);}}
        if (pitch == 85) {if(velocity==127){script.log("Nudge");local.values.transport.nudge.set(1);}}
        if (pitch == 86) {if(velocity==127){script.log("Cycle");local.values.transport.cycle.set(1);}}
        if (pitch == 87) {if(velocity==127){script.log("Drop");local.values.transport.drop.set(1);}}
        if (pitch == 88) {if(velocity==127){script.log("Replace");local.values.transport.replace.set(1);}}
        if (pitch == 89) {if(velocity==127){script.log("Click");local.values.transport.click.set(1);}}
        if (pitch == 90) {if(velocity==127){script.log("Solo");local.values.transport.solo.set(1);}}
        if (pitch == 91) {if(velocity==127){script.log("Rewind");local.values.transport.rewind.set(1);}}
        if (pitch == 92) {if(velocity==127){script.log("Fast Forward");local.values.transport.forward.set(1);}}
        if (pitch == 93) {if(velocity==127){script.log("Stop");local.values.transport.stop.set(1);}}
        if (pitch == 94) {if(velocity==127){script.log("Play");local.values.transport.play.set(1);}}
        if (pitch == 95) {if(velocity==127){script.log("RecSet");local.values.transport.recSet.set(1);}}
    }

    //Is it a 'Arrow' button?
    if (pitch >= 40 && pitch <= 99){
        if (pitch == 96) {if(velocity==127){script.log("Up");local.values.misc.up.set(1);}}
        if (pitch == 97) {if(velocity==127){script.log("Down");local.values.misc.down.set(1);}}
        if (pitch == 46) {if(velocity==127){script.log("Left");local.values.misc.left.set(1);}}
        if (pitch == 47) {if(velocity==127){script.log("Right");local.values.misc.right.set(1);}}
    }

    //Is it a 'Misc' button? 

    if (pitch >= 100 && pitch <= 101){
        if (pitch == 100) {if(velocity==127){script.log("Zoom");local.values.misc.zoom.set(1);}}
        if (pitch == 101) {if(velocity==127){script.log("Scrub");local.values.misc.scrub.set(1);}}
    }



}

function noteOffEvent(channel, pitch, velocity)
{

    //Is it a button ?
    if (pitch >= 40 && pitch <= 101){
        
        if (pitch == 84) {if(velocity==0){local.values.transport.marker.set(0);}}
        if (pitch == 85) {if(velocity==0){local.values.transport.nudge.set(0);}}
        if (pitch == 86) {if(velocity==0){local.values.transport.cycle.set(0);}}
        if (pitch == 87) {if(velocity==0){local.values.transport.drop.set(0);}}
        if (pitch == 88) {if(velocity==0){local.values.transport.replace.set(0);}}
        if (pitch == 89) {if(velocity==0){local.values.transport.click.set(0);}}
        if (pitch == 90) {if(velocity==0){local.values.transport.solo.set(0);}}
        if (pitch == 91) {if(velocity==0){local.values.transport.rewind.set(0);}}
        if (pitch == 92) {if(velocity==0){local.values.transport.forward.set(0);}}
        if (pitch == 93) {if(velocity==0){local.values.transport.stop.set(0);}}
        if (pitch == 94) {if(velocity==0){local.values.transport.play.set(0);}}
        if (pitch == 95) {if(velocity==0){local.values.transport.recSet.set(0);}}
        if (pitch == 96) {if(velocity==0){local.values.misc.up.set(0);}}
        if (pitch == 97) {if(velocity==0){local.values.misc.down.set(0);}}
        if (pitch == 46) {if(velocity==0){local.values.misc.left.set(0);}}
        if (pitch == 47) {if(velocity==0){local.values.misc.right.set(0);}}
        
    }
}

//Upon receiving MIDI Control Change message
function ccEvent(channel, number, value)
{   
    //Is it encoder movement?
    if(channel==1 && number >= 16 && number <= 23){
        var index = number-16;
        //If SpinLeft
        if(value>64){
            //Subtract corrected value from rotaryValueue
            local.values.strips.getChild('Strip '+(index+1)).rotaryValue.set(local.values.strips.getChild('Strip '+(index+1)).rotaryValue.get()-((value-64)/256));
        }else{
            //Add value to rotaryValueue
            local.values.strips.getChild('Strip '+(index+1)).rotaryValue.set(local.values.strips.getChild('Strip '+(index+1)).rotaryValue.get()+(value/256));
        }
    }
}

//Upon receiving MIDI PitchWheel message (only fader values)
function pitchWheelEvent(channel,value){
   
        //Update strip module with new value
        local.values.strips.getChild('Strip '+channel).faderValue.set(value/16383);
    
}
