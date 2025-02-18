const userDetail = document.getElementById("user-detail");

// ดึงค่า id จาก URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

if (userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      // แสงงข้อมูล userDetail
      // console.log(data);
      userDetail.innerHTML = `
        <div class="user-list user-detail">
                <h3>${data.name}</h3>
                <h4 class="mb-0">อีกเมล</h4>
                <p class="mt-0">${data.email}</p>
                <h4 class="mb-0">ชื่อผู้ใช้</h4>
                <p class="mt-0">${data.username}</p>
                <h4 class="mb-0">เบอร์โทรศัทพ์</h4>
                <p class="mt-0">${data.phone}</p>
                <h4 class="mb-0">เว็บไซต์</h4>
                <p class="mt-0">${data.website}</p>
                <h4 class="mb-0">ที่อยู่</h4>
                <p class="mt-0 mb-0">${data.address.street}, ${data.address.suite}</p>
                <p class="mt-0">${data.address.city}, ${data.address.zipcode}</p>
                <h4 class="mb-0">บริษัท</h4>
                <p class="mt-0 mb-0">${data.company.name}</p>
                <p class="mt-0">${data.company.catchPhrase}</p>
        </div>
        <a href="user-posts.html?userId=${data.id}" class="text-none-underlined">
            <button id="view-posts" class="view-posts-btn">ดูโพสต์ทั้งหมด</button>
        </a>`;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}
