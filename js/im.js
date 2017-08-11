
var imgAry = [    
    "images/shirt.jpeg",
    "images/girl-top.jpeg",
    "images/male-jeans.jpeg",
    "images/men-watch.jpeg",
    "images/women-shoes.jpeg",
    "images/women-watch.jpeg",
    "images/shoe.jpeg",
    "images/women-wedge.jpeg"
];

var hexCodes = {
    "dhablis":          {r:255, g:247, b:248, a:0.5}, //#FFF7F8
    "tutu":             {r:255, g:246, b:251, a:0.5}, //#FFF6FB
    "white-pointer":    {r:254, g:248, b:255, a:0.5}, //#FEF8FF 
    "magnolia":         {r:251, g:248, b:255, a:0.5}, //#FBF8FF
    "zircon":           {r:246, g:247, b:255, a:0.5}, //#F6F7FF
    "anastasia-blue":   {r:245, g:252, b:255, a:0.5}, //#F5FCFF
    "christian-blue":   {r:245, g:254, b:255, a:0.5}, //#F5FEFF
    "honeydew":         {r:244, g:251, b:244, a:0.5}, //#F4FBF4
    "ceramic":          {r:251, g:255, b:246, a:0.5}, //#FBFFF6
    "ivory":            {r:254, g:255, b:245, a:0.5}, //#FEFFF5
    "pearl-lusta":      {r:255, g:252, b:243, a:0.5}, //#FFFCF3
    "bridal-health":    {r:255, g:251, b:246, a:0.5}, //#FFFBF6
    "rose-white":       {r:255, g:250, b:249, a:0.5}, //#FFFAF9
    "old-lace":         {r:254, g:249, b:246, a:0.5}, //#FEF9F6
    "alabaster":        {r:250, g:250, b:250, a:0.5}, //#FAFAFA
    "white":            {r:255, g:255, b:255, a:0.5}  //#FAFAFA
    //"red":              {r:255, g:10, b:10, a:0.5}, //#FFF7F8
    //"blue":             {r:10, g:10, b:255, a:0.5}, //#FFF7F8
    //"green":            {r:10, g:255, b:10, a:0.5} //#FFF7F8
}




var addImgToCanvas  = function(canvParentElm, imgSrc, colorVal) {
    //this.imgSrc = imgSrc;
    //debugger;

    var imgElm      = new Image();
    var canvElm     = document.createElement("canvas");
    var canvContElm = canvParentElm;

    canvContElm.appendChild(canvElm);

    imgElm.src      = imgSrc;
    //imgElm.crossOrigin = "Anonymous";
    imgElm.onload   = function() {
        var canvContext = canvElm.getContext("2d");
        canvElm.height = imgElm.height;
        canvElm.width = imgElm.width;
        canvContext.drawImage(imgElm, 0, 0);

        var imgData = canvContext.getImageData(0,0,canvElm.width, canvElm.height);
        //console.log(imgData);
        var data = imgData.data;
        var newColor = colorVal;

        for (var i = 0; i < data.length; i += 4) {
            var r = data[i], g = data[i+1], b = data[i+2];

            if(r >= 245 && g >= 245 && b >= 245){ 
                //debugger;
                data[i]     = newColor.r; // red
                data[i + 1] = newColor.g; // green
                data[i + 2] = newColor.b; // blue
                //data[i + 3] = newColor.a; // alpha
            }
        }
        canvContext.putImageData(imgData, 0, 0);
    };
    //return canvElm;
};
var loadImages = function(colorVal) {
    var canvContElm = document.getElementById("canv-cont");
    canvContElm.innerHTML = "";

    for( var imgCnt = 0; imgCnt < imgAry.length;  imgCnt++ ) {        
        addImgToCanvas(canvContElm, imgAry[imgCnt], colorVal);
    }
};

var addColorElm = function(parentElm, colorName, colorVal) {
    var colorElm = document.createElement("SPAN");
    colorElm.setAttribute("class", "colorArea");
    colorElm.style = "background-color:rgb("+colorVal.r+","+colorVal.g+","+colorVal.b+")";
    colorElm.innerHTML = colorName;
    parentElm.appendChild( colorElm );
};

(function(){

    loadImages(hexCodes.white);
    var colorsParentElm = document.getElementById("colors");
    
    for(var hexCode in hexCodes ) {
        addColorElm(colorsParentElm, hexCode, hexCodes[hexCode]);
    }

    colorsParentElm.addEventListener("click",function(e){
        if(e.target.className == "colorArea") {
            //debugger;
            loadImages(hexCodes[e.target.innerHTML])
        }
    }, true)
})()