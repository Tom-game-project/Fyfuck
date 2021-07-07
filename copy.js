function copy(){
    var elem = document.getElementById("output");
    elem.select();
    document.execCommand("copy");
}