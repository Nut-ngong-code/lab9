const postsTitle = document.querySelector('.posts-title');
const comment = document.getElementById('comments');
const userName = document.getElementById('user-name');
const postsList = document.getElementById('posts-list');

// ดึงค่า id จาก URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

if (userId) {
    Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(response => response.json()),
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(response => response.json())
    ])
    .then(([userData, postsData]) => {
        console.log(userData);
        console.log(postsData);

        userName.textContent = userData.name;
        postsData.forEach((post) => {
            const posts = document.createElement("div");
            posts.innerHTML = `
                <div class="posts">
                    <h4>${post.title}</h4>
                    <p>${post.body}</p>
                    <button id="view-posts-${post.id}" onclick="toggleComments(${post.id})" class="view-comment-btn">ดูความคิดเห็น</button>
                    <div id="comments-${post.id}" class="comments" style="display: none;"></div>
                </div>`;
            postsList.appendChild(posts);
        });
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
    });
}

function toggleComments(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    const button = document.getElementById(`view-posts-${postId}`);

    if (commentsContainer.style.display === "none") {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => response.json())
            .then((commentsData) => {
                commentsContainer.innerHTML = '';
                commentsData.forEach((commentData) => {
                    const commentElement = document.createElement("div");
                    commentElement.innerHTML = `
                        <hr>
                        <div class="comment">
                            <h4>${commentData.email}</h4>
                            <p>${commentData.body}</p>
                        </div>`;
                    commentsContainer.appendChild(commentElement);
                });
                commentsContainer.style.display = "block";
                button.textContent = "ซ่อนความคิดเห็น";
            })
            .catch((error) => {
                console.error("Error fetching comments data:", error);
            });
    } else {
        commentsContainer.style.display = "none";
        button.textContent = "ดูความคิดเห็น";
    }
}