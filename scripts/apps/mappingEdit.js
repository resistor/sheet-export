
export class MappingEdit extends FormApplication {
    disabledPc = false;
    disabledNpc = false;

    constructor(object, options = {}) {
        super(object, options);
        

        /*
        let stats = object?.getFlag('monks-tokenbar', 'stats') || MonksTokenBar.stats;
        options.height = 62 + (Math.max(stats.length, 4) * 27);

        this.stats = (stats || []).map(s => {
            s.id = s.id || randomID();
            return s;
        });
        //let's just grab the first player character we can find
        let player = game.actors.find(a => a.type == 'character');
        if (player) {
            let attributes = getDocumentClass("Token")?.getTrackedAttributes(player.system ?? {});
            if (attributes)
                this.attributes = attributes.value.concat(attributes.bar).map(a => a.join('.'));
        }
        */
    }

    async getData() {
        console.log("getData");
        console.log("||||||||||||MappingEdit||||||||||||||");
        var disabledPc = false;
        var disabledNpc = false;
        await FilePicker.browse("data", `modules/sheet-export/mappings/${game.system.id}/standard/latest`, { extensions: [".json"] }).then(results => {
            // Add the default option first
            console.log(results);
            console.log(results.files.filter(f => f.split("/").at(-1).replace(".json", "")));
            disabledPc = results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "player")[0] ? false : true;
            console.log(results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "player")[0] ? false : true);
            disabledNpc = results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "npc")[0] ? false : true;
            console.log(results.files.filter(f => f.split("/").at(-1).replace(".json", "") === "npc")[0] ? false : true);
            console.log("disabledNpc:",disabledNpc);

        });
        console.log("outside");
        console.log(disabledPc);
        console.log(disabledNpc);
        return {
            "disabledPc": disabledPc,
            "disabledNpc": disabledNpc
        };
    }


    _updateObject() {
        console.log("_updateObject");
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "sheet-export-mappingedit",
            title: 'Edit Mappings',
            template: "./modules/sheet-export/templates/mappingEdit.hbs",
            width: 600,
            closeOnSubmit: true,
            resizable: true,
            popOut: true,
            dragDrop: [{ dragSelector: ".icon", dropSelector: ".item-list" }]
        });
    }
    activateListeners(html) {
        super.activateListeners(html);
        $('button[name="PC"]', html).click(this.showPCmapping.bind(this));
    }

    showPCmapping() {
        console.log("showPCmapping");
    }
}