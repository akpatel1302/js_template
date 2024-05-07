import LocalStorageModule from './localStorage.js';

export default class TableModule {
  constructor(){
        this.store
      }
  static updateTable() {
    this.store = new TableModule();
    const employees = LocalStorageModule.getEmployees();
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';

    employees.forEach((employee, index) => {
      const newRow = document.createElement('tr');
      
      const fields = ['name', 'gender', 'dob', 'email', 'phone', 'hobbies'];
      fields.forEach(field => {
        const td = document.createElement('td');
        td.textContent = field === 'hobbies' ? employee[field].join(', ') : employee[field];
  
        newRow.appendChild(td);
      });

      const actionTd = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.classList.add('editBtn');
      editButton.dataset.index = index;
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', this.store.handleEdit);
      actionTd.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('deleteBtn');
      deleteButton.dataset.index = index;
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', this.store.handleDelete);
      actionTd.appendChild(deleteButton);

      newRow.appendChild(actionTd);

      // Append new row in table
      tableBody.appendChild(newRow);
    });
  }

  handleDelete(event) {
    const index = event.target.dataset.index;
    LocalStorageModule.deleteEmployee(index);
    TableModule.updateTable();
  }

  handleEdit(event) {
    const index = event.target.dataset.index;
    const employees = LocalStorageModule.getEmployees();
    const employee = employees[index];
    const form = document.getElementById('employeeForm');

    form.reset();
    document.getElementById('name').value = employee.name;
    document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;
    document.getElementById('dob').value = employee.dob;
    document.getElementById('email').value = employee.email;
    document.getElementById('phone').value = employee.phone || '';
    employee.hobbies.forEach((hobby) => {
      document.getElementById(hobby).checked = true;
    });
    document.getElementById('employeeIndex').value = index;
    document.getElementById('submitBtn').innerText = 'Update';
    document.getElementById('resetBtn').style.visibility = 'visible';
  }
}
