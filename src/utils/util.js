import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor()

const extractColors = async (currentSong, setColors) => {
      if(!currentSong?.image) return;

      try {
        const dominantColorResult = await fac.getColorAsync(currentSong.image, {
          crossOrigin: "anonymous",
          algorithm: "dominant"
        })

        const color1 = dominantColorResult.rgb;

        const [r, g, b] = dominantColorResult.value;

        const darkerColor = `rgb(${Math.max(0, r * 0.8)}, ${Math.max(0, g * 0.8)}, ${Math.max(0, b * 0.8)})`;

        setColors([color1, darkerColor])
      } catch (error) {
        console.error("Color extraction failed", error)
        setColors(["#2ac2cc", "#2ac2c2"])
      }
    }

export default extractColors