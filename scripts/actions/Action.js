class Action {
    constructor(executor) {
        this.executor = executor;
    }

    execute(){
        this.executor();
    }
}
