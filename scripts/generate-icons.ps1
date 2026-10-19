Add-Type -AssemblyName System.Drawing

$srcPath = "c:\MATKUL\SEMESTER 5\Proyek Pemograman Web (Pak Suhendro)\proyek_semester_5\public\logo-qodha.jpg"
$outDir = "c:\MATKUL\SEMESTER 5\Proyek Pemograman Web (Pak Suhendro)\proyek_semester_5\public\icons"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

$sizes = @(72, 96, 128, 144, 152, 180, 192, 384, 512)
foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap $s, $s
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($srcImg, 0, 0, $s, $s)
    $g.Dispose()

    if ($s -eq 180) {
        $outPath = Join-Path $outDir "apple-touch-icon.png"
    } else {
        $outPath = Join-Path $outDir "icon-${s}x${s}.png"
    }
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created: $outPath"
}

# Maskable icon with 10% padding for safe zone on dark background
$maskSize = 512
$pad = [int]($maskSize * 0.1)
$innerSize = $maskSize - (2 * $pad)
$maskBmp = New-Object System.Drawing.Bitmap $maskSize, $maskSize
$mg = [System.Drawing.Graphics]::FromImage($maskBmp)
$mg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$mg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$mg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$mg.Clear([System.Drawing.Color]::White)
$mg.DrawImage($srcImg, $pad, $pad, $innerSize, $innerSize)
$mg.Dispose()

$maskPath = Join-Path $outDir "maskable-icon-512x512.png"
$maskBmp.Save($maskPath, [System.Drawing.Imaging.ImageFormat]::Png)
$maskBmp.Dispose()
Write-Host "Created: $maskPath"

$srcImg.Dispose()
Write-Host "All icons generated successfully!"
