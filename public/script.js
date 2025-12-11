// API base URL
const API_URL = '/api/employees';

// DOM Elements
const employeeForm = document.getElementById('employeeForm');
const employeeIdInput = document.getElementById('employeeId');
const nameInput = document.getElementById('name');
const roleInput = document.getElementById('role');
const salaryInput = document.getElementById('salary');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const employeesList = document.getElementById('employeesList');
const messageDiv = document.getElementById('message');

// Load employees when page loads
document.addEventListener('DOMContentLoaded', fetchEmployees);

// Form submission event
employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employeeData = {
        name: nameInput.value,
        role: roleInput.value,
        salary: parseFloat(salaryInput.value)
    };
    
    const employeeId = employeeIdInput.value;
    
    if (employeeId) {
        // Update existing employee
        await updateEmployee(employeeId, employeeData);
    } else {
        // Create new employee
        await createEmployee(employeeData);
    }
});

// Cancel edit button event
cancelBtn.addEventListener('click', () => {
    resetForm();
});

// Fetch all employees
async function fetchEmployees() {
    try {
        const response = await fetch(API_URL);
        const employees = await response.json();
        
        // Clear the table
        employeesList.innerHTML = '';
        
        // Add each employee to the table
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.role}</td>
                <td>$${employee.salary.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee('${employee._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee('${employee._id}')">Delete</button>
                </td>
            `;
            employeesList.appendChild(row);
        });
    } catch (error) {
        showMessage('Error fetching employees: ' + error.message, 'error');
    }
}

// Create a new employee
async function createEmployee(employeeData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });
        
        if (response.ok) {
            const newEmployee = await response.json();
            showMessage('Employee created successfully!', 'success');
            resetForm();
            fetchEmployees(); // Refresh the list
        } else {
            const error = await response.json();
            showMessage('Error creating employee: ' + error.message, 'error');
        }
    } catch (error) {
        showMessage('Error creating employee: ' + error.message, 'error');
    }
}

// Update an existing employee
async function updateEmployee(id, employeeData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });
        
        if (response.ok) {
            const updatedEmployee = await response.json();
            showMessage('Employee updated successfully!', 'success');
            resetForm();
            fetchEmployees(); // Refresh the list
        } else {
            const error = await response.json();
            showMessage('Error updating employee: ' + error.message, 'error');
        }
    } catch (error) {
        showMessage('Error updating employee: ' + error.message, 'error');
    }
}

// Delete an employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Employee deleted successfully!', 'success');
            fetchEmployees(); // Refresh the list
        } else {
            const error = await response.json();
            showMessage('Error deleting employee: ' + error.message, 'error');
        }
    } catch (error) {
        showMessage('Error deleting employee: ' + error.message, 'error');
    }
}

// Edit an employee (populate form)
async function editEmployee(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
            const employee = await response.json();
            
            // Populate form with employee data
            employeeIdInput.value = employee._id;
            nameInput.value = employee.name;
            roleInput.value = employee.role;
            salaryInput.value = employee.salary;
            
            // Change button text and show cancel button
            saveBtn.textContent = 'Update Employee';
            cancelBtn.classList.remove('hidden');
        } else {
            const error = await response.json();
            showMessage('Error fetching employee: ' + error.message, 'error');
        }
    } catch (error) {
        showMessage('Error fetching employee: ' + error.message, 'error');
    }
}

// Reset form to initial state
function resetForm() {
    employeeForm.reset();
    employeeIdInput.value = '';
    saveBtn.textContent = 'Save Employee';
    cancelBtn.classList.add('hidden');
}

// Show message to user
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}