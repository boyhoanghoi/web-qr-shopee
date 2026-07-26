@echo off
chcp 65001 >nul
title Web QR 6 Mẫu

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [LOI] Máy chưa cài Node.js.
    echo Hãy tải Node.js LTS tại: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Đang cài thư viện lần đầu...
    call npm install
    if errorlevel 1 (
        echo.
        echo [LOI] Cài thư viện thất bại.
        pause
        exit /b 1
    )
)

echo.
echo Website đang khởi động...
echo Sau khi chạy, mở đường link Local hiện trong cửa sổ này.
echo.
call npm run dev
pause
