function currentTime(){
    var d = new Date().toLocaleTimeString();
    var n = d.split(':')
    var x='';
    if(n[0] < '12'){
    var am= 'am';
    x = n[0]+':'+n[1]+' '+am;
    }
    else{
    var pm = 'pm';
    x = n[0]+':'+n[1]+' '+pm;
    }

    return x;
};

export default currentTime;
