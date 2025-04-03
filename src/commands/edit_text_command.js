import { UndoCommand } from './base_command.js';


export class EditTextCommand extends UndoCommand {
    constructor(item, new_text, old_text) {
        super();
        this.item = item;
        this.new_text = new_text;
        this.old_text = old_text;
    }

    undo() {
        this.item.text = this.old_text
    }

    redo() {
        this.item.text = this.new_text
    }
}