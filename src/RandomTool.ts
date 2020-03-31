
export class RandomTool {

    constructor(public mathTool:Math){

    }
    random(rate:number):boolean{
        let res = this.mathTool.random() * this.mathTool.floor(100);
        return res<=rate;
    }
}