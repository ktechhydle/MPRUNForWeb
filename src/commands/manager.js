export class CommandManager {
    constructor() {
        this.stack = [];
        this.new_stack = [];
        this.current_stack = [];
    }

    pushCommand(undo_cmd) {
        this.stack.push(undo_cmd);
    }
    
    undo() {
        if (this.stack.length === 0) return;
        this.new_stack = this.stack.pop();
        this.current_stack = this.new_stack;
        this.current_stack[this.current_stack.length - 1].undo();
    }

    redo() {
        if (this.current_stack.length === 0) return;
        this.current_stack[this.current_stack.length - 1].redo();
    }
}