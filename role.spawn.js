var roleSpawn = {

    /** @param {basename} creep **/
    run: function(basename) {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns[basename].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    if(upgraders.length < 3 && harvesters.length > 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns[basename].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader',upgrading: 'true'}});
    }

    if(builders.length < 2 && upgraders.length > 2 && harvesters.length > 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns[basename].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
        
    }
};

module.exports = roleSpawn;
