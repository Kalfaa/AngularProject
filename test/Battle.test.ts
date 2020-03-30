import {Type} from "../src/Type";
import {Attack} from "../src/Attack";
import {Pokemon} from "../src/Pokemon";
import {Battle} from "../src/Battle";
//set interval
describe("Test Battle",()=>{
    let griffe = new Attack("griffe",Type.NORMAL,40,false);
    let chenipan:Pokemon = new Pokemon("Chenipan", ["Plante"],1000,1,34,33,33,33,33,[griffe]);
    let ferossinge:Pokemon = new Pokemon("Ferossinge", ["Plante"],1000,1,33,33,33,33,33,[griffe]);
    let battle = new Battle(chenipan,ferossinge);
test('Should apply damage', () => {
    battle.attack(chenipan,ferossinge,griffe);

    expect(ferossinge.hp).toBe(918);
});

test('Should battle',()=> {
        let winner = battle.start()
        expect(winner.name).toBe("chenipan");
});

});