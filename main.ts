#! /usr/bin/env node
import inquirer from "inquirer";

class student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = []; 
        this.balance = 100;
    }

    enroll_course(course: string){
        this.courses.push(course);

    }

    view_balance(){
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    pay_fees(amount:number){
        this.balance -= amount;
        console.log(`$${amount} Fees Paid Successfully for ${this.name}`);

    }
    show_status(){
        console.log(` ID: ${this.id}`);
        console.log(`Name:${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance:${this.balance}`);

        }

}

class Student_Manager{
    students: student[]

    constructor(){
        this.students= [];
    
}
    add_student(name: string){
        let Student = new student(name);
        this.students.push(Student);
        console.log(`Student: ${name} added successfully, Student ID: ${Student.id}`);

}
    enroll_student(student_id: number, course: string){
        let student = this.find_student(student_id)
        if(student){
        student.enroll_course(course);
        console.log(`${student} enrolled in ${course} successfully`)
    }

}
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if(student){
        student.view_balance();
    }
    else{
        console.log("Student not found. Please enter a correct student ID")
    }

}
 
    pay_student_fee(student_id:number, amount: number){
        let student = this.find_student(student_id);
     if(student){
        student.pay_fees(amount);
    }
    else{
        console.log("Student not found. Please enter a correct student ID")
    }

}
    show_student_status(student_id:number){
        let student = this.find_student(student_id);
    if(student){
        student.show_status();
    }
}

    find_student(student_id:number){

        return this.students.find(std=> std.id ===student_id );
    }
}
async function main(){
    console.log("-".repeat(50));
    console.log("Welcome to 'Code With Rabia' - Student Management System");
    console.log("-".repeat(50));

    let student_manager= new Student_Manager();

    while(true){
        let choice= await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        switch(choice.choice){
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
        
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type:"number",
                        message: "Enter a Student ID",
                    },
                    {
                        name:"course",
                        type:" input",
                        message: " Enter a Course Name"
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course0);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Studen ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break; 
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the Amount to pay",
            
                    }
                ]);
                student_manager.pay_student_fee(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"

                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case  "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
    
}    
main();