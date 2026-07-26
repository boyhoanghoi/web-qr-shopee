@echo off
chcp 65001 >nul
title Web QR 12 Mau

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [LOI] May chua cai Node.js.
    echo Hay tai Node.js LTS tai: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Dang cai thu vien lan dau...
    call npm install
    if errorlevel 1 (
        echo.
        echo [LOI] Cai thu vien that bai.
        pause
        exit /b 1
    )
)

echo.
echo Website dang khoi dong...
echo Sau khi chay, mo duong link Local hien trong cua so nay.
echo.
call npm run dev
pause
