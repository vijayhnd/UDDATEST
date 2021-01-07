'use strict';

import AlertUtil from './AlertUtil';

const defaultRules = {
  numbers: /^[0-9]*$/,
  usphonenumber: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
  required: /\S/,

  minlength(length: number, value: any) {
    if (length === void(0)) {
      throw 'ERROR: It is not a valid length, checkout your minlength settings.';
    } else if(value.length > length) {
      return true;
    }
    return false;
  },
  maxlength(length: number, value: any) {
    if (length === void(0)) {
      throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
    } else if (value.length > length) {
      return false;
    }
    return true;
  },
  sameas(value1: any, value2: any){
      return value1 === value2
  }
};

export default defaultRules;
