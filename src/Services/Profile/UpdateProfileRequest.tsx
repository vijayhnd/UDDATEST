import { BaseServiceRequest, PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'

export default class UpdateProfileRequest extends PostServiceRequest{
    firstname = ''
    lastname = ''
    email = ''
    mobile = ''
    photo = ''
    displayname = ''
    address_line1 = ''
    address_line2 = ''
    city = ''
    state = ''
    zipcode = ''
    country = ''
    constructor(){
        super()
    }

    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
        jsonRequest.firstname = this.firstname
        jsonRequest.lastname = this.lastname
        jsonRequest.email = this.email
        jsonRequest.mobile = this.mobile
        jsonRequest.photo = this.photo
        jsonRequest.displayname = this.displayname
        jsonRequest.address_line1 = this.address_line1
        jsonRequest.address_line2 = this.address_line2
        jsonRequest.city = this.city
        jsonRequest.state = this.state
        jsonRequest.zipcode = this.zipcode
        jsonRequest.country = this.country
        return qs.stringify(jsonRequest, { encode: true })
    }
}