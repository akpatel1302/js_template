import FormModule from "./form.js";
import LocalStorageModule from "./localStorage.js";
import TableModule from "./table.js";

export default class Main {
    constructor() {
        const form= new FormModule();
        new TableModule();
        new LocalStorageModule();
        TableModule.updateTable();
        form.init();
    }
   
}



window.onload = function () {
    new Main();
};

