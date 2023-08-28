import tool from './tool';
export default {
    //限制输入格式
    checkValue(val: any, field: any) {
        let fieldType = field.type;
        let inputType = field.inputType;
        let validationRules = field.validationRules;
        //表单类型为number类型
        if (fieldType === 'number') {
            if (validationRules && validationRules.length > 0) {
                for (let validationItem of validationRules) {
                    if (validationItem.type === 'range') {
                        if (validationItem.condition === 'maxLength') {
                            val = val.slice(0, validationItem.rule);
                        }
                    }
                }
            }
            if (val.substr(0, 1) === '0') {
                val = val.substr(1, val.length);
            }
        }
        //表单类型为input-select
        else if (fieldType === 'input-select') {
            if (inputType === 'decimal') {
                // 小数点前的位数
                let maxLength;
                //小数点后的位数
                let maxPrecision;
                if (validationRules && validationRules.length > 0) {
                    for (let validationItem of validationRules) {
                        if (validationItem.type === 'range') {
                            if (validationItem.condition === 'maxLength') {
                                maxLength = validationItem.rule;
                            }
                            else if (validationItem.condition === 'maxPrecision') {
                                maxPrecision = validationItem.rule;
                            }
                        }
                    }
                    val = tool.setFloat(val, maxLength, maxPrecision);
                }
            }
        }
        //表单类型为decimal
        else if (fieldType === 'decimal') {
            // 小数点前的位数
            let maxLength;
            //小数点后的位数
            let maxPrecision;
            if (validationRules && validationRules.length > 0) {
                for (let validationItem of validationRules) {
                    if (validationItem.type === 'range') {
                        if (validationItem.condition === 'maxLength') {
                            maxLength = validationItem.rule;
                        }
                        else if (validationItem.condition === 'maxPrecision') {
                            maxPrecision = validationItem.rule;
                        }
                    }
                }
                val = tool.setFloat(val, maxLength, maxPrecision);
            }
        }
        return val;
    },
    //通过正则表达式提示输入错误信息
    checkValueByRep(val: any, field: any) {
        let fieldType = field.type;
        let inputType = field.inputType;
        let validationRules = field.validationRules;
        //表单类型为number类型
        let judge;
        if (fieldType === 'input') {
            if (validationRules && validationRules.length > 0) {
                for (let validationItem of validationRules) {
                    if (validationItem.type === 'format') {
                        if (validationItem.condition === 'regular') {
                            let regExp = eval(validationItem.rule);
                            if (regExp.test(val)) {
                                judge = true;
                            }
                            else {
                                judge = false
                            }
                        }
                        else {
                            judge = true;
                        }
                    } else {
                        judge = true;
                    }
                }
            }
            else {
                judge = true;
            }
        } else {
            judge = true
        }
        return judge;
    }
}