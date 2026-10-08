@echo off
chcp 65001 > nul
echo ========================================================
echo     هيباتيا - تشغيل النسخة المستقلة لشركة مشاوير
echo ========================================================
echo.
echo جاري فتح ملف HTML المستقل في متصفحك مباشرة...
echo.

start "" "%~dp0hypatia_single_file.html"

where python >nul 2>nul
if %errorlevel%==0 (
    echo تم تشغيل خادم محلي اختياري عبر Python على http://localhost:8080/hypatia_single_file.html
    python -m http.server 8080
    goto end
)

:end
pause
