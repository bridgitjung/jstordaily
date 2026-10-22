# Slices the exported Figma image grids (assets/raw/stripN.png) into assets/img/NNN.jpg
# using the positions recorded in assets/raw/strips.json.
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$raw = Join-Path $root 'assets\raw'
$out = Join-Path $root 'assets\img'
New-Item -ItemType Directory -Force $out | Out-Null
$strips = Get-Content (Join-Path $raw 'strips.json') -Raw | ConvertFrom-Json
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 85L
for ($s = 0; $s -lt $strips.Count; $s++) {
  $src = [System.Drawing.Bitmap]::FromFile((Join-Path $raw "strip$s.png"))
  foreach ($p in $strips[$s]) {
    $i, $x, $y, $w, $h = $p
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save((Join-Path $out ('{0:D3}.jpg' -f $i)), $codec, $params)
    $bmp.Dispose()
  }
  Write-Host "strip ${s}: $($src.Width)x$($src.Height), $($strips[$s].Count) images"
  $src.Dispose()
}
