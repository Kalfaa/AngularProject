import {Pokemon} from "../src/Pokemon";
import {Attack} from "../src/Attack";
import {Type} from "../src/Type";


test('Should create Pokemon', () => {
    let chenipan:Pokemon = new Pokemon("chenipan", ["Plante"],0,1,33,33,33,33,33,[]);
});

test('Should return false', () => {
    let chenipan:Pokemon = new Pokemon("chenipan", ["Plante"],0,1,33,33,33,33,33,[]);
    expect(chenipan.isAlive()).toBe(false);
});
