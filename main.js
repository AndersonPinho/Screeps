var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var basename = 'Spawn1'

module.exports.loop = function () {
	
	    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns[basename].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns[basename].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    var tower = Game.getObjectById('f49783a12852af396ab6d992');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
