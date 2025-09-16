
$name= $env:USERNAME
$pathToProject = "PycharmProjects/bibliothek"

Write-Output $name

Write-Output "Starting WSL..."
wsl -d Ubuntu --exec bash -c "echo WSL running"

Write-Output "Starting Docker compose"
wsl -d Ubuntu --exec bash -c "cd /mnt/c/Users/${name}/${pathToProject} && docker-compose up -d" #--build for building from docker compose

Start-Sleep -Seconds 5

Write-Output "Launching Bib"
$KioskUrl = "http://localhost/login"

Start-Process "msedge.exe" "--kiosk $KioskUrl --edge-kiosk-type=fullscreen --disable-infobars --no-first-run --disable-translate --disable-extensions --disable-session-crashed-bubble"

Write-Output 'Kiosk started.'
