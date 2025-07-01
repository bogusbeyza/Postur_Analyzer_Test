document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    // Initialize users in localStorage if not exists
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

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation checks
        if (fullName.length < 2) {
            alert('Lütfen geçerli bir ad soyad girin.');
            return;
        }

        if (username.length < 3) {
            alert('Kullanıcı adı en az 3 karakter olmalıdır.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }

        if (password.length < 6) {
            alert('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Şifreler eşleşmiyor.');
            return;
        }

        // Retrieve existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if username or email already exists
        const userExists = users.some(user => 
            user.username === username || user.email === email
        );

        if (userExists) {
            alert('Bu kullanıcı adı veya e-posta zaten kullanımda.');
            return;
        }

        // Create new user object
        const newUser = {
            username,
            password,
            fullName,
            email
        };

        // Add new user to users array
        users.push(newUser);

        // Save updated users to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message and redirect
        alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
        window.location.href = 'index.html';
    });
}); 