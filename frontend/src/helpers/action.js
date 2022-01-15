const searcher=(list,value,basedOn)=>{
    let result =[];
    
    let regex=new RegExp(`^${value}.*|^.* ${value}.*`);
   
        for(let i = 0; i < list?.length; i++) {
            //console.log("regex-test",list[i],value,regex.test(list[i]));
            if(regex.test(list[i].fullName)){
                result.push(list[i]);
          }
        }
        //console.log("regex",regex);
        return result;
    
}
export { searcher };


const toPersianNumber = (number) => {

    if (number === undefined)
        return;
    let result = "";
    let digits = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰'
    };
    number = number.toString();
    for (let i = 0; i < number.length; i++)
        if (digits[number[i]])
            result += digits[number[i]];
        else
            result += number[i];
    return result;

}
export { toPersianNumber };

const toEnglishNumber = (number) => {

    if (number === undefined)
        return;
    let result = "";
    let digits = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };
    number = number.toString();
    for (let i = 0; i < number.length; i++)
        if (digits[number[i]])
            result += digits[number[i]];
        else
            result += number[i];
    return result;
}

export { toEnglishNumber }

