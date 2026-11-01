import sharp from "sharp";
const source = "public/projects/gestao-stocks-dashboard.png";
const output = "public/projects/gestao-stocks-dashboard.webp";
const metadata = await sharp(source).metadata();
await sharp(source).webp({ lossless: true, effort: 6 }).toFile(output);
const original = await sharp(source).ensureAlpha().raw().toBuffer();
const optimized = await sharp(output).ensureAlpha().raw().toBuffer();
if (!original.equals(optimized))
  throw new Error("Lossless pixel comparison failed");
console.log(
  JSON.stringify({
    source,
    output,
    width: metadata.width,
    height: metadata.height,
    pixelsUnchanged: true,
    bytes: (await sharp(output).metadata()).size,
  }),
);
