// Elements
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')
const openBtn = document.getElementById('openSidebar')
const closeBtn = document.getElementById('closeSidebar')
const mainContent = document.getElementById('mainContent')
const darkModeToggle = document.getElementById('toggleDarkMode')
const themeIcon = document.getElementById('themeIcon')

// Open sidebar
function openSidebar() {
    sidebar.classList.remove('-translate-x-full')
    overlay.classList.remove('hidden')
    mainContent.classList.add('ml-64')
}

// Close sidebar
function closeSidebar() {
    sidebar.classList.add('-translate-x-full')
    overlay.classList.add('hidden')
    mainContent.classList.remove('ml-64')
}

// Initialize based on width
function initSidebar() {
    if (window.innerWidth >= 1024) {
        openSidebar()
    } else {
        closeSidebar()
    }
}

openBtn.addEventListener('click', openSidebar)
closeBtn.addEventListener('click', closeSidebar)
overlay.addEventListener('click', closeSidebar)

// Dark mode toggle & persistence
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        themeIcon.classList.add('text-yellow-400')
    } else {
        document.documentElement.classList.remove('dark')
        themeIcon.classList.remove('text-yellow-400')
    }
    localStorage.setItem('theme', theme)
}

darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark')
    setTheme(isDark ? 'dark' : 'light')
})

// Apply saved theme on load
const saved = localStorage.getItem('theme')
setTheme(saved === 'dark' ? 'dark' : 'light')

// Initialize sidebar state on load
window.addEventListener('load', initSidebar)

// Optionally adjust on resize
window.addEventListener('resize', initSidebar)





// 4) Auth guard & logout
if (!localStorage.getItem('token')) location.href = '../auth/login.html';
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    location.href = '../auth/login.html';
});

// Fetch & render Enrolled Courses
fetch('https://fakestoreapi.com/products')
    .then(r => r.json())
    .then(data => {
        document.getElementById('coursesCount').textContent = `${data.length} courses enrolled`;
    });

// Fetch & render Deadlines
fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(r => r.json())
    .then(data => {
        const ul = document.getElementById('deadlines');
        data.forEach(t => {
            const li = document.createElement('li');
            li.textContent = t.title;
            ul.appendChild(li);
        });
    });

