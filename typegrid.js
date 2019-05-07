//var sparkles1 = ["｡ﾟ",".","･","*","✧","⁺","⋆","✩",":","+ﾟ","＊"];
//var sparkles0 = [".","･","*","⋆"];
var misc = ["♡","♪","❀","✿","☆ﾟ","★"];
var stages = {
    0:           [[1]],
    
    1:       [[-1, 1,-1],
              [ 1, 2, 1],
              [-1, 1,-1]],
    
    2:    [[-1,-1, 0,-1,-1],
           [-1, 1, 2, 1,-1],
           [ 0, 2, 2, 2, 0],
           [-1, 1, 2, 1,-1],
           [-1,-1, 0,-1,-1]],
    
    3:    [[-1, 0, 1, 0,-1],
           [ 0, 1, 1, 1, 0],
           [ 1, 1, 1, 1, 1],
           [ 0, 1, 1, 1, 0],
           [-1, 0, 1, 0,-1]],
    
    4: [[-1,-1,-1, 0,-1,-1,-1],
        [-1, 0, 1, 0, 1, 0,-1],
        [-1, 1, 0, 1, 0, 1,-1],
        [ 0, 0, 1, 0, 1, 0, 0],
        [-1, 1, 0, 1, 0, 1,-1],
        [-1, 0, 1, 0, 1, 0,-1],
        [-1,-1,-1, 0,-1,-1,-1]],
    
    5: [[-1,-1, 0, 1, 0,-1,-1],
        [-1, 1, 0, 1, 0, 1,-1],
        [ 0, 0, 1, 0, 1, 0, 0],
        [ 1, 1, 0,-1, 0, 1, 1],
        [ 0, 0, 1, 0, 1, 0, 0],
        [-1, 1, 0, 1, 0, 1,-1],
        [-1,-1, 0, 1, 0,-1,-1]],
    
    6: [[-1, 0, 1, 0, 1, 0,-1],
        [ 0, 0, 1, 0, 1, 0, 0],
        [ 1, 1, 0,-1, 0, 1, 1],
        [ 0, 0,-1,-1,-1, 0, 0],
        [ 1, 1, 0,-1, 0, 1, 1],
        [ 0, 0, 1, 0, 1, 0, 0],
        [-1, 0, 1, 0, 1, 0,-1]],
    
    7: [[-1,-1, 0, 1, 0,-1,-1],
        [-1, 1, 0,-1, 0, 1,-1],
        [ 0, 0,-1,-1,-1, 0, 0],
        [ 1,-1,-1,-1,-1,-1, 1],
        [ 0, 0,-1,-1,-1, 0, 0],
        [-1, 1, 0,-1, 0, 1,-1],
        [-1,-1, 0, 1, 0,-1,-1]],
    
    8: [[-1,-1,-1, 0,-1,-1,-1],
        [-1, 0,-1,-1,-1, 0,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [ 0,-1,-1,-1,-1,-1, 0],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1, 0,-1,-1,-1, 0,-1],
        [-1,-1,-1, 0,-1,-1,-1]]
    
};

var sparkles = {
    0: [".","˙"],
    1: ["˚","°","*","+","⋆","･"],
    2: ["✧","✶","✴︎"]
}


function Star() {
    this.center = {
        x: 0,
        y: 0
    };
    this.size = 0;
    this.stage = 0;
}


