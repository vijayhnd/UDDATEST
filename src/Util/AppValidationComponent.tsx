'use strict';

import React, { Component } from 'react';
import defaultRules from './DefaultRules';
import defaultMessages from './DefaultMessages';
import AlertUtil from './AlertUtil';
import { IDispatchProps, IComponentState } from '../Components/IProps';


export interface AppValidationComponentProps extends IDispatchProps{
    deviceLocale?: string, 
    rules?: any, 
    messages? : any
}

export interface AppValidationComponentState extends IComponentState{
    key?: string
}

export interface Field{
    name: string
    value: string
}

class ValidationError{
    fieldName?: string
    messages?: [string]
}

export default class AppValidationComponent<P  extends AppValidationComponentProps, S extends AppValidationComponentState> extends Component<P,S> {

    errors: Array<ValidationError>
    deviceLocale: any
    rules: any
    messages: any
  constructor(props: P) {
      super(props);
      this.errors = [];
      this.deviceLocale = this.props.deviceLocale || 'en'; 
      this.rules = props.rules || defaultRules; 
      this.messages = props.messages || defaultMessages;
  }

  getProps(){
      return this.props
  }


  validate(fields:any) {
    this._resetErrors();
    for (const property of Object.getOwnPropertyNames(this.state)) {
      const rules = fields[property];
      if (rules) {
      var field = Reflect.get(this.state,property)
        this._checkRules(field.name, rules, field.value );
      }
    };
    return this.isFormValid();
  }

  _checkRules(fieldName: string, rules: any, value: any) {
      
    for (const key of Object.keys(rules)) {
        const isRuleFn = (typeof this.rules[key] == "function");
        
        const isRegExp = (this.rules[key] instanceof RegExp);
        
        if ((isRuleFn && !this.rules[key](rules[key], value)) || (isRegExp && !this.rules[key].test(value))) {
          
          this._addError(fieldName, key, rules[key], isRuleFn);
        }
      }
  }

  _addError(fieldName: string, rule: any, value: any, isFn: any) {
      
    const errMsg = this.messages[this.deviceLocale][rule].replace("{0}", fieldName).replace("{1}", value);
    let [error] = this.errors.filter(err => err.fieldName === fieldName);
    if (error) {
      const index = this.errors.indexOf(error);
      error.messages!.push(errMsg);
      this.errors[index] = error;
    } else {
      this.errors.push({
        fieldName,
        messages: [errMsg]
      });
    }
  }
  

  _resetErrors() {
    this.errors = [];
  }

  isFieldInError(fieldName:string) {
    return (this.errors.filter(err => err.fieldName === fieldName).length > 0);
  }

  isFormValid() {
    return this.errors.length == 0;
  }

  getErrorMessages(separator="\n") {
    return this.errors.map((err) => err.messages!.join(separator)).join(separator);
  }

  getErrorsInField(fieldName: string) {
    const foundError = this.errors.find(err => err.fieldName === fieldName)
    if (!foundError) {
      return []
    }
    return foundError.messages
  }
}
