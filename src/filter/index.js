import Vue from 'vue'
Vue.filter('dateTime',(value,discount)=>{//yyyy-mm-dd hh:mm:ss
    if(value){
        let d = new Date(parseInt(value)),
            year = d.getFullYear(),
            month = (d.getMonth()+1) <10 ? '0' + (d.getMonth()+1) : '' + (d.getMonth()+1),
            day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate(),
            hour = d.getHours() <10 ? '0' + d.getHours() : '' + d.getHours(),
            minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes(),
            seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
        return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }
})

Vue.filter('formatDate',(value,discount)=>{//yyyy-mm-dd
    if(value){
        let d = new Date(parseInt(value)),
            year = d.getFullYear(),
            month = (d.getMonth()+1) <10 ? '0' + (d.getMonth()+1) : '' + (d.getMonth()+1),
            day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return  year+ '-' + month + '-' + day;
    }
})

Vue.filter('formatNum',(value,discount)=>{//千分位
    if(value){
        value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(2) + '';
        var l = value.split('.') [0].split('').reverse(),
          r = value.split('.') [1];
        var t = '';
        for(var i = 0; i < l.length; i++){
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
    }
})
