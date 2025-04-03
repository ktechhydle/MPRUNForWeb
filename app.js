import { CommandManager } from './src/commands/manager.js';
import { MoveItemCommand } from './src/commands/move_item_command.js';

var scene = new fabric.Canvas('scene');
scene.backgroundColor = '#1e1e1e';
var undo_stack = new CommandManager();

let SELECT_TOOL = 0;
let PATH_TOOL = 1;
let LABEL_TOOL = 2;
let TEXT_TOOL = 3;
let current_tool = 0;

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

// scene zooming
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

// scene mouse funcs
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
});

function resizeScene() {
    scene.setWidth(window.outerWidth);
    scene.setHeight(window.outerHeight);
    scene.renderAll();
}

function enableScene(enabled) {
    scene.forEachObject( function(object) {
        if ( object.type !== 'rect' ) {
            object.selectable = enabled;
            object.evented = enabled;
        }
    });
    scene.selection = enabled;

    if ( !enabled ) {
        scene.discardActiveObject();
    }

    scene.renderAll();
}

function keyPress(event) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isUndo = (isMac ? event.metaKey : event.ctrlKey) && event.key === 'z';
    const isRedo = (isMac ? event.metaKey : event.ctrlKey) && event.key === 'y';

    if (isUndo) {
        event.preventDefault();
        console.log('Undo triggered');
        undo_stack.undo();
    }

    if (isRedo) {
        event.preventDefault();
        console.log('Redo triggered');
        undo_stack.redo();
    }
}

function updateTool(tool) {
    current_tool = tool;
    console.log('Tool Changed To: ', tool)

    if ( tool === SELECT_TOOL) {
        enableScene(true);
    } 
    else if ( [PATH_TOOL, LABEL_TOOL].includes(tool) ) {
        enableScene(false);
    }
    else if ( tool === TEXT_TOOL ) {
        enableScene(false);

        scene.forEachObject( function(object) {
            if ( object.type === 'textbox' ) {
                object.selectable = true;
                object.hasControls = true; 
                object.editable = true; 
                object.evented = true;
            }
        });
    
        scene.renderAll();
    }
}

resizeScene();
addDefaultObjects();

window.addEventListener('resize', resizeScene);
window.addEventListener('keydown', keyPress);
window.updateTool = updateTool;