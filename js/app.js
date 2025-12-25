function addCustomerDetails() {
    let customerId = document.getElementById('customerId').value;
    let customerFirstName = document.getElementById('customerFirstName').value;
    let customerLastName = document.getElementById('customerLastName').value;
    let customerPhone = document.getElementById('customerPhone').value;
    let customerCity = document.getElementById('customerCity').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const customer = JSON.stringify({
        "id": customerId,
        "first_name": customerFirstName,
        "last_name": customerLastName,
        "phone_number": customerPhone,
        "city": customerCity,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: customer,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/customer/add-customer", requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            swal("Success", result || "Customer added successfully", "success");
        })
        .catch((error) => console.error(error));
        resetDetails();
        getCustomers();
}

function resetDetails() {
     document.getElementById('customerId').value="";
     document.getElementById('customerFirstName').value="";
     document.getElementById('customerLastName').value="";
     document.getElementById('customerPhone').value="";
     document.getElementById('customerCity').value="";
}
 
function getCustomers() {
    fetch("http://localhost:8080/customer/get-customer")
        .then(res => res.json())
        .then(customers => {

            let body = document.getElementById("customersTableBody");
            body.innerHTML = ""; 

            customers.forEach((customer, i) => {
                body.innerHTML += `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.first_name}</td>
                        <td>${customer.last_name}</td>
                        <td>${customer.phone_number}</td>
                        <td>${customer.city}</td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error(err);
        });
}

window.onload = function() {
    let table = document.getElementById("customersTableBody");
    if(table) getCustomers();
};