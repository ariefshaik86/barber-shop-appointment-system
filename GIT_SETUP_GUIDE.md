# Git Setup Guide for Barber Shop Project

## 🚀 Quick Setup Instructions

### Step 1: Install Git (if not already installed)

#### Windows:
1. **Download Git:** https://git-scm.com/download/win
2. **Run installer:** Use default settings
3. **Verify installation:** Open Command Prompt and run:
   ```bash
   git --version
   ```

#### Alternative: Use Git Bash (comes with Git for Windows)

### Step 2: Configure Git

Open Git Bash or Command Prompt and run:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize Repository

Navigate to your project folder:

```bash
cd "c:/Users/USER/OneDrive/Desktop/new"
```

Initialize Git repository:

```bash
git init
```

### Step 4: Add Files to Git

```bash
# Add all files
git add .

# Or add specific files
git add README.md .gitignore
```

### Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Complete Barber Shop Appointment System"
```

### Step 6: Create GitHub Repository

1. **Go to GitHub:** https://github.com
2. **Sign in** or **Create account**
3. **Click "New repository"**
4. **Repository name:** `barber-shop-appointment-system`
5. **Description:** `Full-stack barber shop appointment system with Spring Boot and React`
6. **Make it Public** (or Private if you prefer)
7. **Don't initialize with README** (we already have one)
8. **Click "Create repository"**

### Step 7: Connect Local to Remote

GitHub will show you commands like:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/barber-shop-appointment-system.git

# Push to GitHub
git push -u origin main
```

### Step 8: Verify Upload

Check your GitHub repository to ensure all files are uploaded!

## 📁 What's Included in This Project

### Backend (Spring Boot)
- ✅ Complete REST API
- ✅ Database integration with MySQL
- ✅ JPA entities and repositories
- ✅ Business logic layer
- ✅ Error handling and validation

### Frontend (React)
- ✅ Customer booking interface
- ✅ Admin dashboard
- ✅ Real-time data updates
- ✅ Responsive design
- ✅ Modern UI with animations

### Configuration
- ✅ Database setup scripts
- ✅ Environment configuration
- ✅ Build configurations
- ✅ Comprehensive documentation

## 🔧 Alternative: Use GitHub Desktop

If you prefer a GUI interface:

1. **Download GitHub Desktop:** https://desktop.github.com/
2. **Install and sign in**
3. **File > Add Local Repository**
4. **Select your project folder**
5. **Publish to GitHub**

## 📝 Git Commands Reference

```bash
# Check status
git status

# Add files
git add .
git add filename

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push

# Pull latest changes
git pull

# Create new branch
git branch feature-name
git checkout feature-name

# Merge branches
git checkout main
git merge feature-name
```

## 🎯 Next Steps After Upload

1. **Share repository link** with collaborators
2. **Set up branch protection** rules
3. **Create issues** for future features
4. **Set up GitHub Actions** for CI/CD (optional)
5. **Add contributors** if working with a team

## 🐛 Troubleshooting

### Git not recognized:
- Restart your terminal/command prompt
- Verify Git installation
- Use Git Bash instead of Command Prompt

### Permission denied:
- Check GitHub credentials
- Use personal access token if 2FA enabled

### Merge conflicts:
- Use `git pull` before pushing
- Resolve conflicts manually
- Use VS Code or other tools for conflict resolution

---

**🎉 Your complete Barber Shop Appointment System is ready for Git upload!**

The project includes:
- ✅ Production-ready code
- ✅ Comprehensive documentation
- ✅ Proper .gitignore configuration
- ✅ README with setup instructions
- ✅ All necessary configuration files
