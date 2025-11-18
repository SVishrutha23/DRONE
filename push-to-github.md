# Push to GitHub - Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `drone-feature-extraction-frontend` (or any name you prefer)
3. Description: "AI-based feature extraction from drone orthophotos - Frontend"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Run These Commands

After creating the repository, GitHub will show you commands. Use these instead (replace YOUR_USERNAME with your GitHub username):

```bash
cd C:\Users\svini\Downloads\DRONE
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/drone-feature-extraction-frontend.git
git push -u origin main
```

## Alternative: If you already have a repository URL

If you already created the repository, just run:

```bash
cd C:\Users\svini\Downloads\DRONE
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Quick Command Script

I've also created `push-to-github.bat` file that you can edit with your repository URL and run.

