precision highp float;

#define PI 3.1415926535
#define TAU 6.28318530718

uniform vec2 iResolution;
uniform vec4 window;
uniform int iterations;

uniform vec4 redChannel;
uniform vec4 greenChannel;
uniform vec4 blueChannel;

uniform bool gaussianBlur;

vec3 getColor(float tVal) {
    vec3 a = vec3(redChannel.x, greenChannel.x, blueChannel.x);
    vec3 b = vec3(redChannel.y, greenChannel.y, blueChannel.y);
    vec3 c = vec3(redChannel.z, greenChannel.z, blueChannel.z);
    vec3 d = vec3(redChannel.w, greenChannel.w, blueChannel.w);
    vec3 t = vec3(tVal);

    return a + b * cos(TAU * (c * t + d));
}

float mandelbrot(vec2 c) {
    vec2 z = c;
    int iters;
    bool done = false;
    for (int i = 0; i < 8192; i++) {
        if (i > iterations) {
            break;
        }
        if (z.x * z.x + z.y * z.y > 4.0) {
            break;
        }
        iters = i;

        float x = z.x * z.x - z.y * z.y + c.x;
        z.y = 2.0 * z.x * z.y + c.y;
        z.x = x;
    }

    return float(iters) / float(iterations);
}

void main(void) {
    vec2 uv = gl_FragCoord.xy / iResolution;
    vec3 d = vec3(window.zw / iResolution, 0.0);
    uv.y = 1.0 - uv.y;
    vec2 c = uv.xy * window.zw + window.xy;
    float center = mandelbrot(c);
    float t;
    if (!gaussianBlur) {
        t = center;
    } else {
        t =
            center * 0.5 +
            mandelbrot(c + d.xz) * 0.125 +
            mandelbrot(c + d.zy) * 0.125 +
            mandelbrot(c - d.xz) * 0.125 +
            mandelbrot(c - d.zy) * 0.125;
    }
    gl_FragColor = vec4(getColor(t), 1.0);
}