export class Tools {

    static readTextFile(file):string
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText:string = rawFile.responseText;
                    return allText;
                }
            }
        }
        rawFile.send(null);
        return "oui";
    }

}