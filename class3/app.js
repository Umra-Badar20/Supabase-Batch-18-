// import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
var supabase = window.supabase.createClient('https://ibdxojazwrrzgxptuzsy.supabase.co', 'sb_publishable_NhRm-ZaPWKefryWGtzvAEQ_VvuidJ9U')

window.onload = async function () {
  try {
    const { data, error } = await supabase.from('My Posts').select("*").order('id', { ascending: false })
    console.log(data);
    data.forEach(post => {
      // console.log(post.title);
      var posts = document.getElementById("posts")
      posts.innerHTML += `
      <div class="card mb-2">
               <div class="card-header">${post.id} ~Post</div>
               <div style="background-image:url(${post.bg_img})" class="card-body">
                 <figure>
                   <blockquote class="blockquote">
                     <p>
                       ${post.title}
                     </p>
                   </blockquote>
                   <figcaption class="blockquote-footer">
                     ${post.description}
                   </figcaption>
                 </figure>
               </div>
               <div class="ms-auto m-2">
               <button onclick="editPost()" class="btn btn-success">Edit</button>
               <button onclick="deletePost()" class="btn btn-danger">Delete</button>
               </div>
             </div>
     `
      if (error) console.log(error)

    });
  } catch (error) {
    console.log(error);
  }
}
var cardBg
function deletePost() {
  var card = event.target.parentNode.parentNode
  card.remove()
}
function editPost() {
  var card = event.target.parentNode.parentNode
  var title = card.children[1].children[0].children[0].children[0].innerText
  var description = card.children[1].children[0].children[1].innerText
  document.getElementById("title").value = title
  document.getElementById("description").value = description
  card.remove()
  console.log(title, description);
}
async function post() {
  var title = document.getElementById("title")
  var description = document.getElementById("description")
  console.log(title.value, description.value);
  var posts = document.getElementById("posts")


  if (title.value.trim() && description.value.trim()) {

    try {
      const { data, error } = await supabase
        .from('My Posts')
        .insert({ title: title.value, description: description.value, bg_img: cardBg })
        .select()
      console.log(data);
      if (error) console.log(error)
    } catch (error) {
      console.log(error);
    }

    posts.innerHTML += `
     <div class="card mb-2">
              <div class="card-header">~Post</div>
              <div style="background-image:url(${cardBg})" class="card-body">
                <figure>
                  <blockquote class="blockquote">
                    <p>
                      ${title.value}
                    </p>
                  </blockquote>
                  <figcaption class="blockquote-footer">
                    ${description.value}
                  </figcaption>
                </figure>
              </div>
              <div class="ms-auto m-2">
              <button onclick="editPost()" class="btn btn-success">Edit</button>
              <button onclick="deletePost()" class="btn btn-danger">Delete</button>
              </div>
            </div>
    `
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Title & description can't be empty!",
    });
  }
  title.value = ""
  description.value = ""
}
function selectImg(src) {
  cardBg = src
  console.log(src, event.target.classList);
  // event.target.className += " selectedImg"
  var bgImg = document.getElementsByClassName("bgImg")
  for (var i = 0; i < bgImg.length; i++) {
    console.log(bgImg[i].className);
    bgImg[i].className = "bgImg"
  }
  event.target.classList.add("selectedImg")
}