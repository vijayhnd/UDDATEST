import { BaseServiceResponse } from "../Core/IServiceResponse";

export default class PlayResponse extends BaseServiceResponse {
    Dashboard: any;

    constructor(Dashboard: any) {
        super()
        this.Dashboard = Dashboard;
    }

}