import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase_url = "https://ibdxojazwrrzgxptuzsy.supabase.co"
const publishable_key = "sb_publishable_NhRm-ZaPWKefryWGtzvAEQ_VvuidJ9U"

const supabase = createClient(supabase_url, publishable_key)
console.log(supabase);


async function register() {
    event.preventDefault()
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var password = document.getElementById("password").value
    var cpassword = document.getElementById("cpassword").value

    if (!name) {
        alert("Name is required")
    } else if (password !== cpassword) {
        alert("Passwords should be identical")
    } else {
        // localStorage.setItem("data",JSON.stringify(data))
        try {
            const { data, error } = await supabase.auth.signUp({ email, password })
            console.log(data);
            if(error)console.log(error);

        } catch (error) {
            console.log(error);
        } 
        alert(name + " Registered Successfully")
        // window.location.href = "/dashboard.html"
    }

}
// function renderData(){

//     var getData = JSON.parse(localStorage.getItem("data"))
//     // console.log(getData);
//    var displayData = document.getElementById("displayData")
//    displayData.innerHTML=`
//       <li> Name: ${getData.name}</li>
//       <li> Email: ${getData.email}</li>
//       <li> Phone: ${getData.phone}</li>
//    `
// }
// renderData()

async function login() {
    event.preventDefault()
    var loginEmail = document.getElementById("loginEmail").value
    var loginPass = document.getElementById("loginPass").value
    // var getData = JSON.parse(localStorage.getItem("data"))
    // console.log(loginEmail,getData.email, loginPass,getData.password);
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPass,
          })
          console.log(data);
          
          if(error){
            console.log(error);
            alert(error.message)
          }else{
            alert("Login Successful")
          }

    } catch (error) {
        console.log(error);
    }
    
    // window.location.href = "/dashboard.html"


}
function logout() {
    window.location.href = "/"
}

window.register= register
window.login = login