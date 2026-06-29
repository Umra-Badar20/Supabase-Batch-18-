// import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
var supabase = window.supabase.createClient('https://ibdxojazwrrzgxptuzsy.supabase.co', 'sb_publishable_NhRm-ZaPWKefryWGtzvAEQ_VvuidJ9U')

let edited = false;
let idindex = null;

async function searchPosts(){
  let searchInput = document.getElementById("searchInput").value
  console.log(searchInput);
  try {
  //   const { data, error } = await supabase
  // .from('My Posts')
  // .select("*").order('id', { ascending: false })
  // .ilike('title', `%${searchInput}%`)

  const { data, error } = await supabase
  .from('My Posts')
  .select('*')
  .or(`title.ilike.%${searchInput}%,description.ilike.%${searchInput}%`)

  var posts = document.getElementById("posts")
  posts.innerHTML = ""
  data.forEach(post => {
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
             <button onclick="editPost(event,${post.id},'${post.description}','${post.title}','${post.bg_img}')" class="btn btn-success">Edit</button>
             <button onclick="deletePost(event,${post.id})" class="btn btn-danger">Delete</button>
             </div>
           </div>
   `})

  console.log(data);
  if(!data.length){
    posts.innerHTML= "No posts Found"
  }

  if(error) console.log(error);
  } catch (error) {
    console.log(error);
  }

}


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
               <button onclick="editPost(event,${post.id},'${post.description}','${post.title}','${post.bg_img}')" class="btn btn-success">Edit</button>
               <button onclick="deletePost(event,${post.id})" class="btn btn-danger">Delete</button>
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
async function deletePost(event, id) {
  console.log(event, id);
  try {
    const { data, error } = await supabase
      .from('My Posts')
      .delete()
      .eq('id', id)
    if (error) console.log(error);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
  var card = event.target.parentNode.parentNode
  card.remove()
}
function editPost(event, id, desc, title, bg_img) {
  console.log(title, desc, id);
  document.getElementById("title").value = title
  document.getElementById("description").value = desc
  console.log(title, description);
  var card = event.target.parentNode.parentNode
  card.remove()
  edited = true;
  idindex = id;
  let postBtn = document.getElementById("postBtn")
  postBtn.innerHTML = "Update Post"
}
async function post() {
  var title = document.getElementById("title")
  var description = document.getElementById("description")
  console.log(title.value, description.value);
  var posts = document.getElementById("posts")


  if (title.value.trim() && description.value.trim()) {
    if (edited) {
      try {
        const { data, error } = await supabase
          .from('My Posts')
          .update({ title: title.value, description: description.value, bg_img: cardBg })
          .eq('id', idindex)
          .select()
        console.log(data);
        if (error) {
          console.log(error);
        }
        edited=false
        idindex=null
        let postBtn = document.getElementById("postBtn")
  postBtn.innerHTML = "Post"

      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        const { data, error } = await supabase
          .from('My Posts')
          .insert({ title: title.value, description: description.value, bg_img: cardBg })
          .select()
        console.log("Post data", data);
        if (error) console.log(error)
      } catch (error) {
        console.log(error);
      }
    }

   location.reload()
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