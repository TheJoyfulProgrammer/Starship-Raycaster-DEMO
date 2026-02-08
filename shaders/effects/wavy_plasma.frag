#version 450

layout(location = 0) out vec4 outColor;

layout(push_constant) uniform Push {
    // x = pixel width, y = pixel height, z = time (seconds), w unused
    vec4 iResolutionTime;
} pc;

#define iResolution vec3(pc.iResolutionTime.xy, 1.0)
#define iTime       (pc.iResolutionTime.z)

float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= iResolution.x / iResolution.y;

    float t = iTime * 0.7;

    float a = sin(3.0*p.x + t) + cos(3.0*p.y - t);
    float b = sin(5.0*(p.x+p.y) - t*1.3);
    float c = sin(4.0*length(p) + t*1.8);

    float v = (a + b + c) / 3.0;
    v = 0.5 + 0.5*v;

    float n = hash12(gl_FragCoord.xy + iTime*60.0);
    v += (n-0.5)*0.07;

    vec3 col = vec3(
        0.5 + 0.5*sin(6.2831*(v + 0.00)),
        0.5 + 0.5*sin(6.2831*(v + 0.33)),
        0.5 + 0.5*sin(6.2831*(v + 0.66))
    );

    outColor = vec4(col, 1.0);
}
