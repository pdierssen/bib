# Waiting for startup
do {
	Write-Output "Checking WSL..."
	$result= wsl -d Ubuntu --exec echo ok 2>$null
	Write-Output "Output: ${result}"
	if ($result -ne "ok") {
		Start-Sleep -Seconds 2
	}
} while ($result -ne "ok")

Write-Output "Starting Docker..."
Start-Process "C:/Program Files/Docker/Docker/Docker Desktop.exe" -NoNewWindow

do {
	Write-Output "Checking Docker..."
	$dockerresult = wsl -d Ubuntu --exec docker info --format '{{.ServerVersion}}' 2>$null
	Write-Output "Output: ${dockerresult}"
	if (-not $dockerresult) {
		Start-Sleep -Seconds 2
	}
} while (-not $dockerresult)


$name= $env:USERNAME
$pathToProject = "Public/bibliothek_source_code/bib"

#Write-Output $name

#Write-Output "Starting WSL..."
#wsl -d Ubuntu --exec bash -c "echo WSL running"

Write-Output "Starting Docker compose"

$composeResult = wsl -d Ubuntu --exec bash -c "cd /mnt/c/Users/Public/bibliothek_source_code/bib && docker-compose up -d" 2>&1


if ($LASTEXITCODE -ne 0) {
	Write-Output "Docker compose failed, trying with build..."
	$composeResult = wsl -d Ubuntu --exec bash -c "cd /mnt/c/Users/Public/bibliothek_source_code/bib && docker-compose up -d --build" 2>&1
}

if ($LASTEXITCODE -eq 0) {
	Write-Output "Docker compose started successfully"
} else {
	Write-Output "Compose failed: ${composeResult}"
	Write-Output "exiting in 10 seconds..."
	Start-Sleep -Seconds 10
	exit
}

#Start-Sleep -Seconds 5
#stopping frontend
taskkill /f /im "Docker Desktop.exe"

Write-Output "Launching Bib"
$KioskUrl = "http://localhost/login"

Start-Process "msedge.exe" "--kiosk $KioskUrl --edge-kiosk-type=fullscreen --disable-infobars --no-first-run --disable-translate --disable-extensions --disable-session-crashed-bubble"

Write-Output 'Kiosk started.'
