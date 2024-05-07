import LocalStorageModule from './localStorage.js';
import TableModule from './table.js';

export default class FormModule {


  init() {
      document.getElementById('name').addEventListener('change', this.handleChange);
      document.getElementById('alert-name').addEventListener('change', this.handleChange);
      document.getElementById('dob').addEventListener('change', this.handleChange);
      document.getElementById('email').addEventListener('change', this.handleChange);
      
      document.getElementById('employeeForm').addEventListener('submit', this.handleSubmit);
     
  }

  handleChange=(event)=> {
    if (event.target.name === "name") {
      document.getElementById('alert-name').style.display = 'none';
      document.getElementById('name').classList.remove('warning');
    }

    if (event.target.name === "dob") {
      document.getElementById('alert-date').style.display = 'none';
      document.getElementById('dob').classList.remove('warning');
    }

    if (event.target.name === "email") {
      document.getElementById('alert-email').style.display = 'none';
      document.getElementById('email').classList.remove('warning');
    }
  }

  handleSubmit=(event) =>{
    console.log(event);
    event.preventDefault();
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkboxes = document.getElementsByName('hobbies');
    const hobbies = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
  
    const isValid = this.validate(name, gender, dob, email, phone,hobbies);
    if (isValid) {
      const employee = {
        name,
        gender,
        dob,
        email,
        phone,
        hobbies  
      };
      const employeeIndex = document.getElementById('employeeIndex').value;
      const index = document.getElementById('employeeIndex');
      if (employeeIndex !== '') {
        LocalStorageModule.updateEmployee(Number(document.getElementById('employeeIndex').value), employee);
        document.getElementById('submitBtn').innerText = 'Submit';
        document.getElementById('resetBtn').style.visibility = 'hidden';
        document.getElementById('employeeIndex').value = index;
      } else {
        LocalStorageModule.addEmployee(employee);
      }
      TableModule.updateTable();
      document.getElementById('employeeForm').reset();
      document.getElementById('employeeIndex').value = '';
    } else {
      console.log('error');
    }
  }

  validate=(name, gender, dob, email)=> {
    if (!name || !gender || !dob || !email) {
      if(name === ""){
                 document.getElementById('alert-name').innerText = 'Enter Name';
                 document.getElementById('alert-name').style.display = 'inline';
                 document.getElementById('name').classList.add('warning')
               }else if(name.length<=4 || name.length>=20){
                 document.getElementById('alert-name').innerText = "Name Must be 4 to 20 characters"
                 document.getElementById('alert-name').style.display = 'inline';
               }
               else{
                document.getElementById('alert-name').style.display = 'none';
                document.getElementById('name').classList.remove('warning')
               }
        
      if(dob === ""){
                    document.getElementById('alert-date').innerText = 'Select Date';
                    document.getElementById('alert-date').style.display = 'inline';
                    document.getElementById('dob').classList.add('warning')
               }else{
                    document.getElementById('alert-date').style.display = 'none';
                    document.getElementById('dob').classList.remove('warning')
               }
        
            
       if(email === "" || !email.includes('@')){
                    document.getElementById('alert-email').innerText = 'Enter Email';
                    document.getElementById('alert-email').style.display = 'inline';
                    document.getElementById('email').classList.add('warning')
               }else{
                    document.getElementById('alert-email').style.display = 'none';
                    document.getElementById('email').classList.remove('warning')
               }
                return;
    }
            return true;
  }
}
