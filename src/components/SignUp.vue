<template>
<div class="container">
    <div class="card">
        <div class="card-title">
            <h1>Create an Account</h1>
        </div>
        <form @submit.prevent="signUp()">
            <input type="text" id="names" v-model.trim="name" placeholder="Enter Name" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.name">{{errors.name}}</div>

            <input type="email" v-model.trim="email" placeholder="Enter Email" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.email">{{errors.email}}</div> 

            <input type="password" v-model.trim="password" placeholder="Enter Password" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.password">{{errors.password}}</div>

            <input type="number" v-model.trim="number" placeholder="Enter Number" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.number">{{errors.number}}</div>
            <button>Sign Up</button>

            <p>Already have an account?<router-link to="/Login">Sign In</router-link></p>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios'

import LoginSignupValidations  from '../services/LoginSignupValidations'
export default {
    name: 'SignUp',

    data() {
        return {
            name: '',
            email: '',
            password: '',
            number: '',
            errors: [],
        }
    },

    methods: {
        async signUp() {

    //Validations
        let validations = new LoginSignupValidations(
                this.name,
                this.email,
                this.password,
                this.number
            )

            this.errors = validations.checkValidations();
   

                if (this.name && this.email && this.password && this.number) {

                    let result = await axios.post("https://vue-todos-app-9fbbd.web.app/users", {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                    number: this.number
                });
                     
    // To redirect to home page
            if (result.status == 200) {
                localStorage.setItem("user-info", JSON.stringify(result.data))
                    this.$router.push({
                        name: 'home'
                    })
                }
                
            }

        },
    // To validate input field as soon as user enters
         onChange(){
            let validations = new LoginSignupValidations(
                this.name,
                this.email,
                this.password,
                this.number
            )
            this.errors = validations.checkValidations();
        }

    },
    // To check if user is already login
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({
                name: 'home'
            })
        }
    }
}
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: radial-gradient(circle farthest-corner at 10% 20%, rgb(24, 15, 17)0%, rgba(255, 211, 165, 1)90%);
}

.card {
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 30%);
    width: 350px;
    height: 500px;
    border-radius: 8px;
    padding: 10px  8px;
}

.card-title {
    text-align: center;
    padding: 15px;
}

h1 {
    font-size: 27px;
    font-weight: bold;
}

form input {
    margin: 10px 0;
    width: 100%;
    outline: none;
    border: none;
    padding: 10px 0 10px 2px;
    border-radius: 4px;
    background-color: #e2e2e2;
}

button {
    background-color: #4796ff;
    color: #ffffff;
    font-size: 16px;
    border: none;
    outline: none;
    width: 100%;
    padding: 7px 13px;
    border-radius: 4px;
    margin-bottom: 10px;
}

a {
    color: #4796ff;
    text-decoration: none;
}

.error {
    text-align: start;
    color: red;
    font-size: 14px;
    margin-bottom: 5px;
}
</style>