var TypeGrid = {
    
    constants: {
        cell_size: {
            width: 24,
            height: 24
        },
    },
    
    // a matrix of dom element references
    cells: new Array(),
    
    initialize: function() {
        var body_e = document.querySelector('body'),
            body_w = body_e.clientWidth,
            body_h = body_e.clientHeight,
            tg_w_c = Math.ceil(body_w / this.constants.cell_size.width), // width in cells
            tg_h_c = Math.ceil(body_h / this.constants.cell_size.height),
            tg_e   = document.querySelector('#type-grid');
        
        tg_e.style.width = this.constants.cell_size.width * tg_w_c;
        tg_e.style.height = this.constants.cell_size.height * tg_h_c;

        console.log("width (cells): " + tg_w_c);
        console.log("height (cells): " + tg_h_c);
        
        for (var y = 0; y < tg_h_c; y++) {
            this.cells[y] = new Array();
            for (var x = 0; x < tg_w_c; x++) {
                var newCell = document.createElement('div');
                newCell.innerHTML = (Math.random() < 0.5 ? '.' : ".");
//                newCell.innerHTML = sparkles[1][Math.floor(Math.random()*6)];
                newCell.innerHTML = sparkles[0][Math.floor(Math.random()*sparkles[0].length)];
                newCell.style.width = this.constants.cell_size.width;
                newCell.style.height = this.constants.cell_size.height;
                newCell.style.overflow = 'hidden';
                newCell.style.fontWeight = Math.ceil(8*Math.random())* 100;
                tg_e.appendChild(newCell);
                this.cells[y][x] = newCell; // insert reference to new element
            }
        }
    },
    
    sparkle: {
        interval: null,
        
        on: function() {
            this.interval = setInterval(function() {
//                console.log("yell");
                var c = TypeGrid.cells,
                    h = c.length,
                    w = c[0].length,
                    x,
                    y;
                for (y = 0; y < h; y++) {
                    for (x = 0; x < w; x++) {
//                        console.log("yell");
//                        c[y][x].innerHTML = Math.floor(Math.random()*10);
//                        c[y][x].innerHTML = sparkles[2][Math.floor(Math.random()*6)];
                        var fw = (c[y][x].style.fontWeight)*1 + (Math.random() < 0.5 ? -100 : 100);
                        fw = Math.max(fw, 100);
                        fw = Math.min(fw, 800);
                        c[y][x].style.fontWeight = fw;
                    }
                }
            }, 123);
        },
        
        off: function() {
            clearInterval(this.interval);
        },
        
        test: function() {
//            console.log(TypeGrid.constants.cell_size.height);
//            console.log(TypeGrid.cells.length);
//            for (var i = 0; i < 100; i++) {
//                console.log(Math.ceil(8*Math.random())* 100);
//            }
        }
    },
    
    write: function(text, effect) {
        var c = TypeGrid.cells,
            h = c.length,
            w = c[0].length,
            x,
            y,
            i = 0, // character index in input text
            l = text.length;
        
        if (effect == "flood") { // repeat text all over grid
            for (y = 0; y < h; y+=2) {
                for (x = 0; x < w; x++) {
                    var char = text.charAt(i);
                    if (!/\s/.test(char)) {
                        c[y][x].innerHTML = char;
                    }
                    i++;
                    i = i % l;
                }
            }
        } else { // center text
            var x_center = Math.floor((w-l)/2),
                y_center = Math.floor(h / 2);
            for (i; i < l; i++, x_center++) {
                var char = text.charAt(i);
                if (!/\s/.test(char)) {
                    c[y_center][x_center].innerHTML = text.charAt(i);
                }
            }
        }
    },
    
    stars: {
        interval: null,
        
        active: new Array(),
        
				// x and y are numbers from 0 to 1, indicating the range in the width, height respectively
        create: function(size, x, y) {
            var newStar = new Star();
            newStar.size = size;
            newStar.stage = 0;
            newStar.center.x = Math.floor(x*TypeGrid.cells[0].length);
            newStar.center.y = Math.floor(y*TypeGrid.cells.length);
            this.active.push(newStar);
        },
        
        advance: function() {
            for (var i = 0; i < this.active.length; i++) {
                
                var s = this.active[i];
                var stg = stages[s.stage];
                var ctr_x = s.center.x;
                var ctr_y = s.center.y;
                var l = stg.length;
                var offset = 0 - Math.floor(l/2);
                var max = Math.floor(l/2);
                var oy;
                var ox;
                
                for (oy = offset; oy <= max; oy++) {
                    for (ox = offset; ox <= max; ox++) {
                        var y = ctr_y + oy;
                        var x = ctr_x + ox;
                        
                        if (y >= 0 && y < TypeGrid.cells.length && x >= 0 && x < TypeGrid.cells[0].length) {
                            var particle = stages[s.stage][oy - offset][ox - offset];
                            if (particle > -1) {
                                var temp = sparkles[particle];
                                TypeGrid.cells[y][x].innerHTML = temp[Math.floor(Math.random()*temp.length)];
                            }
                        }
                    }
                }
                
                s.stage++;
                if (s.stage > 8) {
                    this.active.splice(i,1);
                }

            }
        }
    },
    
    
}

TypeGrid.initialize();
TypeGrid.sparkle.on();
TypeGrid.write("✿         ", "flood");
console.log(TypeGrid.cells);
var temp = true;

setInterval(function() {
    TypeGrid.stars.advance();
}, 100);
//setInterval(function() {
//    TypeGrid.stars.create(0);
//}, 200);

//TypeGrid.stars.create(0);
//TypeGrid.stars.create(0);
//TypeGrid.stars.create(0);
//TypeGrid.stars.create(0);
//console.log(TypeGrid.stars.active);
//TypeGrid.stars.advance();
//TypeGrid.stars.advance();

//setInterval(function() {
//    if (temp) {
//        TypeGrid.write("hey!****", true);
//    } else {
//        TypeGrid.write("", true);
//    }
//    temp = !temp;
//}, 50);

//setTimeout(function() {
//    TypeGrid.sparkle.off();
//}, 1000);

document.body.addEventListener("keydown", function(e) {
    TypeGrid.stars.create(0, Math.random(), Math.random());
});

var typegridElement = document.querySelector('#type-grid');
typegridElement.addEventListener("mousedown", e => {
		var rect = typegridElement.getBoundingClientRect(),
				x = (e.clientX - rect.left) / typegridElement.offsetWidth,
				y = (e.clientY - rect.top) /  typegridElement.offsetHeight;
		if (x >= 0 && x < 1 && y >= 0 && y < 1) {
				TypeGrid.stars.create(0, x, y);
		}
});