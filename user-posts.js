const postsTitle = document.querySelector('.posts-title');
const userName = document.getElementById('user-name');
const postsList = document.getElementById('posts-list');

// ดึงค่า id จาก URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

if (userId) {
    Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => response.json()),
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((response) => response.json())
    ])
    .then(([userData, postsData]) => {
        console.log(userData);
        console.log(postsData);

        userName.textContent = userData.name;
        postsData.forEach((post) => {
            const posts = document.createElement('div');
            posts.innerHTML = `
            <div class="posts">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <button id="view-posts" class="view-comment-btn">ดูความคิดเห็น</button>
            </div>`;
            postsList.appendChild(posts);
        });
    });
}