import { UndoCommand } from 'src/commands/base_command';


export class MoveItemCommand extends UndoCommand {
    constructor(scene, items, old_positions, new_positions) {
        super();
        this.scene = scene;
        this.items = items;
        this.old_positions = old_positions;
        this.new_positions = new_positions;
    }

    undo() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const old_position = this.old_positions[i];
            if (item && old_position) {
                item.position.copy(old_position);
            }
        }
        this.scene.updateSelection();
    }

    redo() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const new_position = this.new_positions[i];
            if (item && new_position) {
                item.position.copy(new_position);
            }
        }
        this.scene.updateSelection();
    }
}