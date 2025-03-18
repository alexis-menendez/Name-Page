// file path: assets/js/transition.js

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('#circle h1'); 
    const gradientBox = document.getElementById('gradient-box');
    const starsContainer = document.getElementById('stars-container');
    const circle = document.getElementById('circle');
    const extraFooter = document.getElementById('extra-footer'); 
    const topBanner = document.getElementById('top-banner'); 

    nameElement.addEventListener('click', () => {
        // Fade out existing elements
        gradientBox.style.transition = 'opacity 1s ease-out';
        starsContainer.style.transition = 'opacity 1s ease-out';
        circle.style.transition = 'opacity 1s ease-out';
        nameElement.style.transition = 'opacity 1s ease-out';
        extraFooter.style.transition = 'opacity 1s ease-out';
        topBanner.style.transition = 'opacity 1s ease-out';

        gradientBox.style.opacity = '0';
        starsContainer.style.opacity = '0';
        circle.style.opacity = '0';
        nameElement.style.opacity = '0';
        extraFooter.style.opacity = '0';
        topBanner.style.opacity = '0';

        // Wait for fade-out to complete, then load new content
        setTimeout(() => {
            gradientBox.style.display = 'none';
            loadNewPageContent();
        }, 1000); // 1-second delay to match fade-out
    });
});

function loadNewPageContent() {
    // Clear the existing content
    document.getElementById('top-banner').style.display = 'none';
    document.getElementById('gradient-box').style.display = 'none';
    document.getElementById('extra-footer').style.display = 'none';

    // debug: load new content instead of just loading blank screen
    // Create a container for the new content
    const appContainer = document.createElement('div');
    appContainer.id = 'app-container';

    // Create header
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="navbar">
            <h1 class="logo">Alex Menendez</h1>
            <nav>
                <ul>
                    <li id="about">ABOUT</li>
                    <li id="portfolio">PORTFOLIO</li>
                    <li id="contact">CONTACT</li>
                    <li id="resume">RESUME</li>
                </ul>
            </nav>
        </div>
    `;

    // Create the main content section
    const mainContent = document.createElement('section');
    mainContent.id = 'content';
    mainContent.innerHTML = `
        <div class="portfolio-grid">
            <div class="portfolio-item">
                <img src="project1.jpg" alt="Project 1">
                <h2>Meal Muse</h2>
                <p>Meal Muse is a meal planning companion, designed to ease the stress of meal planning fatigue. </p>
            </div>
            <div class="portfolio-item">
                <img src="challenge10.jpg" alt="Challenge 10">
                <h2>RoleCall</h2>
                <p>RoleCall is a command-line application designed to help business owners manage their company's employee database efficiently.</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge9.jpg" alt="Challenge 9">
                <h2>SkyWatch</h2>
                <p>SkyWatch is a weather dashboard application that allows users to retrieve current and 5-day weather forecasts for multiple cities using the OpenWeather API.</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge8.jpg" alt="Challenge 8">
                <h2>Vehicle Builder</h2>
                <p>Vehicle Builder is a TypeScript-based command-line application that allows users to create and interact with different types of vehicles.</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge7.jpg" alt="Challenge 7">
                <h2>README Generator</h2>
                <p>An application that dynamically generates a professional README.md file from a user's input</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge3.jpg" alt="Challenge 3">
                <h2>Employee Payroll Tracker</h2>
                <p>An application that enables a payroll manager to view and manage employee payroll data.</p>
            </div>
        </div>
    `;

    // Create the footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <p>&copy; 2025 Alex Menendez</p>
        <a href="#">GitHub</a> | 
        <a href="#">LinkedIn</a>
    `;

    // Append everything to the body
    document.body.appendChild(header);
    document.body.appendChild(mainContent);
    document.body.appendChild(footer);

    // debug: load new content instead of just loading blank screen
    // Append the app container to the document body
    document.body.appendChild(appContainer);

    // Reattach event listeners to navigation menu
    setupNavigation();

    // Add event listener to update the active navbar item
    const navItems = document.querySelectorAll('.navbar nav ul li');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all navbar items
            navItems.forEach(nav => {
                nav.classList.remove('active');
                nav.innerHTML = nav.innerHTML.replace(" ✦", ""); // Remove any existing star
            });

            // Add 'active' class to the clicked item
            item.classList.add('active');
            item.innerHTML += " ✦"; // Add star to the clicked item
        });
    });
}

// Function to handle nav bar
function setupNavigation() {
    const content = document.getElementById('content');
    
    document.getElementById('about').addEventListener('click', () => {
        content.innerHTML = `<h2>About Me</h2><p>Welcome to my portfolio.</p>`;
    });

    document.getElementById('portfolio').addEventListener('click', () => {
        content.innerHTML = `<h2>Portfolio</h2><p>Here are my projects.</p>
        <div class="portfolio-grid">
            <div class="portfolio-item">
                <img src="project1.jpg" alt="Project 1">
                <h2>Meal Muse</h2>
                <p>Meal Muse is a meal planning companion, designed to ease the stress of meal planning fatigue. </p>
            </div>
            <div class="portfolio-item">
                <img src="challenge10.jpg" alt="Challenge 10">
                <h2>RoleCall</h2>
                <p>RoleCall is a command-line application designed to help business owners manage their company's employee database efficiently.</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge9.jpg" alt="Challenge 9">
                <h2>SkyWatch</h2>
                <p>SkyWatch is a weather dashboard application that allows users to retrieve current and 5-day weather forecasts for multiple cities using the OpenWeather API.</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge8.jpg" alt="Challenge 8">
                <h2>Vehicle Builder</h2>
                <p>Vehicle Builder is a TypeScript-based command-line application that allows users to create and interact with different types of vehicles.</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge7.jpg" alt="Challenge 7">
                <h2>README Generator</h2>
                <p>An application that dynamically generates a professional README.md file from a user's input</p>
            </div>
            <div class="portfolio-item">
                <img src="challenge3.jpg" alt="Challenge 3">
                <h2>Employee Payroll Tracker</h2>
                <p>An application that enables a payroll manager to view and manage employee payroll data.</p>
            </div>
        </div>
        `;
    });

    document.getElementById('contact').addEventListener('click', () => {
        content.innerHTML = `
            <h2>Contact</h2>
            <p>You can reach me through the following platforms:</p>
            <ul class="contact-list">
                <li><strong>Email:</strong> <a href="mailto:your.email@example.com">your.email@example.com</a></li>
                <li><strong>Phone:</strong> (123) 456-7890</li>
                <li><strong>GitHub:</strong> <a href="https://github.com/yourgithub" target="_blank">github.com/yourgithub</a></li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourlinkedin" target="_blank">linkedin.com/in/yourlinkedin</a></li>
            </ul>
        `;
    });

    document.getElementById('resume').addEventListener('click', () => {
        content.innerHTML = `<h2>Resume</h2><a href="#">Download Resume</a>`;
    });
}

