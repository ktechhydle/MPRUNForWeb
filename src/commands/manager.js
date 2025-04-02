export class CommandManger {
    constructor() {
        super();
        this.stack = [];
        this.new_stack = [];
        this.current_stack = [];
    }

    pushCommand(undo_cmd) {
        this.stack.push(undo_cmd);
    }
    
    undo() {
        this.new_stack = this.stack.pop();
        this.current_stack = this.new_stack;
        this.current_stack[length(this.current_stack) - 1].undo()
    }

    redo() {
        this.current_stack = this.stack;
        this.current_stack[length(this.current_stack) - 1].redo()
    }
}