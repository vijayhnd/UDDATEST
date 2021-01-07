import FacebookManager from "./FacebookManager";
import TwitterManager from "./TwitterManager";
import GoogleManager from "./GoogleManager";

export default interface ISocialMediaManager {

    login(): Promise<any>;
}

export enum SocialMediaType {
    FACEBOOK = 1,
    TWITTER = 2,
    GOOGLE = 3
}

export default class SocialMediaFactory {

    public static createManager(type: SocialMediaType) {
        switch(type){
            case SocialMediaType.FACEBOOK:
                return new FacebookManager();
            case SocialMediaType.TWITTER:
                return new TwitterManager();
            case SocialMediaType.GOOGLE:
                return new GoogleManager();
        }
    }
}