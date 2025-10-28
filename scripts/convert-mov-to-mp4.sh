#!/usr/bin/env bash
set -euo pipefail

# Batch-convert .mov files to .mp4 (H.264 hardware encode on Apple Silicon)
# Usage:
#   ./scripts/convert-mov-to-mp4.sh [root_dir]
# Env overrides:
#   MAXW (default 1920), MAXH (1080)

root="${1:-public/videos}"
maxw="${MAXW:-1920}"
maxh="${MAXH:-1080}"
fps="${FPS:-30}"          # target fps (e.g., 24/25/30)
vbitrate="${VBITRATE:-6000k}"  # target video bitrate for hardware encoder

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg not found. Install with 'brew install ffmpeg'" >&2
  exit 1
fi

echo "Converting .mov → .mp4 under: $root (cap: ${maxw}x${maxh})"

shopt -s nullglob
found=0
while IFS= read -r -d '' in; do
  found=1
  out="${in%.*}.mp4"
  if [[ -f "$out" ]]; then
    echo "Skip (exists): $out"
    continue
  fi
  echo "Converting: $in -> $out"
  # Detect if input has audio to avoid ffmpeg warnings
  if ffprobe -v error -select_streams a:0 -show_entries stream=codec_type -of csv=p=0 "$in" > /dev/null 2>&1; then
    HAS_AUDIO=1
  else
    HAS_AUDIO=0
  fi

  if [[ "$HAS_AUDIO" -eq 1 ]]; then
    ffmpeg -y -i "$in" \
      -vf "scale='min(${maxw},iw)':'min(${maxh},ih)':force_original_aspect_ratio=decrease,fps=${fps}" \
      -c:v h264_videotoolbox -b:v ${vbitrate} -maxrate ${vbitrate} \
      -movflags +faststart \
      -map 0:v:0 -map 0:a:0 \
      -c:a aac -b:a 160k "$out"
  else
    ffmpeg -y -i "$in" \
      -vf "scale='min(${maxw},iw)':'min(${maxh},ih)':force_original_aspect_ratio=decrease,fps=${fps}" \
      -c:v h264_videotoolbox -b:v ${vbitrate} -maxrate ${vbitrate} \
      -movflags +faststart \
      -an "$out"
  fi
done < <(find "$root" -type f -iname "*.mov" -print0)

if [[ "$found" -eq 0 ]]; then
  echo "No .mov files found under: $root"
else
  echo "Done. Verify outputs before deleting .mov files."
fi
