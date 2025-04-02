import { UndoCommand } from 'src/commands/base_command';


export class AddItemCommand extends UndoCommand {
    constructor(scene, items) {
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