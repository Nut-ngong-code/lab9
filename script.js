const userList = document.getElementById("user-list");

fetch("https://jsonplaceholder.typicode.com/users")
  // แปลงข้อมูลที่ได้เป็น JSON เป็น JavaScript Object ด้วย .json()
  .then((response) => response.json())
  // ข้อมูลอยู่ใน data ทำอะไรต่อกับข้อมูลที่ได้
  .then((data) => {
    data.forEach((post) => {
      console.log(post);
      const postElement = document.createElement("p");
      // postElement.textContent = `${post.name} (${post.email})`;
      postElement.innerHTML = `
            <a href = "user-detail.html?id=${post.id}" class="text-none-underlined">
            <div class="user-list">
                <h3>${post.name}</h3>
                <p>${post.email}</p>
            </div>
            </a>
            `;

      userList.appendChild(postElement);
    });
  })
  .catch((error) => {
    console.error("Error fecthing data:", error);
  });
