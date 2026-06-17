
let supabaseUrl = "https://ppovyzzhqjgnthbcbfxd.supabase.co"
let supabaseKey = "sb_publishable_Zf7TySWJVCgD5rJlO1Cg3w__2FgmHZm"



const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey)




let signUpBtn = document.querySelector("#signup")

signUpBtn.addEventListener("click", async (event) => {
    event.preventDefault()
    let userEmail = document.querySelector("#userEmail")
    let userPass = document.querySelector("#userPass")
    console.log(userEmail.value)
    console.log(userPass.value)

    try {
        const { data, error } = await client.auth.signUp({
            email: userEmail.value,
            password: userPass.value,
        })
        console.log(data)
        console.log(error)
    }
    catch (error) {
        console.log(error)
    }



})