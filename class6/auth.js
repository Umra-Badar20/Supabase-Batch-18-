import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase_url = "https://ibdxojazwrrzgxptuzsy.supabase.co"
const publishable_key = "sb_publishable_NhRm-ZaPWKefryWGtzvAEQ_VvuidJ9U"

const supabase = createClient(supabase_url, publishable_key)


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
        

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password:password,
              })
              console.log(data);
              if(error)console.log(error);
        } catch (error) {
            console.log(error);
        }
        alert(name + " Registered Successfully")
        window.location.href = "/dashboard.html"
    }

}


async function login() {
    event.preventDefault()
    var loginEmail = document.getElementById("loginEmail").value
    var loginPass = document.getElementById("loginPass").value
   

   try {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPass,
      })
      console.log(data);
      if (error) {
        console.log(error);
      }
    
   } catch (error) {
    console.log(error);
   }
    window.location.href = "/dashboard.html"


}
function logout() {
    window.location.href = "/"
}

const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
  
    if (event === 'INITIAL_SESSION') {
      if(!session){
        alert("Create account first!")
      }
    } else if (event === 'SIGNED_IN') {
        alert("User Signed in successfully")
        location="/dashboard.html"
    }
  })
  
  // call unsubscribe to remove the callback

window.register= register
window.login = login