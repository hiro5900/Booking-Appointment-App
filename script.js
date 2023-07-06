// Function to save user data
const saveUserData = (userName, userEmail, userPhone) => {
     let info = {
          Name: userName,
          Email: userEmail,
          Phone: userPhone
     };

     let userInfo = JSON.stringify(info);

     // Save to localStorage
     localStorage.setItem(userEmail, userInfo);

     // POST request to cloud
     axios
          .post("https://crudcrud.com/api/9bb4bead3fc545949899f4bac9571d76/appointmentData", info)
          .then((response) => {
               console.log(response);
          })
          .catch((error) => {
               console.log(error);
          });
};

// Function to retrieve user data from the server
const retrieveUserData = () => {
     axios
          .get("https://crudcrud.com/api/9bb4bead3fc545949899f4bac9571d76/appointmentData")
          .then((response) => {
               console.log(response);
               for (let i = 0; i < response.data.length; i++) {
                    showOutput(response.data[i]);
               }
          })
          .catch((error) => {
               console.log(error);
          });
};

// Function to display user data
const showOutput = (userData) => {
     let user = document.createElement("li");
     let deleteBtn = document.createElement("button");
     let editBtn = document.createElement("button");

     deleteBtn.textContent = "X";
     deleteBtn.style.borderRadius = "5px";
     deleteBtn.style.backgroundColor = "#f94a4a";
     deleteBtn.style.cursor = "pointer";
     deleteBtn.className = "delete-btn";

     editBtn.textContent = "Edit";
     editBtn.style.borderRadius = "5px";
     editBtn.style.cursor = "pointer";
     editBtn.className = "edit-btn";

     user.textContent = userData.Name + " " + userData.Email + " " + userData.Phone;
     user.appendChild(editBtn);
     user.appendChild(deleteBtn);

     let users = document.getElementsByClassName("users")[0];
     users.appendChild(user);

     // Delete function
     deleteBtn.addEventListener("click", () => {
          users.removeChild(user);
          localStorage.removeItem(userData.Email);
          axios.delete(`https://crudcrud.com/api/9bb4bead3fc545949899f4bac9571d76/appointmentData/${userData._id}`)
               .then((response) => console.log(response))
               .catch((error) => console.log(error))
     });

     // Edit function
     editBtn.addEventListener("click", () => {
          users.removeChild(user);
          localStorage.removeItem(userData.Email);

          document.getElementsByClassName("user-name")[0].value = userData.Name;
          document.getElementsByClassName("user-email")[0].value = userData.Email;
          document.getElementsByClassName("user-phone")[0].value = userData.Phone;
     });
};

// Function to handle form submission
const handleFormSubmit = () => {

     let userName = document.getElementsByClassName("user-name")[0].value.trim();
     let userEmail = document.getElementsByClassName("user-email")[0].value;
     let userPhone = document.getElementsByClassName("user-phone")[0].value;

     // Check if any of the fields are empty
     if (!userName || !userEmail || !userPhone) {
          alert("Please fill in all the fields.");
          return;
     }

     saveUserData(userName, userEmail, userPhone); // Save user data
     showOutput({ Name: userName, Email: userEmail, Phone: userPhone }); // Display user data
};

// Event listener for form submission
document.getElementById("btn").addEventListener("click", handleFormSubmit);

// Event listener for page load
window.addEventListener("DOMContentLoaded", retrieveUserData);
