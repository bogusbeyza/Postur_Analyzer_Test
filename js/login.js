document.addEventListener('DOMContentLoaded', () => {
    // Ensure default users exist
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                username: 'admin',
                password: 'password',
                fullName: 'Admin User',
                email: 'admin@postureanalyzer.com'
            },
            {
                username: 'demo',
                password: 'demo123',
                fullName: 'Demo User',
                email: 'demo@postureanalyzer.com'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        updateNavForLoggedInUser(JSON.parse(currentUser));
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Basic validation
            if (username.trim() === '' || password.trim() === '') {
                alert('Lütfen kullanıcı adı ve şifrenizi giriniz.');
                return;
            }

            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Find user with matching credentials
            const user = users.find(u => 
                u.username === username && u.password === password
            );

            if (user) {
                // Store logged-in user info
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Update navigation
                updateNavForLoggedInUser(user);
                
                // Close modal
                closeLoginModal();
                
                // Clear form
                loginForm.reset();
                
                // Show success message
                alert('Başarıyla giriş yaptınız!');
            } else {
                alert('Geçersiz kullanıcı adı veya şifre');
            }
        });
    }

    // Signup form handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('newFullName').value.trim();
            const email = document.getElementById('newEmail').value.trim();
            const username = document.getElementById('newUsername').value.trim();
            const password = document.getElementById('newPassword').value;

            // Basic validation
            if (!fullName || !email || !username || !password) {
                alert('Lütfen tüm alanları doldurunuz.');
                return;
            }

            if (password.length < 6) {
                alert('Şifre en az 6 karakter olmalıdır.');
                return;
            }

            // Retrieve existing users
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check if username or email already exists
            const existingUser = users.find(u => 
                u.username === username || u.email === email
            );

            if (existingUser) {
                alert('Bu kullanıcı adı veya e-posta zaten kullanılıyor.');
                return;
            }

            // Create new user
            const newUser = {
                username,
                password,
                fullName,
                email
            };

            // Add to users array
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Auto login the new user
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // Update navigation
            updateNavForLoggedInUser(newUser);

            // Close modal
            closeSignupModal();

            // Clear form
            signupForm.reset();

            // Show success message
            alert('Kayıt başarılı! Hoş geldiniz!');
        });
    }
});

// Function to update navigation for logged in user
function updateNavForLoggedInUser(user) {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        // Remove login/signup buttons
        const authBtn = navMenu.querySelector('.nav-auth-btn');
        const ctaBtn = navMenu.querySelector('.nav-cta');
        
        if (authBtn) authBtn.remove();
        if (ctaBtn) ctaBtn.remove();

        // Add user info and logout button
        const userInfo = document.createElement('span');
        userInfo.className = 'nav-user-info';
        userInfo.textContent = `Hoş geldin, ${user.fullName}`;
        userInfo.style.color = '#1e40af';
        userInfo.style.fontWeight = '500';

        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'nav-logout-btn';
        logoutBtn.textContent = 'Çıkış Yap';
        logoutBtn.onclick = logout;

        navMenu.appendChild(userInfo);
        navMenu.appendChild(logoutBtn);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    location.reload(); // Reload page to reset navigation
} 