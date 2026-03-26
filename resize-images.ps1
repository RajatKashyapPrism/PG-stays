Add-Type -AssemblyName System.Drawing

$imageDir = "c:\Users\Rajat-PC\Desktop\projects\PG stays\PG stays\public\images"
$files = Get-ChildItem -Path $imageDir -Filter "*.webp"

Write-Host "Found $($files.Count) WebP images to resize..."

foreach ($file in $files) {
    $filePath = $file.FullName
    Write-Host "Resizing $($file.Name)..."
    
    try {
        # Load image
        $image = [System.Drawing.Image]::FromFile($filePath)
        $originalWidth = $image.Width
        $originalHeight = $image.Height
        
        # Calculate new dimensions (1024 width, maintain aspect ratio)
        $newWidth = 1024
        $newHeight = [int]($originalHeight * ($newWidth / $originalWidth))
        
        # Create resized bitmap
        $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        # Save (this will overwrite)
        $image.Dispose()
        $graphics.Dispose()
        
        # Save with quality
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85)
        
        $newImage.Save($filePath, $encoder, $encoderParams)
        $newImage.Dispose()
        
        Write-Host "[OK] $($file.Name) resized successfully ($($originalWidth) x $($originalHeight) -> $newWidth x $newHeight)"
    }
    catch {
        Write-Host "[ERROR] Error resizing $($file.Name): $_"
    }
}

Write-Host "Resizing complete!"
