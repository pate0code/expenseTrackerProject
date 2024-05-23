let expenses = [];
let editIndex = null; // Keep track of the index of the expense being edited

// Function to calculate total expenses and display on dashboard
function calculateTotalExpenses() {
    const totalExpensesElement = document.getElementById('total-expenses');
    const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
}

// Function to add expense to the list
function addExpenseToList(expense) {
    const expensesList = document.getElementById('expenses');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>Date: ${expense.date}</span>
        <span>Category: ${expense.category}</span>
        <span>Description: ${expense.description}</span>
        <span>Amount: $${expense.amount}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    expensesList.appendChild(li);
}

// Function to handle form submission and add new expense
function handleFormSubmission(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    if (!date || !category || !description || !amount) {
        alert('Please fill in all fields.');
        return;
    }

    const newExpense = { date, category, description, amount };

    if (editIndex !== null) {
        expenses[editIndex] = newExpense; // Update the expense being edited
        refreshExpensesList(); // Refresh the list
        editIndex = null; // Reset editIndex
    } else {
        expenses.push(newExpense);
        addExpenseToList(newExpense);
    }

    calculateTotalExpenses();
    document.getElementById('add-expense-form').reset();
}

// Function to refresh the entire expense list (useful after editing)
function refreshExpensesList() {
    const expensesList = document.getElementById('expenses');
    expensesList.innerHTML = '';
    expenses.forEach(expense => addExpenseToList(expense));
}

// Function to handle edit button click
function handleEditExpense(event) {
    if (event.target.classList.contains('edit-btn')) {
        const listItem = event.target.parentElement;
        const index = Array.from(listItem.parentElement.children).indexOf(listItem);
        const editedExpense = expenses[index];

        document.getElementById('date').value = editedExpense.date;
        document.getElementById('category').value = editedExpense.category;
        document.getElementById('description').value = editedExpense.description;
        document.getElementById('amount').value = editedExpense.amount;

        listItem.remove();
        editIndex = index; // Set the index of the expense being edited

        event.stopPropagation();
    }
}

// Function to handle delete button click
function handleDeleteExpense(event) {
    if (event.target.classList.contains('delete-btn')) {
        const listItem = event.target.parentElement;
        const index = Array.from(listItem.parentElement.children).indexOf(listItem);

        listItem.remove();
        expenses.splice(index, 1);

        calculateTotalExpenses();

        event.stopPropagation();
    }
}


// Function to handle navigation links
function handleNavLinks(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Prevent default link behavior
        const pageId = event.target.getAttribute('href').substring(1);
        switchPage(pageId);
    }
}

// Function to switch between pages
function switchPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

// Add event listener to document for navigation links
document.addEventListener('click', handleNavLinks);

// Add event listener to expense form for form submission
document.getElementById('add-expense-form').addEventListener('submit', handleFormSubmission);

// Add event listener to expense list for edit and delete buttons
document.getElementById('expenses').addEventListener('click', handleEditExpense);
document.getElementById('expenses').addEventListener('click', handleDeleteExpense);
