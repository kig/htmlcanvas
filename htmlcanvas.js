var HTMLCanvas = function(width, height) {
  this.canvas = document.createElement('canvas');
  this.contextType = null;
  this.container = document.createElement('div');
  this.container.style.position = 'relative';
  this.container.style.display = 'inline-block';
  this.width = width;
  this.height = height;
  this.container.style.width = this.width + 'px';
  this.container.style.height = this.height + 'px';

  this.image = document.createElement('div');
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
  if (this.contextType == null) {
    return null;
  }
  var px;
  var ctx = this.getContext(this.contextType);
  if (this.contextType == '2d') {
    var idata = ctx.getImageData(0,0, this.width, this.height);
    px = idata.data;
    for (var i=0,j=0; i<px.length; i+=4, j++) {
      this.pixels[j].style.backgroundColor = 'rgba('+px[i]+','+px[i+1]+','+px[i+2]+','+px[i+3]+')';
    }
  } else {
    px = new Uint8Array(this.width*this.height*4);
    ctx.readPixels(0, 0, this.width, this.height, ctx.RGBA, ctx.UNSIGNED_BYTE, px);
    for (var y=0; y<this.height; y++) {
      for (var x=0; x<this.width; x++) {
        var i = (y*this.width+x)*4;
        var j = ((this.height-1-y)*this.width+x);
        this.pixels[j].style.backgroundColor = 'rgba('+px[i]+','+px[i+1]+','+px[i+2]+','+px[i+3]+')';
      }
    }
  }
};


HTMLCanvas.prototype.getContext = function(type, args) {
  var ctx;
  if (/webgl/.test(type) && this.contextType == null) {
    var vargs = {};
    if (args) {
      for (var i in args) {
        vargs[i] = args[i];
      }
    }
    vargs['preserveDrawingBuffer'] = true;
    ctx = this.canvas.getContext(type, vargs);
  } else {
    ctx = this.canvas.getContext(type, args);
  }
  if (ctx) {
    this.contextType = type;
  }
  return ctx;
};
