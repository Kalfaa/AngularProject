import {Pokemon} from "./Pokemon";
import {Attack} from "./Attack";
import {Type} from "./Type";

export class Battle {
    static intervalId;
    public typeDict:Object;
    constructor(private readonly pokemon1:Pokemon ,private pokemon2:Pokemon, typeDict:Array<Object>){
        this.typeDict=Battle.loadTypeDict(typeDict);
    }
    start():Promise<Pokemon> {
        return new Promise((resolve, reject) => {
            Battle.intervalId = setInterval(() => {
                let winner: Pokemon = this.pokemon2;

                let pokemonOrder: Pokemon[] = this.priority(this.pokemon1, this.pokemon2);

                this.round(pokemonOrder[0], pokemonOrder[1]);

                if (this.pokemon1.isAlive()) {
                    winner = this.pokemon1;
                    resolve(winner)
                } else if (this.pokemon2.isAlive()) {
                    resolve(winner)
                }
                clearInterval(Battle.intervalId);
                return;
            }, 400);
        })
    }
    // L Level P
    //Damage = floor(floor(floor(2 * L / 5 + 2) * A * P / D) / 50) + 2
    public attack(attacker:Pokemon,receiver:Pokemon,moove:Attack):void{
        this.displayMooveUsed(attacker,moove,receiver);
        let A = attacker.attack;
        let D = receiver.def;
        if (moove.special == true){
            A=attacker.attackSpe;
            D=receiver.defSpe;
        }
        let basedamage = Math.floor(Math.floor(Math.floor(2* attacker.level / 5+2)* A * moove.power / D))+2;
        let multiplicator = this.checkForStrenghtAndWeekness(receiver.type,moove.type);

        let damage = (basedamage*multiplicator);

        this.displayWeakness(multiplicator);
        this.displayDamageTaken(receiver,damage);
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

    static loadTypeDict(typeDict:Array<Object>):Object{
         let result:Object = {};
         typeDict.forEach(type => {
            result[type['name']]= type;
         });
        return result;
    }

    checkForStrenghtAndWeekness(receiverTypes:Type[],mooveType:Type):number {
        let result:number =1;
        receiverTypes.forEach(type=>{
            if(this.typeDict[mooveType]["strengths"].includes(type)){
                result = result*2
            }else if (this.typeDict[mooveType]["weaknesses"].includes(type)){
                result = result*0.5
            }else if (this.typeDict[mooveType]["immunes"].includes(type)){
                return 0;
            }
        });
        return result;
    }

    displayWeakness(multiplicator:number):void{
        if(multiplicator==2){
            console.log("Ce n'est pas très efficace")
        }else if(multiplicator ==0.5 || multiplicator == 0.25){
            console.log("Ce n'est pas très efficace ...")
        }else if(multiplicator ==0){
            console.log("Aucun effet")
        }
    }

    displayMooveUsed(attacker:Pokemon,moove:Attack,receiver:Pokemon):void{
        console.log(attacker.name + " lance " + moove.name +" sur " +receiver.name);
    }

    displayDamageTaken(receiver:Pokemon,damage:number):void{
        console.log(receiver.name +" subit " + damage+" damage ");
    }
}