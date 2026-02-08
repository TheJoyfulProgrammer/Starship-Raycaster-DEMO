#version 450

// Full-color display pass.
// Samples the offscreen RGBA8 image directly (bypassing palette/index quantization).

layout(set=0, binding=0) uniform sampler2D uSrc;

layout(push_constant) uniform DisplayPC
{
    uint pixelSize;
    uint pad0;
    uint pad1;
    uint pad2;
} pc;

layout(location=0) out vec4 outColor;

void main()
{
    ivec2 pix = ivec2(gl_FragCoord.xy);

    uint ps = max(pc.pixelSize, 1u);
    ivec2 srcPix = pix / int(ps);

    ivec2 sz = textureSize(uSrc, 0);
    srcPix = clamp(srcPix, ivec2(0), sz - ivec2(1));

    outColor = texelFetch(uSrc, srcPix, 0);
}
