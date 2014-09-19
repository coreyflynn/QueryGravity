var canvas,
    ctx,
    circles = [],
    attractors = [];

function init(){
    canvas = document.getElementById('query_canvas')
    ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.canvas.width  = retinize(window.innerWidth);
    ctx.canvas.height = retinize(window.innerHeight);
    for (var i=0; i<=1000; i++){
        build_circle();
    }

    build_attactors();
    setInterval(function(){
        build_attactors();
    },15000);
    tick();
}

function tick(){
    draw();
    setTimeout(function(){tick();},16);
}

function draw(){
    // make sure that the canvas is the size of the window
    ctx.canvas.width  = retinize(window.innerWidth);
    ctx.canvas.height = retinize(window.innerHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move_circles();
    draw_circles();
    // draw_attractors();
}

function build_attactors(){
    attractors = [];
    attractors.push({x: canvas.width / 2, y: canvas.height / 2});
    setTimeout(function(){
        attractors = [];
        for (i=0; i< 25; i++){
            var attractor = {x: Math.random()*canvas.width, y: Math.random()*canvas.height};
            attractors.push(attractor);
        }
    },2000)
}

function build_circle(){
    circles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: retinize(Math.random()*5),
        alpha: Math.random(),
        momemtum_x: Math.random()*1 - .5,
        momemtum_y: Math.random()*1 - .5
    });

    // tails.push([]);
}

function draw_circles(){
    circles.forEach(function(c){
        ctx.fillStyle = "rgba(0,0,0," + c.alpha + ")";
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    });
}

function draw_attractors(){
    attractors.forEach(function(a){
        ctx.fillStyle = "rgba(255,0,0,0.1)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, 50, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    });
}

function move_circles(){
    circles.forEach(function(c){
        attractors.forEach(function(a){
            // distance to attractor
            a_dist = Math.sqrt(Math.pow(a.x - c.x,2) + Math.pow(a.y - c.y,2));

            if (a_dist < ctx.canvas.width / 4){
                // x momemtum
                if (a.x <= c.x){
                    c.momemtum_x += c.r * (-.5 / a_dist);
                }else{
                    c.momemtum_x += c.r * (.5 / a_dist);
                }

                // y momemtum
                if (a.y <= c.y){
                    c.momemtum_y += c.r * (-.5 / a_dist);
                }else{
                    c.momemtum_y += c.r * (.5 / a_dist);
                }
            }
        });
        // cap momemtum
        if (c.momemtum_x > 5){
            c.momemtum_x = 5;
        }else if (c.momemtum_x < -5){
            c.momemtum_x = -5;
        }
        if (c.momemtum_y > 5){
            c.momemtum_y = 5;
        }else if (c.momemtum_y < -5){
            c.momemtum_y = -5;
        }

        // position
        c.x += c.momemtum_x;
        c.y += c.momemtum_y;
    });
}

function backingScale(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}

function retinize(num){
    return num * backingScale(ctx);
}

window.onload = function(){init();};
