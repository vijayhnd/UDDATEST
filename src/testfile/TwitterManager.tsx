
import ISocialMediaManager from "./SocialMediaFactory";

export const TwitterConstants = {
     consumernKey: 'vtL3KzC6dfIAL8x2PUUS4jdlC',
    consumerSecret: 'Ibpky7BFdUzd6qLSUc20TS9mpRYe4386mfNSQ0S7846fwXnqas', 
	 /*consumernKey: 'gFhtyq2oJA3IncD5KeVtLvJnP',
    consumerSecret: 'JK8g3VQ5EFhzSNH3cMcZxU6jo5Kazj1BrMX1CZblYFIpZ4LRmr',*/
}

export default class TwitterManager implements ISocialMediaManager {    

    public login(): Promise<any> {
        return new Promise(function(resolve, reject) { 
            resolve([])
        })
    }
}