const diverList = [];

class Diver {
    constructor(name) {
        this.name = name;
        this.equipment = [];
    }
    addEquipment(name, model, manufacturer ){
        this.equipment.push(new Equipment(name, model, manufacturer));
    }
}
class Equipment {
    constructor(name, model, manufacturer) {
        this.name = name;
        this.model = model;
        this.manufacturer = manufacturer;
    }
}

class DOMManager {
    
    static getAllDivers() {
        
        this.render();
    }
    static render(){
        $('#app').empty();
        for(let diver of diverList) {
            $('#app').prepend(
                `<div id="${diver.name}" class="card">
                    <div class="card-header">
                        <h2>${diver.name}</h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteDiver('$(diver.name')">Delete</button>  
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${diver.name}-equipment-name" class ="form-control" placeholder="Equipment Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${diver.name}-equipment-model" class ="form-control" placeholder="Equipment Model">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${diver.name}-equipment-manufacturer" class ="form-control" placeholder="Equipment Manufacturer">
                                </div>
                                <button id="${diver.name}-new-equipment" onclick="DOMManager.addEquipment('${diver.name}')" class=
                                "btn btn-primary form-control">Add</button>
                            </div>
                        </div>
                    </div>
                </div><br>`
                ); 
            
            for(let piece of diver.equipment){
                $(`#${diver.name}`).find('.card-body').append(
                `<p>
                    <span id="name-${piece.name}"><strong>Name: </strong> ${piece.name}</span>
                    <span id="name-${piece.model}"><strong>Model: </strong> ${piece.model}</span>
                    <span id="name-${piece.manufacturer}"><strong>Manufacturer: </strong> ${piece.manufacturer}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteEquipment('${diver.name}', '${piece.name}')">Delete Equipment</button>
                </p>`
                );
                }
            
        }
    }

    static deleteEquipment(diverName, pieceName){
        const index = diverList.findIndex(({ name }) => name === diverName);
        const equipIndex = diverList[index].equipment.findIndex(({ name }) => name === pieceName);
        diverList[index].equipment.splice(equipIndex, 1);
        this.render();

    }
    static addEquipment(diverName){
        const index = diverList.findIndex(({ name }) => name === diverName);
        
        diverList[index].addEquipment($(`#${diverList[index].name}-equipment-name`).val(), $(`#${diverList[index].name}-equipment-model`).val(), $(`#${diverList[index].name}-equipment-manufacturer`).val());
        this.render();
    }

    static addDiver(name) {
        const newDiver = new Diver;
        newDiver.name = name
        diverList.push(newDiver);
        this.render();
    }
  


    static deleteDiver(diverName) {
        const index = diverList.findIndex(({ name }) => name === diverName);
        diverList.splice(index, 1);
        this.render();
    }

}

$('#create-new-diver').click(() => {
    DOMManager.addDiver($('#new-diver-name').val());
    $('#new-diver-name').val('');
});

//DOMManager.addDiver();
