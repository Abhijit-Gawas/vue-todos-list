<template>
<nav>
    <a href="#">Home</a>
    <a v-on:click="logout" href="#">Logout</a>
</nav>

</template>

<script>
export default{
 name:'Header',

 methods:{
    //Logout Function
    logout(){
       localStorage.clear();
       this.$router.push({name:'Login'})
    }
 }
}
</script>

<style scoped>
body{
    margin: 0;
    padding: 0;
}
nav {
    background: lightblue;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

a {
    color: white;
    text-decoration: none;
    font-size: 20px;
}
a:hover{
    color: black;
}
</style>