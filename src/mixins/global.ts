export default {
    methods: {
        checkEmpty(obj: any ) : boolean{
            for(const key in obj){
                //if the value is 'object'
                if(obj[key] instanceof Object === true){
                    if(this.checkEmpty(obj[key]) === false) return false;
                }
                //if value is string/number
                else{
                //if array or string have length is not 0.
                    if(obj[key] && obj[key].length !== 0) return false;
                }
            }
            return true;
        }
    },
}