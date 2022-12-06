<template>
<div class="container">
    <div class="card">
        <div class="card-title">
            <h1>Login here</h1>
        </div>
        <form @submit.prevent="login()">

            <input type="text" v-model.trim="name" placeholder="Enter Name" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.name">{{errors.name}}</div>

            <input type="email" v-model.trim="email" placeholder="Enter Email" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.email">{{errors.email}}</div>

            <input type="password" id="pass1" v-model.trim="password" placeholder="Enter Password" autocomplete="off" v-on:input="onChange()">
            <div class="error" v-if="errors.password">{{errors.password}}</div>

            <button>Login</button>
            <p>Don't have an account?<router-link to="/sign-up">SignUp</router-link>
            </p>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import LoginSignupValidations from '../services/LoginSignupValidations'
export default {
    name: 'Login',

    data() {
        return {
            name: '',
            email: '',
            password: '',
            errors: []
        }
    },
    methods: {
        async login() {
     // Validations
            let validations = new LoginSignupValidations(
                this.name,
                this.email,
                this.password,
            )
            this.errors = validations.checkValidations();

            if (this.name && this.email && this.password) {

                let result = await axios.get(
                    `https://vue-todos-app-9fbbd.web.app/users?name=${this.name}&email=${this.email}&password=${this.password}`
                );
    // To redirect to home page
                if (result.status == 200 && result.data.length > 0) {
                    localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                    this.$router.push({
                        name: 'home'
                    })
                }
            }

        },
    // To validate input field as soon as user enters
        onChange() {
            let validations = new LoginSignupValidations(
                this.name,
                this.email,
                this.password,
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
    background-image: radial-gradient(circle farthest-corner at 10% 20%, rgba(253, 101, 133, 1)0%, rgba(255, 211, 165, 1)90%);
}

.card {
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 30%);
    width: 350px;
    height: 450px;
    border-radius: 10px;
    padding: 10px 8px;
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
