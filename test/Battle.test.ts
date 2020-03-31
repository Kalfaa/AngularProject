import {Type} from "../src/Type";
import {Attack} from "../src/Attack";
import {Pokemon} from "../src/Pokemon";
import {Battle} from "../src/Battle";

let typeObect = [{"name":"NORMAL","immunes":["GHOST"],"weaknesses":["ROCK","STEEL"],"strengths":[]},
    {"name":"FIRE","immunes":[],"weaknesses":["FIRE","WATER","ROCK","DRAGON"],"strengths":["GRASS","ICE","BUG","STEEL"]},
    {"name":"WATER","immunes":[],"weaknesses":["WATER","GRASS","DRAGON"],"strengths":["FIRE","GROUND","ROCK"]},
    {"name":"ELECTRIC","immunes":["GROUND"],"weaknesses":["ELECTRIC","GRASS","DRAGON"],"strengths":["WATER","FLYING"]},
    {"name":"GRASS","immunes":[],"weaknesses":["FIRE","GRASS","POISON","FLYING","BUG","DRAGON","STEEL"],"strengths":["WATER","GROUND","ROCK"]},
    {"name":"ICE","immunes":[],"weaknesses":["FIRE","WATER","ICE","STEEL"],"strengths":["GRASS","GROUND","FLYING","DRAGON"]},
    {"name":"FIGHTING","immunes":["GHOST"],"weaknesses":["POISON","FLYING","PSYCHIC","BUG"],"strengths":["NORMAL","ICE","ROCK","DARK","STEEL"]},
    {"name":"POISON","immunes":["STEEL"],"weaknesses":["POISON","GROUND","ROCK","GHOST"],"strengths":["GRASS"]},
    {"name":"GROUND","immunes":["FLYING"],"weaknesses":["GRASS","BUG"],"strengths":["FIRE","ELECTRIC","POISON","ROCK","STEEL"]},
    {"name":"FLYING","immunes":[],"weaknesses":["ELECTRIC","ROCK","STEEL"],"strengths":["GRASS","FIGHTING","BUG"]},
    {"name":"PSYCHIC","immunes":["DARK"],"weaknesses":["PSYCHIC","STEEL"],"strengths":["FIGHTING","POISON"]},
    {"name":"BUG","immunes":[],"weaknesses":["FIRE","FIGHTING","POISON","FLYING","GHOST","STEEL"],"strengths":["GRASS","PSYCHIC","DARK"]},
    {"name":"ROCK","immunes":[],"weaknesses":["FIGHTING","GROUND","STEEL"],"strengths":["FIRE","ICE","FLYING","BUG"]},
    {"name":"GHOST","immunes":["NORMAL"],"weaknesses":["DARK"],"strengths":["PSYCHIC","GHOST"]},
    {"name":"DRAGON","immunes":[],"weaknesses":["STEEL"],"strengths":["DRAGON"]},
    {"name":"DARK","immunes":[],"weaknesses":["FIGHTING","DARK"],"strengths":["PSYCHIC","GHOST"]},
    {"name":"STEEL","immunes":[],"weaknesses":["FIRE","WATER","ELECTRIC","STEEL"],"strengths":["ICE","ROCK"]}];

let pkm1 = new Pokemon("Chenipan", [Type.GRASS],1000,1,34,33,33,33,33,[]);
let pkm2 = new Pokemon("Ferossinge", [Type.GRASS],1000,1,33,33,33,33,33,[]);

describe("Instanciate Battle",()=> {
    test('Should', () => {
        let griffe = new Attack("griffe",Type.NORMAL,40,false);
        let chenipan = new Pokemon("Chenipan", [Type.GRASS],1000,1,34,33,33,33,33,[griffe]);
        let ferossinge = new Pokemon("Ferossinge", [Type.GRASS],1000,1,33,33,33,33,33,[griffe]);
        let battle = new Battle(chenipan,ferossinge,typeObect);
    });
});

describe("Test Battle",()=>{
    let griffe;
    let chenipan;
    let ferossinge;
    let battle:Battle;
    beforeEach(() => {
        griffe = new Attack("griffe",Type.NORMAL,40,false);
        chenipan = new Pokemon("Chenipan", [Type.GRASS],1000,1,34,33,33,33,33,[griffe]);
        ferossinge = new Pokemon("Ferossinge", [Type.GRASS],1000,1,33,33,33,33,33,[griffe]);
        battle = new Battle(chenipan,ferossinge,typeObect);
    });

    test('Should apply damage', () => {
        battle.attack(chenipan,ferossinge,griffe);

        expect(ferossinge.hp).toBe(918);
    });

    test('Should battle',async ()=> {
            let winner = await battle.start();
            expect(winner.name).toBe("Chenipan");
    });

});

describe("Test weakness and strenghts",()=> {
    let battle= new Battle(pkm1,pkm2,typeObect);
    test('checkForStrenghtAndWeekness apply good modificator * 4', () => {
        let res = battle.checkForStrenghtAndWeekness([Type.FLYING, Type.WATER], Type.ELECTRIC);
        expect(res).toBe(4);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 2', () => {
        let res = battle.checkForStrenghtAndWeekness([Type.WATER], Type.ELECTRIC);
        expect(res).toBe(2);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 0.5', () => {
        let res = battle.checkForStrenghtAndWeekness([Type.GRASS], Type.WATER);
        expect(res).toBe(0.5);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 0.25', () => {
        let res = battle.checkForStrenghtAndWeekness([Type.DRAGON, Type.GRASS], Type.WATER);
        expect(res).toBe(0.25);
    });

    test('checkForStrenghtAndWeekness apply good modificator * 0', () => {
        let res = battle.checkForStrenghtAndWeekness([Type.FLYING], Type.GROUND);
        expect(res).toBe(0);
    });
});