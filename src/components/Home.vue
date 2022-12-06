<template>
<Header></Header>
<div class="container">
    <h1>Add your task</h1>
    <form @submit.prevent="storeTask()">
    <div class="add-items">
        <div v-if="!isEditing">
            <input type="text" v-model.trim="task" placeholder="Add Task here" autocomplete="off"> 
            <button class="btn">Add Task</button>
            <div class="error" v-if="taskErr">{{taskErr}}</div>
        </div>
        
        <div v-else>
            <input type="text" v-model="task" placeholder="update Task here">
            <button class="btn" v-on:click="updateTask">Update Task</button>
        </div>
    </div>
</form>
    <!-- To display all the Task -->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="(task, index) in title">
                <td>{{(index + 1)}}</td>
                <td>{{task}}</td>
                <td>{{format_date(date)}}</td>
                <td><input type="date" name="date" id=""></td>
                <td>
                    <button v-on:click="editTask(index, task)"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                    <button v-on:click="deleteTask(index)"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import Header from './Header.vue'
import moment from 'moment';
export default {
    name: 'Home',
    components: {
        Header,
        moment
    },
    data() {
        return {
            date: new Date(),
            selectedIndex: null,
            isEditing: false,
            task: '',
            title: [],
            taskErr:''
        }
    },
    methods: {
        // To store Task
        storeTask() {
            if(!this.task){
                this.taskErr= "*This field cannot be blank"
            }

            if (this.task) {
                this.title.push(this.task)
                this.task = ''
                this.taskErr =''
            } 

        },

        //To Edit Task
        editTask(index, task) {
            this.task = task
            this.selectedIndex = index
            this.isEditing = true
        },
        //To Update Task
        updateTask() {

            this.title.splice(this.selectedIndex, 1, this.task)
            this.isEditing = false
            this.task = ''
        },
        //To Delete Task
        deleteTask(index) {
            let deteteItem = confirm("Are you sure you want to delete?");
            if (deteteItem) {
                this.title.splice(index, 1)
            }
        },
        //Format date
        format_date(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        }
    },
    // To check if user is already login
    mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({
                name: 'SignUp'
            })
        }

    }
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

.container {
    height: 100vh;
    width: 100%;
    background-image: radial-gradient(circle farthest-corner at 10% 20%, rgba(253, 101, 133, 1)0%, rgba(255, 211, 165, 1)90%);
}

h1 {
    margin: 0;
    padding: 20px;
    color: white;
}

.add-items {
    padding: 20px;
}

input[type="text"] {
    padding: 7px 70px 10px 5px;
    font-size: 16px;
    outline: none;
    border: 1px solid aquamarine;
    margin-right: 20px;
    border-radius: 5px;
}

input[type="date"] {
    outline: none;
    border: none;
    padding: 7px;
    background: none;
}

.btn {
    padding: 10px 10px 10px 5px;
    margin-right: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 14px;
    background-color: #ffc1a0;
    color: #2c3e50;
}

.btn:hover {
    background: burlywood;
    color: white;
}

button {
    background: none;
    outline: none;
    border: none;
    margin-right: 5px;
}

table {
    width: 100%;
}
.error {
    text-align: start;
    color: red;
    font-size: 14px;
    text-align: center;
    margin: 5px 180px 10px 0;
}
</style>
