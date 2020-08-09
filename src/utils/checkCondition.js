export default function check(min, max, value, callback){
    if(value >= min || value <= max){
        callback(value)
    }
}