
export default{
 getEnumValue(array,key){
    for(var i=0;i < array.length;i++){
        if(key == array[i].key){
            return array[i].value;
        }
        
    }
    return key;
}
}