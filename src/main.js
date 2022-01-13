import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const globalMixin = {
    methods: {
        checkEmpty(obj){
            for(let key in obj){
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
        },
        deleteRow(recordSet,index){
            recordSet.splice(index,1);
        }
    },
}

createApp(App).mixin(globalMixin).mount('#app');
