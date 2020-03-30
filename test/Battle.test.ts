import {Type} from "../src/Type";
import {Attack} from "../src/Attack";
import {Pokemon} from "../src/Pokemon";
import {Battle} from "../src/Battle";
//set interval
describe("Test Battle",()=>{
    let griffe;
    let chenipan;
    let ferossinge;
    let battle;
    beforeEach(() => {
        griffe = new Attack("griffe",Type.NORMAL,40,false);
        chenipan = new Pokemon("Chenipan", ["Plante"],1000,1,34,33,33,33,33,[griffe]);
        ferossinge = new Pokemon("Ferossinge", ["Plante"],1000,1,33,33,33,33,33,[griffe]);
        battle = new Battle(chenipan,ferossinge);
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