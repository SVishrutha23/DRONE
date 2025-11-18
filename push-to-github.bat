@echo off
echo ========================================
echo  Push to GitHub
echo ========================================
echo.
echo Make sure you have created a repository on GitHub first!
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo Error: Repository URL is required!
    pause
    exit /b 1
)

echo.
echo Setting up remote and pushing...
echo.

git branch -M main
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ========================================
echo  Done! Check your GitHub repository.
echo ========================================
pause

