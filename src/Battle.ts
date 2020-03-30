import {Pokemon} from "./Pokemon";
import {Attack} from "./Attack";

export class Battle {

    constructor(private readonly pokemon1:Pokemon ,private pokemon2:Pokemon){

    }
    start():Pokemon{
        let winner:Pokemon = this.pokemon2;
        let first:Pokemon ;
        let second:Pokemon;
        while(this.pokemon1.isAlive() && this.pokemon2.isAlive()){
            let pokemonOrder:Pokemon[] = this.priority(this.pokemon1,this.pokemon2);
            this.round(pokemonOrder[0],pokemonOrder[1])
        }
        if(this.pokemon1.isAlive()){
            winner = this.pokemon1
        }
        return winner;
    }
    // L Level P
    //Damage = floor(floor(floor(2 * L / 5 + 2) * A * P / D) / 50) + 2
    public attack(attacker:Pokemon,receiver:Pokemon,moove:Attack):void{
        console.log(attacker.name + " lance " + moove.name +" sur " +receiver.name);
        let A = attacker.attack;
        let D = receiver.def;
        if (moove.special == true){
            A=attacker.attackSpe;
            D=receiver.defSpe;
        }
        let damage = Math.floor(Math.floor(Math.floor(2* attacker.level / 5+2)* A * moove.power / D))+2;
        console.log(receiver.name +" subit " + damage+" damage ")
        receiver.hp= receiver.hp - damage
    }

    public round(first:Pokemon,second:Pokemon){
        console.log(first.name,second.name);
        this.attack(first,second,first.mooveSet[0]);
        if(second.isAlive()){
            this.attack(second,first,second.mooveSet[0]);
        }
    }

    public priority(pokemon1:Pokemon,pokemon2:Pokemon):Pokemon[]{
        let result:Pokemon[] =[];
        if (pokemon2.speed == pokemon1.speed){
             let res = Math.floor(Math.random() * Math.floor(1));
             if (res == 1){
                 result.push(pokemon1);
                 result.push(pokemon2);
                 return result;
             }
             result.push(pokemon2);
             result.push(pokemon1);
             return result
        }
        if (pokemon1.speed>pokemon2.speed){
            result.push(pokemon1);
            result.push(pokemon2);
        }else{
            result.push(pokemon2);
            result.push(pokemon1);
        }
        return result;
    }
}