<template>

</template>
<script>
  import API from '../../api/api_enterprise'
  export default {
    data() {
      return {
        like:false
      };
    },
    created() {
      this.getUser();
      this.getNewUser();
    },
    methods: {
        getNewUser(){
          API.getNewUserCount().then((res)=>{
            if(res.statusCode=='0'){

            }else{

            }
          })
        },
        getUser(){
          API.getUserCount().then((res)=>{
            if(res.statusCode=='0'){

            }else{

            }
          })
        },
    }
  }
</script>
