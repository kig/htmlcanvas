var HTMLCanvas = function(width, height) {
  this.canvas = document.createElement('canvas');
  this.canvasCtx = this.canvas.getContext('2d');
  this.container = document.createElement('div');
  this.container.style.position = 'relative';
  this.container.style.width = this.width + 'px';
  this.container.style.height = this.height + 'px';
  this.width = width;
  this.height = height;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.pixels = [];
  for (var y=0; y<this.height; y++) {
    for (var x=0; x<this.width; x++) {
      var pixel = document.createElement('div');
      pixel.style.position = 'absolute';
      pixel.style.top = y + 'px';
      pixel.style.left = x + 'px';
      pixel.style.width = '1px';
      pixel.style.height = '1px';
      this.pixels.push(pixel);
      this.container.appendChild(pixel);
    }
  }
};

HTMLCanvas.prototype.update = function() {
  var idata = this.canvasCtx.getImageData(0,0, this.width, this.height);
  var px = idata.data;
  for (var i=0,j=0; i<px.length; i+=4, j++) {
    this.pixels[j].style.backgroundColor = 'rgba('+px[i]+','+px[i+1]+','+px[i+2]+','+(px[i+3]/255)+')';
  }
};


HTMLCanvas.prototype.getContext = function() {
  return this.canvasCtx;
};
