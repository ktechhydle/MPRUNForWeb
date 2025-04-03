//import { CommandManager } from 'src/commands/manager';

var scene = new fabric.Canvas('scene');
scene.backgroundColor = '#1e1e1e';
//var undo_stack = new CommandManager();

function addDefaultObjects() {
    const rect = new fabric.Rect({
        left: 0,
        top: 0, 
        width: 1000,
        height: 700,
        fill: 'white',
        selectable: false,
        evented: false
    });

    scene.add(rect);

    const text = new fabric.Textbox('Competition: ', {
        left: 5,
        top: 5,
        width: 200,
        fontSize: 20,
        fontFamily: 'Arial',
        fill: '#000000',
    });

    scene.add(text);
}

scene.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = scene.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    scene.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    
})

scene.on('mouse:down', function(opt) {
    var evt = opt.e;
    if (evt.shiftKey === true) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
});

scene.on('mouse:move', function(opt) {
    if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    }
});

scene.on('mouse:up', function(opt) {
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
});

function resizeScene() {
    scene.setWidth(window.outerWidth);
    scene.setHeight(window.outerHeight);
    scene.renderAll();
}

function keyPress(event) {
    /*const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isUndo = (isMac ? event.metaKey : event.ctrlKey) && event.key === 'z' && !event.shiftKey;
    const isRedo = (isMac ? event.metaKey : event.ctrlKey) && event.key === 'z' && event.shiftKey;

    if (isUndo) {
        event.preventDefault();
        console.log('Undo triggered');
        undo_stack.undo();
    }

    if (isRedo) {
        event.preventDefault();
        console.log('Redo triggered');
        undo_stack.redo();
    }*/
}

resizeScene();
addDefaultObjects();

window.addEventListener('resize', resizeScene);
window.addEventListener('keydown', keyPress);