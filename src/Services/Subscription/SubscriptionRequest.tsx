import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class SubscriptionRequest extends PostServiceRequest {

    product_id: string
    product_reference_name: string
    udda_bucks: string
    amount: string
    transaction_id: string
    platform: string
    type: string
    subscription_date: string
    subscription_duration: string


    

  
    constructor( product_id: string,
        product_reference_name: string,
        udda_bucks: string,
        amount: string,
        transaction_id: string,
        platform: string,
        type: string,
        subscription_date: string,
        subscription_duration: string ) {
        super()

        this.product_id = product_id,
        this.product_reference_name = product_reference_name,
        this.udda_bucks = udda_bucks,
        this.amount = amount,
        this.transaction_id = transaction_id,
        this.platform = platform,
        this.type = type,
        this.subscription_date = subscription_date,
        this.subscription_duration = subscription_duration
    
    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.product_id = this.product_id 
        jsonRequest.product_reference_name= this.product_reference_name 
        jsonRequest.udda_bucks = this.udda_bucks 
        jsonRequest.amount = this.amount 
        jsonRequest.transaction_id = this.transaction_id 
        jsonRequest.platform = this.platform 
        jsonRequest.type = this.type 
        jsonRequest.subscription_date = this.subscription_date 
        jsonRequest.subscription_duration = this.subscription_duration 
      
        return qs.stringify(jsonRequest, { encode: true })
    }
}