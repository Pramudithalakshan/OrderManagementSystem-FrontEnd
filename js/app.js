function addCustomerDetails() {
    let customerId = document.getElementById('customerId').value;
    let customerFirstName = document.getElementById('customerFirstName').value;
    let customerLastName = document.getElementById('customerLastName').value;
    let customerPhone = document.getElementById('customerPhone').value;
    let customerAddress = document.getElementById('customerAddress').value;
    let customerCity = document.getElementById('customerCity').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const customer = JSON.stringify({
        "customerId": customerId,
        "firstName": customerFirstName,
        "lastName": customerLastName,
        "phoneNumber": customerPhone,
        "city": customerCity,
        "address": customerAddress
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: customer,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/add-customer-details", requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            swal("Success", result || "Customer added successfully", "success");
        })
        .catch((error) => console.error(error));
        resetDetails();
}

function resetDetails() {
     document.getElementById('customerId').value="";
     document.getElementById('customerFirstName').value="";
     document.getElementById('customerLastName').value="";
     document.getElementById('customerPhone').value="";
     document.getElementById('customerAddress').value="";
     document.getElementById('customerCity').value="";
}