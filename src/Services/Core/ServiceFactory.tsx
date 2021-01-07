import { IService } from "./IService";
import OnboardingServices from "../Onboarding/OnboardingServices";
import LocationService from "../Location/LocationService";
import OTPService from "../OTP/OTPService";
import ProfileService from "../Profile/ProfileService";
import ContestService from "../Contest/ContestService";
import BetService from "../Bets/BetService";
import FeedBackService from "../Feedback/FeedbackService";
import SubscriptionService from "../Subscription/SubscriptionService";

export enum ServiceType{
    Location,
    OTP,
    Onbarding,
    User,
    Game,
    Match,
    Betting,
    Contest,
    Feedback,
    Bets,
    Subscription
}

export default class ServiceFactory{
    static createService(serviceType: ServiceType): IService | undefined{
        switch(serviceType){
            case ServiceType.Location:
                return new LocationService()
            case ServiceType.Onbarding:
                return new OnboardingServices()
            case ServiceType.OTP:
                return new OTPService()
            case ServiceType.User:
                return new ProfileService()
            case ServiceType.Contest:
                return new ContestService()
            case ServiceType.Feedback:
                return new FeedBackService()
            case ServiceType.Bets:
                return new BetService()
            case ServiceType.Subscription:
                return new SubscriptionService()
            default:
                return undefined
        }
    }
}