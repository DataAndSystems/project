export default {
    //获取userinfo的消息
    getQueryString(name:any) {
        // console.log(sessionStorage.getItem('search'),'search')
        // console.log(sessionStorage.getItem('search'),path,'search')
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = (sessionStorage.getItem('search')||'').substr(1).match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        }
        return null;
      },
    // 限制输入是的格式为小数点前x位，小数点后x位；
    setFloat(value: any, maxLength: any, maxPrecision: any) {
        console.log(value, maxLength, maxPrecision)
        //第一个字符是小数点的情况.
        if (value !== '' && value.substr(0, 1) == '.') {
            value = "";
        }
        value = value.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效
        value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的     
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //设置\d出现的次数
        let rep = '\\d'.repeat(maxPrecision);
        //new RegExp
        let newRegExp = new RegExp('^(\\-)*(\\d+)\\.(' + rep + ').*$');
        value = value.replace(newRegExp, '$1$2.$3');//只能输入两个小数     
        if (value.indexOf(".") < 0 && value !== "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (value.substr(0, 1) == '0' && value.length == 2) {
                value = value.substr(1, value.length);
            }
        }
        // 限制小数点前位数
        if (value.indexOf(".") !== -1) {
            if (value.indexOf(".") > maxLength) {
                value = value.substring(0, maxLength);
            }
        }
        else {
            value = value.substring(0, maxLength);
        }
        return value
    },
    //addList
    addList(data: any, key: any) {
        const find = (children: any) => {
            for (let i of children) {
                if (i.id === key) {
                    //模板
                    let template = i.children[0];
                    //要添加的内容
                    let addItem = JSON.parse(JSON.stringify(template));
                    for (let addItemItem of addItem.children) {
                        if (addItemItem.dataCode.indexOf('#') !== -1) {
                            addItemItem.dataCode = `${addItemItem.dataCode.substring(0, addItemItem.dataCode.indexOf('#'))}#${parseInt(i.currentIndex) + 1}`
                        }
                        else {
                            addItemItem.dataCode = `${addItemItem.dataCode}#${parseInt(i.currentIndex) + 1}`;
                        }
                        if (addItemItem.display) {
                            if (addItemItem.display.target instanceof Array) {
                                let filterTarget = JSON.parse(JSON.stringify(addItemItem.display.target));
                                let filterArr = [];
                                for (let item of filterTarget) {
                                    if (item.indexOf('#') !== -1) {
                                        item = `${item.substring(0, item.indexOf('#'))}#${parseInt(i.currentIndex) + 1}`
                                    }
                                    else {
                                        item = `${item}#${parseInt(i.currentIndex) + 1}`
                                    }
                                    filterArr.push(item)
                                }
                                addItemItem.display.target = filterArr;
                            } else {
                                if (addItemItem.display.target.indexOf('#') !== -1) {
                                    addItemItem.display.target = `${addItemItem.display.target.substring(0, addItemItem.display.target.indexOf('#'))}#${parseInt(i.currentIndex) + 1}`
                                }
                                else {
                                    addItemItem.display.target = `${addItemItem.display.target}#${parseInt(i.currentIndex) + 1}`
                                }
                            }
                        }
                    }
                    i.currentIndex = parseInt(i.currentIndex) + 1;
                    i.children.push(addItem)
                }
                else if (i.children) {
                    find(i.children)
                }
            }
        }
        find(data)
        console.log(data)
        return data;
    },

    //处理list表单相关索引数据
    dealFieldList(data: any) {
        let listBody = data.body;
        let index = 1;
        const findList = (children: any) => {
            for (let i of children) {
                if (i.type === 'list') {
                    i.id = `list#${index}`;
                    i.currentIndex = i.initNumber;
                    index = index + 1;
                }
                else if (i.children) {
                    findList(i.children)
                }
            }
        }
        findList(listBody)
        return listBody
    },
    //根据values处理当前渲染list的长度
    dealFieldListByValues(data: any) {
        let values = data.values;
        let listBody = data.body;
        let listArr: any[] = [];
        // 查找list表单列表
        const findList = (filterData: any) => {
            for (let i of filterData) {
                if (i.type === 'list') {
                    listArr.push(i)
                }
                else if (i.children) {
                    findList(i.children)
                }
            }
        }
        findList(listBody);

        const findDataCode = (listArrData: any, key: any) => {
            let result = false;
            const dealFun = (listArrData: any, key: any) => {
                for (let i of listArrData) {
                    if (i.dataCode) {
                        if (i.dataCode.indexOf('#') !== -1) {
                            if (key === i.dataCode.substring(0, i.dataCode.indexOf('#'))) {
                                result = true;
                            }
                        }
                        else {
                            if (i.dataCode === key) {
                                result = true;
                            }
                        }
                    }
                    else if (i.children) {
                        dealFun(i.children, key)
                    }
                }
            }
            dealFun(listArrData, key)
            return result;
        }

        for (let listItem of listArr) {
            for (let valueItem of values) {
                if (valueItem.dataCode.indexOf("#") !== -1) {
                    let arr = valueItem.dataCode.split('#');
                    if (findDataCode([listItem], arr[0])) {
                        if (parseInt(arr[1]) > parseInt(listItem.initNumber) && parseInt(arr[1]) < parseInt(listItem.maxNumber)) {
                            if (parseInt(arr[1]) > parseInt(listItem.currentIndex)) {
                                listItem.currentIndex = arr[1];
                            }
                        }
                    }
                }
            }
        }
        // 根据currentIndex处理list数据
        const dealList = (filterData: any) => {
            for (let i of filterData) {
                if (i.type === 'list') {
                    //模板
                    let template = i.children[0];
                    for (let templateItem of template.children) {
                        if (templateItem.display) {
                            if (templateItem.display.target instanceof Array) {
                                let filterTarget = JSON.parse(JSON.stringify(templateItem.display.target));
                                let filterArr = [];
                                for (let item of filterTarget) {
                                    if (item.indexOf('#') !== -1) {
                                        filterArr.push(`${item.substring(0, item.indexOf('#'))}#1`)
                                    } else {
                                        filterArr.push(`${item}#1`)
                                    }
                                }
                                templateItem.display.target = filterArr;
                            }
                            else {
                                if (templateItem.display.target.indexOf('#') !== -1) {
                                    templateItem.display.target = `${templateItem.display.target.substring(0, templateItem.display.target.indexOf('#'))}#1`
                                }
                            }
                        }
                        if (templateItem.dataCode.indexOf('#') !== -1) {
                            templateItem.dataCode = `${templateItem.dataCode.substring(0, templateItem.dataCode.indexOf('#'))}#1`
                        }
                        else {
                            templateItem.dataCode = `${templateItem.dataCode}#1`
                        }
                    }
                    //要添加的内容
                    let addContent = [];
                    for (let index = i.initNumber + 1; index <= i.currentIndex; index++) {
                        let addItem = JSON.parse(JSON.stringify(template));
                        for (let addItemItem of addItem.children) {
                            if (addItemItem.dataCode.indexOf('#') !== -1) {
                                addItemItem.dataCode = `${addItemItem.dataCode.substring(0, addItemItem.dataCode.indexOf('#'))}#${parseInt(index)}`
                            }
                            else {
                                addItemItem.dataCode = `${addItemItem.dataCode}#${parseInt(index)}`;
                            }
                            if (addItemItem.display) {
                                if (addItemItem.display.target instanceof Array) {
                                    let filterTarget = JSON.parse(JSON.stringify(addItemItem.display.target));
                                    let filterArr = [];
                                    for (let item of filterTarget) {
                                        if (item.indexOf('#') !== -1) {
                                            filterArr.push(`${item.substring(0, item.indexOf('#'))}#${parseInt(index)}`)
                                        }
                                        else {
                                            filterArr.push(`${item}#${parseInt(index)}`)
                                        }
                                    }
                                    addItemItem.display.target = filterArr;
                                }
                                else {
                                    if (addItemItem.display.target.indexOf('#') !== -1) {
                                        addItemItem.display.target = `${addItemItem.display.target.substring(0, addItemItem.display.target.indexOf('#'))}#${parseInt(index)}`
                                    }
                                    else {
                                        addItemItem.display.target = `${addItemItem.display.target}#${parseInt(index)}`
                                    }
                                }
                            }
                        }
                        addContent.push(addItem);
                    }
                    i.children = [template, ...addContent]
                }
                else if (i.children) {
                    dealList(i.children)
                }
            }
        }
        dealList(listBody);
        console.log(listBody)
    }
}