// 7) Fetch & render Progress + animate chart
fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(r => r.json())
    .then(data => {
        const completed = data.filter(t => t.completed).length;
        const total = data.length;
        const percent = Math.round((completed / total) * 100);

        // update bar & text
        document.getElementById('progressBar').style.width = percent + '%';
        document.getElementById('progressText').textContent = `${percent}% of assignments done`;

        // render Chart.js doughnut
        new Chart(
            document.getElementById('progressChart'),
            {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Pending'],
                    datasets: [{
                        data: [completed, total - completed],
                        backgroundColor: ['#4f46e5', '#e5e7eb'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    animation: { duration: 1500, easing: 'easeInOutQuart' },
                    plugins: { legend: { position: 'bottom', labels: { color: document.documentElement.classList.contains('dark') ? '#FFFFFF ' : '#FFFFFF ' }, font: document.documentElement.classList.contains('dark') ? 'font-[figtree]' : 'font-[figtree]' } }
                }
            }
        );
    });




// Fetch and render courses from Fake Store API
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loadingOverlay');
    const grid = document.getElementById('coursesGrid');

});

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(courses => {
            const grid = document.getElementById('coursesGrid');
            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
                card.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="h-60 w-full object-cover p-2 rounded shadow-md">
            <div class="p-4 flex flex-col">
              <h3 class="font-semibold font-[figtree] text-lg mb-2 uppercase text-white">${course.title}</h3>
              <h3 class="font-semibold mb-2 text-white">Course Desc:</h3>
              <p class="text-gray-600 dark:text-white text-sm font-[figtree]">${course.description.substring(0, 120)}...</p>
              <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors duration-200 text-center mt-4">
    Enroll Now
  </button>

            </div>
          `;
                grid.appendChild(card);
            });
        })
        .catch(err => console.error(err));
});


// Fetch and Render Assignments JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/todos?_limit=30')
    .then(res => res.json())
    .then(assignments => {
        const list = document.getElementById('assignmentsList');
        assignments.forEach(item => {
            const li = document.createElement('li');
            const statusColor = item.completed ? 'bg-green-200 text-green-800 hover:bg-green-400 transition duration-500 cursor-default hover:text-black' : 'bg-yellow-200 text-yellow-800 hover:bg-yellow-400 transition duration-500 cursor-default hover:text-black';
            const textStyle = item.completed ? 'line-through text-gray-200' : 'text-white';
            li.className = 'flex flex-col items-left p-4 bg-white rounded-lg shadow hover:shadow-lg transition bg-gray-800';
            li.innerHTML = `
           
            <span class="px-auto py-1 mt-3 mb-2 text-lg font-bold rounded-md font-[figtree] w-1/3 text-center ${statusColor} rounded-full">
              ${item.completed ? 'Completed' : 'Pending'}
            </span>
             <span class="font-[marcellus] text-lg rounded-md py-2 px-1 ${textStyle}">${item.title}</span>
          `;
            list.appendChild(li);
        });
    })
    .catch(err => console.error(err));



// Fetch and render user from Random User API
fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => {
        const user = data.results[0];
        const card = document.getElementById('profileCard');
        card.innerHTML = `
          <img src="${user.picture.large}" alt="Avatar" class="w-40 h-40 rounded-full border-blue-600 hover:border-blue-600 hover:border-4 transition duration-400 border-2 mx-auto mb-4">
          <h2 class="text-xl font-[marcellus] font-semibold text-center mb-2">
            ${user.name.first} ${user.name.last}
          </h2>
          <p class="text-center text-gray-500 mb-6 font-[HankenGrotesk]">${user.email}</p>
          <button id="editBtn" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition font-[figtree] text-lg font-semibold">
            Edit Profile
          </button>
          <form id="editForm" class="mt-4 hidden space-y-4 font-[figtree]">
            <input type="text" id="firstName" value="${user.name.first}"
                   class="w-full border border-gray-300 rounded p-2 text-gray-500 mt-4"/>
            <input type="text" id="lastName" value="${user.name.last}"
                   class="w-full border border-gray-300 rounded p-2 text-gray-500"/>
            <input type="email" id="emailInput" value="${user.email}"
                   class="w-full border border-gray-300 rounded p-2 text-gray-500"/>
            <button type="submit"
                    class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition">
              Save Changes
            </button>
          </form>
        `;

        document.getElementById('editBtn').addEventListener('click', () => {
            document.getElementById('editForm').classList.toggle('hidden');
        });

        document.getElementById('editForm').addEventListener('submit', e => {
            e.preventDefault();
            user.name.first = document.getElementById('firstName').value;
            user.name.last = document.getElementById('lastName').value;
            user.email = document.getElementById('emailInput').value;

            // Re-render name and email
            card.querySelector('h2').textContent = `${user.name.first} ${user.name.last}`;
            card.querySelector('p').textContent = user.email;
            document.getElementById('editForm').classList.add('hidden');
        });
    })
    .catch(err => console.error(err));



const openModalBtn = document.getElementById('profileModal');
const overModalLay = document.getElementById('profileModalOverlay');
const closeModalBtn = document.getElementById('closeProfileModal');

// Show the modal
openModalBtn.addEventListener('click', () => {
    overModalLay.classList.remove('hidden');
});

// Hide on close button click
closeModalBtn.addEventListener('click', () => {
    overModalLay.classList.add('hidden');
});

// Hide when clicking outside the modal box
overModalLay.addEventListener('click', (e) => {
    if (e.target === overModalLay) {
        overModalLay.classList.add('hidden');
    }
});


// Fetch & render Enrolled Courses
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://reqres.in/api/users/2')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(json => {
            const { first_name, last_name } = json.data;
            document.getElementById('user-name').textContent = `${first_name} ${last_name}`;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('user-name').textContent = 'Unable to load user.';
        });
});

