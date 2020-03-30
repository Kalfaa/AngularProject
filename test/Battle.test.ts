import {Type} from "../src/Type";
import {Attack} from "../src/Attack";
import {Pokemon} from "../src/Pokemon";
import {Battle} from "../src/Battle";
//set interval
test('Should return false', () => {

    let griffe = new Attack("griffe",Type.NORMAL,40,false);
    let chenipan:Pokemon = new Pokemon("chenipan", ["Plante"],1000,1,33,33,33,33,33,[griffe]);
    let ferossinge:Pokemon = new Pokemon("chenipan", ["Plante"],1000,1,33,33,33,33,33,[]);
    let battle = new Battle(chenipan,ferossinge);
    battle.attack(chenipan,ferossinge,griffe);

    expect(ferossinge.hp).toBe(918);
});