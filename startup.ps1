#wsl user: to find it out type wsl in a shell
$wslUser= "changeme"
$pathToProject = "changeme"

Write-Output "Starting WSL..."
wsl -d Ubuntu --exec bash -c "echo WSL running"

Write-Output "Starting Docker compose"
wsl -d Ubuntu --exec bash -c "cd /mnt/c/Users/${wslUser}/${pathToProject} && docker-compose up -d" #--build for building from docker compose

Start-Sleep -Seconds 5

Write-Output "Launching Bib"
$KioskUrl = "http://localhost/login"

Start-Process "msedge.exe" "--kiosk $KioskUrl --edge-kiosk-type=fullscreen --disable-infobars --no-first-run --disable-translate --disable-extensions --disable-session-crashed-bubble"

Write-Output 'Kiosk started.'
