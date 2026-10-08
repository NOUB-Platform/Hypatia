@echo off
chcp 65001 > nul
echo ===================================================
echo     تشغيل صفحة نوب المحلية لربط Google Drive
echo ===================================================
echo.
echo جاري تشغيل خادم محلي على جهازك...
echo.

where python >nul 2>nul
if %errorlevel%==0 (
    echo تم العثور على Python، جاري فتح الصفحة على http://localhost:8080/noub_local.html
    start http://localhost:8080/noub_local.html
    python -m http.server 8080
    goto end
)

where npx >nul 2>nul
if %errorlevel%==0 (
    echo تم العثور على Node.js، جاري فتح الصفحة...
    start http://localhost:8080/noub_local.html
    npx serve -p 8080 .
    goto end
)

echo جاري فتح المتصفح عبر خادم باورشيل المحلي المدمج في ويندوز...
powershell -Command "Start-Process 'http://localhost:8080/noub_local.html'; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Write-Host 'الخادم يعمل الآن. اضغط Ctrl+C للإيقاف.'; while ($listener.IsListening) { $context = $listener.GetContext(); $path = Join-Path $PWD ($context.Request.Url.LocalPath.TrimStart('/')); if (Test-Path $path) { $bytes = [System.IO.File]::ReadAllBytes($path); $context.Response.ContentLength64 = $bytes.Length; $context.Response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $context.Response.StatusCode = 404 }; $context.Response.Close() }"

:end
pause
