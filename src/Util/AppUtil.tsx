export default class AppUtil {
    
    public static logConsole(message: any){
        console.log(message)
    }

    public static getBoolean(value: string){
        switch(value.toLowerCase()){
             case "true":
             case "1":
             case "on":
             case "yes":
                 return true;
             default: 
                 return false;
         }
    }

    public static random(limit: number): number{
        if(limit<=0)
        {
            return 0
        }
        return Math.floor(Math.random()*limit)+1
    }

}