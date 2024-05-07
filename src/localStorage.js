export default class LocalStorageModule {
  static addEmployee(employee) {
    const employees = this.getEmployees();
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
  }

  static getEmployees() {
    return JSON.parse(localStorage.getItem('employees')) || [];
  }

  static deleteEmployee(index) {
    const del = confirm('Are you sure to delete data ?');
    if (del) {
      const employees = this.getEmployees();
      employees.splice(index, 1);
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }

  static updateEmployee(index, updatedEmployee) {
    const employees = this.getEmployees();
    employees.splice(index, 1, updatedEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
   
  }
}
