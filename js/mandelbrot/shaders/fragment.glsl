precision highp float;

#define PI 3.1415926535
#define TAU 6.28318530718
#define INFTY 1e20
#define MAX_ITERS 8192
#define ESCAPE_DIST_SQUARED 4.0

uniform vec2 iResolution;
uniform vec4 window;
uniform int iterations;

uniform vec4 redChannel;
uniform vec4 greenChannel;
uniform vec4 blueChannel;

uniform bool gaussianBlur;
uniform bool originalLayer;
uniform bool pointTrapLayer;

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
    for (int i = 0; i < MAX_ITERS; i++) {
        if (i > iterations) {
            break;
        }
        if (z.x * z.x + z.y * z.y > ESCAPE_DIST_SQUARED) {
            break;
        }
        iters = i;

        float x = z.x * z.x - z.y * z.y + c.x;
        z.y = 2.0 * z.x * z.y + c.y;
        z.x = x;
    }

    return float(iters) / float(iterations);
}

float pointTrap(vec2 c) {
    vec2 z = c;
    int iters;
    float minDistance = INFTY;
    for (int i = 0; i < MAX_ITERS; i++) {
        if (i > iterations) {
            break;
        }
        if (z.x * z.x + z.y * z.y > ESCAPE_DIST_SQUARED) {
            minDistance = 0.0;
            break;
        }
        iters = i;
        minDistance = min(minDistance, (z.x * z.x + z.y * z.y));

        float x = z.x * z.x - z.y * z.y + c.x;
        z.y = 2.0 * z.x * z.y + c.y;
        z.x = x;
    }
    return minDistance;
}

float calculateOriginalLayer(vec2 c, vec3 d) {
    if (!gaussianBlur) {
        return mandelbrot(c);
    } else {
        return mandelbrot(c) * 0.5 +
            mandelbrot(c + d.xz) * 0.125 +
            mandelbrot(c + d.zy) * 0.125 +
            mandelbrot(c - d.xz) * 0.125 +
            mandelbrot(c - d.zy) * 0.125;
    }
}

float calculatePointTrapLayer(vec2 c, vec3 d) {
    if (!gaussianBlur) {
        return pointTrap(c);
    } else {
        return pointTrap(c) * 0.5 +
            pointTrap(c + d.xz) * 0.125 +
            pointTrap(c + d.zy) * 0.125 +
            pointTrap(c - d.xz) * 0.125 +
            pointTrap(c - d.zy) * 0.125;
    }
}

void main(void) {
    vec2 uv = gl_FragCoord.xy / iResolution;
    vec3 d = vec3(window.zw / iResolution, 0.0);
    uv.y = 1.0 - uv.y;
    vec2 c = uv.xy * window.zw + window.xy;
    float center = mandelbrot(c);
    float t = 0.0;
    float max = 0.0;

    if (originalLayer) {
        t += calculateOriginalLayer(c, d);
        max += 1.0;
    }
    if (pointTrapLayer) {
        t += 5.0 * calculatePointTrapLayer(c, d);
        max += 1.0;
    }

    t /= max;
    gl_FragColor = vec4(getColor(t), 1.0);
}