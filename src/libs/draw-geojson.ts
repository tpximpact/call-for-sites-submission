import type { GeoJSON } from "geojson";

// Type guard to check if geojson has a geometry property
function hasGeometry(
  obj: GeoJSON
): obj is GeoJSON & { geometry: { type: string; coordinates: any } } {
  return (
    typeof (obj as any).geometry === "object" &&
    typeof (obj as any).geometry.type === "string" &&
    Array.isArray((obj as any).geometry.coordinates)
  );
}

/**
 * Draws a GeoJSON MultiPolygon on a canvas element.
 * Scales and centers the shape to fit the canvas.
 *
 * @param geojson - A GeoJSON object with MultiPolygon geometry
 * @param canvas - The HTMLCanvasElement to draw on
 */
export function drawGeoJSON(geojson: GeoJSON, canvas: HTMLCanvasElement) {
  if (!hasGeometry(geojson) || geojson.geometry.type !== "MultiPolygon") return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Flatten all coordinates to find bounds
  type Coord = [number, number];
  const allCoords: Coord[] = (geojson.geometry.coordinates as Coord[][][]).flat(
    2
  );
  const lats: number[] = allCoords.map((c: Coord) => c[1]);
  const lngs: number[] = allCoords.map((c: Coord) => c[0]);
  const minLat = Math.min(...lats),
    maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs),
    maxLng = Math.max(...lngs);

  // Calculate scale and offset
  const padding = 20;
  const scaleX = (canvas.width - 2 * padding) / (maxLng - minLng || 1);
  const scaleY = (canvas.height - 2 * padding) / (maxLat - minLat || 1);

  // Draw simple map background (graticule/grid and axis labels)
  ctx.save();
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#888";
  const latStep = (maxLat - minLat) / 5;
  const lngStep = (maxLng - minLng) / 5;
  for (let i = 0; i <= 5; i++) {
    // Horizontal grid lines (latitude)
    const lat = minLat + i * latStep;
    const y = canvas.height - (padding + (lat - minLat) * scaleY);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
    ctx.stroke();
    ctx.fillText(lat.toFixed(4), 2, y - 2);
  }
  for (let i = 0; i <= 5; i++) {
    // Vertical grid lines (longitude)
    const lng = minLng + i * lngStep;
    const x = padding + (lng - minLng) * scaleX;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, canvas.height - padding);
    ctx.stroke();
    ctx.fillText(lng.toFixed(4), x + 2, canvas.height - 2);
  }
  ctx.restore();

  (geojson.geometry.coordinates as Coord[][][]).forEach(
    (polygon: Coord[][]) => {
      polygon.forEach((ring: Coord[], ringIdx: number) => {
        ctx.beginPath();
        ring.forEach(([lng, lat]: Coord, i: number) => {
          const x = padding + (lng - minLng) * scaleX;
          // Invert Y axis for canvas
          const y = canvas.height - (padding + (lat - minLat) * scaleY);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = "#0077cc";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 119, 204, 0.2)";
        ctx.fill();
      });
    }
  );
}
