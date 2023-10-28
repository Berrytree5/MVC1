// Function to edit a blog post from the individual blog post page
const editPost = async (event) => {
  event.preventDefault();

  // Get the blog post ID from the URL
  const blogPostId = window.location.pathname.split("/")[2];

  // Redirect to the /create/:id page with the blog post ID
  document.location.assign(`/create/${blogPostId}`);
};

// Attach event listeners to edit buttons
const editButtons = document.querySelectorAll("#editBtn");
editButtons.forEach((button) => {
  button.addEventListener("click", editPost);
});
