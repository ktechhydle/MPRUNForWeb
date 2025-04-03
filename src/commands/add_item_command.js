import { UndoCommand } from './base_command.js';


export class AddItemCommand extends UndoCommand {
    constructor(scene, items) {
        super();
        this.scene = scene;
        this.items = items;
    }

    undo() {
        for (var item of this.items) {
            this.scene.remove(item);
        }
    }

    redo() {
        for (var item of this.items) {
            this.scene.add(item);
        }
    }
}