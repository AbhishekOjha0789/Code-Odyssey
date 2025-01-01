//sidebar
const menuItems = document.querySelectorAll('.menu-item');
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
 

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display='none';
        }
    })
})


document.addEventListener("DOMContentLoaded", function () {
    // Select the elements
    const messageSearch = document.getElementById("message-search");
    const categoryElements = document.querySelectorAll(".category h6");
    const messageList = document.getElementById("message-list");
    const chatWindow = document.getElementById("chat-window");
    const chatUsername = document.getElementById("chat-username");
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageButton = document.getElementById("send-message");
    const backButton = document.getElementById("back-button");

    // Sample data to display in messages (with requests and new messages)
    const messagesData = [
        { id: 1, name: "Kareena Joshua", text: "Just woke up bruh..", newMessages: 0, imgSrc: "images/profile-17.jpg", category: "primary" },
        { id: 2, name: "Dan Smith", text: "2 New Messages", newMessages: 2, imgSrc: "images/profile-18.jpg", category: "primary" },
        { id: 3, name: "Chris Brown", text: "Lol u right", newMessages: 0, imgSrc: "images/profile-15.jpg", category: "general" },
        { id: 4, name: "Lana Rose", text: "Birthday tomorrow!!", newMessages: 1, imgSrc: "images/profile-14.jpg", category: "general" },
        { id: 5, name: "Varun Nair", text: "Ssup?", newMessages: 0, imgSrc: "images/profile-11.jpg", category: "primary" },
        { id: 6, name: "Jahnvi Doifode", text: "3 New Messages", newMessages: 3, imgSrc: "images/profile-1.jpg", category: "requests" },
    ];

    // Function to render messages dynamically
    function renderMessages(messages) {
        messageList.innerHTML = "";
        messages.forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.setAttribute("data-id", message.id); // Store ID for later use

            messageElement.innerHTML = `
                <div class="profile-pic">
                    <img src="${message.imgSrc}" alt="${message.name}">
                    ${message.newMessages > 0 ? '<div class="active"></div>' : ''}
                </div>
                <div class="message-body">
                    <h5>${message.name}</h5>
                    <p class="${message.newMessages > 0 ? 'text-bold' : 'text-muted'}">${message.text}</p>
                </div>
            `;
            messageList.appendChild(messageElement);
        });
    }

    // Render all messages initially
    renderMessages(messagesData);

    // Filter messages based on search input
    messageSearch.addEventListener("input", function () {
        const query = messageSearch.value.toLowerCase();
        const filteredMessages = messagesData.filter(message => 
            message.name.toLowerCase().includes(query) || message.text.toLowerCase().includes(query)
        );
        renderMessages(filteredMessages);
    });

    // Category switching
    categoryElements.forEach(element => {
        element.addEventListener("click", function () {
            categoryElements.forEach(cat => cat.classList.remove("active"));
            element.classList.add("active");

            // Filter or display messages based on category
            const category = element.getAttribute("data-category");
            const filteredMessages = messagesData.filter(message => message.category === category);
            renderMessages(filteredMessages);
        });
    });

    // Open Chat on message click
    messageList.addEventListener("click", function (e) {
        const messageElement = e.target.closest(".message");
        if (messageElement) {
            const messageId = messageElement.getAttribute("data-id");
            const message = messagesData.find(msg => msg.id == messageId);

            if (message) {
                // Show chat window with selected message
                chatWindow.classList.add("active");
                chatUsername.textContent = message.name;
                // Clear previous chat messages and show new messages
                chatMessages.innerHTML = `<div class="chat-message">
                    <span><strong>${message.name}:</strong> ${message.text}</span>
                </div>`;
            }
        }
    });

    // Send message functionality
    sendMessageButton.addEventListener("click", function () {
        const newMessageText = messageInput.value.trim();
        if (newMessageText) {
            const newMessageElement = document.createElement("div");
            newMessageElement.classList.add("chat-message");
            newMessageElement.innerHTML = `<span><strong>You:</strong> ${newMessageText}</span>`;
            chatMessages.appendChild(newMessageElement);

            // Clear the input field
            messageInput.value = "";

            // Scroll to the bottom of the chat window
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    // Back button functionality to close chat window
    backButton.addEventListener("click", function () {
        chatWindow.classList.remove("active");
    });
});

// JavaScript for handling the theme color change
document.addEventListener("DOMContentLoaded", function () {
    // Get all the color options
    const colorOptions = document.querySelectorAll('.color-option');

    // Loop through each color option and add a click event listener
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Get the selected color
            const selectedColor = option.getAttribute('data-color');
            
            // Change the CSS variables dynamically
            switch (selectedColor) {
                case 'red':
                    document.documentElement.style.setProperty('--color-primary', 'red');
                    break;
                case 'blue':
                    document.documentElement.style.setProperty('--color-primary', 'blue');
                    break;
                case 'green':
                    document.documentElement.style.setProperty('--color-primary', 'green');
                    break;
                case 'purple':
                    document.documentElement.style.setProperty('--color-primary', 'purple');
                    break;
                case 'orange':
                    document.documentElement.style.setProperty('--color-primary', 'orange');
                    break;
                case 'pink':
                    document.documentElement.style.setProperty('--color-primary', 'pink');
                    break;
            }
        });
    });
});
// JavaScript for handling the functionalities
document.addEventListener("DOMContentLoaded", function () {

    // Profile Image Upload
    const profileUpload = document.getElementById('profile-upload');
    const profilePic = document.getElementById('profile-pic');

    profileUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            profilePic.src = reader.result;
        };
        reader.readAsDataURL(file);
    });

    // Font Size Change
    const fontSizeSelect = document.getElementById('font-size');
    fontSizeSelect.addEventListener('change', function () {
        document.documentElement.style.setProperty('--font-size', fontSizeSelect.value);
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode');
    darkModeToggle.addEventListener('change', function () {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    // Profile Visibility
    const visibilitySelect = document.getElementById('profile-visibility');
    visibilitySelect.addEventListener('change', function () {
        const visibility = visibilitySelect.value;
        // Handle the visibility logic (e.g., change profile privacy settings)
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Get the Create Button and File Input
    const createBtn = document.getElementById('create-btn');
    const fileInput = document.getElementById('file-input');
    const uploadedMediaSection = document.getElementById('uploaded-media');

    // Open file dialog when Create Button is clicked
    createBtn.addEventListener('click', function () {
        fileInput.click(); // Triggers the file input dialog
    });

    // Handle file upload
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const fileType = file.type;

            // Create a container to display the uploaded media
            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('media-container');
            
            // If the file is an image
            if (fileType.startsWith('image')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file); // Create an object URL for the image
                img.alt = "Uploaded Image";
                img.classList.add('uploaded-img');
                mediaContainer.appendChild(img);
            }

            // If the file is a video
            else if (fileType.startsWith('video')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file); // Create an object URL for the video
                video.controls = true; // Enable controls for the video
                video.classList.add('uploaded-video');
                mediaContainer.appendChild(video);
            }

            // Append the media container to the uploaded media section
            uploadedMediaSection.appendChild(mediaContainer);
        }
    });
});
