import { IState } from "../Components/IState";
import { IAction } from "./IAction";

export interface IReducer{

    reducer(state?: IState, action?: IAction): IState
}