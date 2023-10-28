// Function to delete a blog post 
const deletePostHandler = async (event) => {
  event.preventDefault();
  const blogPostId = event.target.getAttribute("data-id");

  try {
    const response = await fetch(`/api/blogPost/${blogPostId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.assign(`dashboard`);
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting the blog post.");
  }
};

// Function to edit a blog post 
const editBlogPost = (event) => {
  event.preventDefault();
  const blogPostId = event.target.getAttribute("data-id");
  document.location.assign(`/create/${blogPostId}`);
};

// Attach event listeners to edit buttons
const editButtons = document.querySelectorAll("#editBtn");
editButtons.forEach((button) => {
  button.addEventListener("click", editBlogPost);
});

// Attach event listeners to delete buttons
const deleteButtons = document.querySelectorAll("#deleteBtn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deletePostHandler);
});
