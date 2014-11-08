// instantaneous power and gas usage for user 1

Meteor.startup(function(){
Meteor.setInterval( function(){
 var livedata = HTTP.get("https://live.mpare.net/live.json?user=1").data;
 var p1_power 
 var P1_Gas

_.each(livedata.livedata, function(v,i) {
    if (v.internalName == "p1_power") {
        p1_power= v.value
        return;
    }
});
    
_.each(livedata.livedata, function(v,i) {
    if (v.internalName == "P1_Gas") {
        P1_Gas= v.value
        return;
    }
});
    
// Energy.update({
//  userid:  1 
//     },{
 // $set: {content: livedata}},
 //    {upsert:true});
    
    Energy.update({
  userid:  1 , internalName: "p1_power"
     },{
  $set: {content: p1_power}},
     {upsert:true});
    
     Energy.update({
  userid:  1 , internalName: "P1_Gas"
     },{
  $set: {content: P1_Gas}},
     {upsert:true});
} ,1000)

//average power for user 2

Meteor.setInterval( function(){
 var livedata = HTTP.get("https://live.mpare.net/live.json?user=2").data;
 var p1_power 

_.each(livedata.livedata, function(v,i) {
    if (v.internalName == "imm_p_[1-5]") {
        p1_power= v.value
        return;
    }
});
    
// Energy.update({
//  userid:  2 
//     },{
//  $set: {content: livedata}},
//     {upsert:true});
    
    Energy.update({
  userid:  2 , internalName: "p1_power"
     },{
  $set: {content: p1_power}},
     {upsert:true});
} ,1000)

// instantaneous power of user 5
    
 Energy.update({
  userid:  5 
     },{
  $set: {content: livedata}},
     {upsert:true});
    
    Energy.update({
  userid:  5 , internalName: "p1_power"
     },{
  $set: {content: p1_power}},
     {upsert:true});



//historical data of user 1

Meteor.setInterval( function(){
 var histdata = HTTP.get("https://live.mpare.net/data.json?source=539").data;

_.each(histdata.data, function(v,i) {
    if (v.ts >) {
        p1_power= v.value
        return;
    }
});
    

} ,10000)    

});


});




