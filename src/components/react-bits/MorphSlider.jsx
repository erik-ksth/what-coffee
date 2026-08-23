"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";

import "./MorphSlider.css";

const TRANSITIONS = { melt: 0, ripple: 1, shear: 2, swirl: 3 };

const DEFAULT_ITEMS = [
    { image: "/images/site/interiors/cafe-interior-edited.jpg", caption: "The neighborhood table" },
    { image: "/images/site/exteriors/cafe-front.jpeg", caption: "Our sunny corner" },
];

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uDir;
uniform int uMode;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uDrift;
uniform float uTime;
uniform float uReduce;
uniform vec2 uPointer;
uniform vec3 uOverlay;

varying vec2 vUv;

const float PI = 3.14159265359;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) {
    s.y = 1.0 / ratio;
  } else {
    s.x = ratio;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);
  vec2 uv = vUv;

  uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
  uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;

  vec2 uvC = uv;
  vec2 uvN = uv;
  float m = smoothstep(0.0, 1.0, p);

  if (uReduce < 0.5) {
    if (uMode == 3) {
      vec2 c = uv - 0.5;
      float r = length(c);
      float ang = env * uIntensity * 3.5 * (1.0 - r);
      uvC = rot(ang) * c + 0.5;
      uvN = rot(-ang) * c + 0.5;
    } else if (uMode == 1) {
      float d = distance(uv, uPointer);
      float ring = p * 1.6;
      float wave = sin((d - ring) * 30.0) * env;
      vec2 dir = normalize(uv - uPointer + 0.0001);
      vec2 disp = dir * wave * uIntensity * 0.25;
      uvC = uv + disp;
      uvN = uv + disp * 0.6;
      m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
    } else if (uMode == 2) {
      float slices = 14.0;
      float row = floor(uv.y * slices);
      float rnd = hash11(row);
      vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
      uvC = uv + disp;
      uvN = uv + disp;
      float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
      float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
      m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
    } else {
      float nn = fbm(uv * uScale + uTime * 0.03);
      float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
      vec2 g = vec2(nn, warp) - 0.5;
      uvC = uv + g * uIntensity * 0.5 * p;
      uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
      m = smoothstep(nn - 0.15, nn + 0.15, p);
    }
  }

  vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
  vec2 sN = coverUV(uvN, uResolution, uNextSize);
  float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;

  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );

  vec3 col = mix(colC, colN, m);
  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.22);
  gl_FragColor = vec4(col, 1.0);
}
`;

function makeFallbackTexture(gl) {
    const size = 4;
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i += 1) {
        data[i * 4] = 243;
        data[i * 4 + 1] = 238;
        data[i * 4 + 2] = 230;
        data[i * 4 + 3] = 255;
    }
    return new Texture(gl, {
        image: data,
        width: size,
        height: size,
        generateMipmaps: false,
    });
}

function hexToRgb(hex) {
    let h = (hex || "#000000").replace("#", "");
    if (h.length === 3)
        h = h
            .split("")
            .map((char) => char + char)
            .join("");
    const n = parseInt(h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

class MorphEngine {
    constructor(
        container,
        { items, startIndex, reducedMotion, getOptions, onIndexChange, dprCap }
    ) {
        this.container = container;
        this.items = items;
        this.getOptions = getOptions;
        this.onIndexChange = onIndexChange;
        this.reducedMotion = reducedMotion;
        this.current = startIndex;
        this.animating = false;
        this.dragging = false;
        this.dragDir = 0;
        this.shownIndex = startIndex;
        this.tween = null;

        this.renderer = new Renderer({
            alpha: false,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, dprCap),
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(243 / 255, 238 / 255, 230 / 255, 1);
        this.canvas = this.gl.canvas;
        this.canvas.className = "morph-slider-canvas";
        container.appendChild(this.canvas);
        this.geometry = new Triangle(this.gl);
        this.textures = this.items.map(() => makeFallbackTexture(this.gl));
        this.sizes = this.items.map(() => [1, 1]);

        const opts = this.getOptions();
        this.program = new Program(this.gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                tCurrent: { value: this.textures[this.current] },
                tNext: { value: this.textures[this.current] },
                uResolution: { value: [1, 1] },
                uCurrentSize: { value: this.sizes[this.current] },
                uNextSize: { value: this.sizes[this.current] },
                uProgress: { value: 0 },
                uDir: { value: 1 },
                uMode: { value: TRANSITIONS[opts.transition] ?? 0 },
                uIntensity: { value: opts.intensity },
                uScale: { value: opts.scale },
                uAberration: { value: opts.aberration },
                uDrift: { value: reducedMotion ? 0 : opts.drift },
                uTime: { value: 0 },
                uReduce: { value: reducedMotion ? 1 : 0 },
                uPointer: { value: [0.5, 0.5] },
                uOverlay: { value: hexToRgb(opts.overlayColor) },
            },
        });

        this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
        this.boundContextLost = this.onContextLost.bind(this);
        this.canvas.addEventListener("webglcontextlost", this.boundContextLost, false);
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(container);
        this.resize();
        this.loadTextures();
        this.boundLoop = this.renderLoop.bind(this);
        this.raf = requestAnimationFrame(this.boundLoop);
    }

    loadTextures() {
        this.items.forEach((item, index) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = item.image;
            image.onload = () => {
                const texture = new Texture(this.gl, { generateMipmaps: false });
                texture.image = image;
                this.textures[index] = texture;
                this.sizes[index] = [image.naturalWidth || 1, image.naturalHeight || 1];
                if (index === this.current) {
                    this.program.uniforms.tCurrent.value = texture;
                    this.program.uniforms.uCurrentSize.value = this.sizes[index];
                }
            };
        });
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1));
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.program.uniforms.uResolution.value = [this.gl.canvas.width, this.gl.canvas.height];
    }

    syncOptions() {
        const opts = this.getOptions();
        this.program.uniforms.uMode.value = TRANSITIONS[opts.transition] ?? 0;
        this.program.uniforms.uIntensity.value = opts.intensity;
        this.program.uniforms.uScale.value = opts.scale;
        this.program.uniforms.uAberration.value = opts.aberration;
        this.program.uniforms.uDrift.value = this.reducedMotion ? 0 : opts.drift;
        this.program.uniforms.uOverlay.value = hexToRgb(opts.overlayColor);
    }

    renderLoop(time) {
        this.program.uniforms.uTime.value = time * 0.001;
        if (!this.dragging && !this.animating) this.syncOptions();
        this.renderer.render({ scene: this.mesh });
        this.raf = requestAnimationFrame(this.boundLoop);
    }

    wrap(index) {
        const length = this.items.length;
        return ((index % length) + length) % length;
    }

    prepareNext(direction) {
        const target = this.wrap(this.current + direction);
        this.program.uniforms.tCurrent.value = this.textures[this.current];
        this.program.uniforms.uCurrentSize.value = this.sizes[this.current];
        this.program.uniforms.tNext.value = this.textures[target];
        this.program.uniforms.uNextSize.value = this.sizes[target];
        this.program.uniforms.uDir.value = direction;
        return target;
    }

    goTo(direction) {
        if (this.animating || this.dragging || this.items.length < 2) return;
        const opts = this.getOptions();
        if (!opts.loop) {
            const raw = this.current + direction;
            if (raw < 0 || raw > this.items.length - 1) return;
        }
        this.syncOptions();
        const target = this.prepareNext(direction);
        this.animating = true;
        this.announce(target);
        const duration = this.reducedMotion ? Math.min(opts.duration, 0.25) : opts.duration;
        this.tween = gsap.fromTo(
            this.program.uniforms.uProgress,
            { value: 0 },
            {
                value: 1,
                duration,
                ease: opts.ease,
                onComplete: () => this.commit(target),
            }
        );
    }

    announce(index) {
        if (index === this.shownIndex) return;
        this.shownIndex = index;
        this.onIndexChange?.(index);
    }

    commit(target) {
        this.current = target;
        this.program.uniforms.tCurrent.value = this.textures[target];
        this.program.uniforms.uCurrentSize.value = this.sizes[target];
        this.program.uniforms.uProgress.value = 0;
        this.animating = false;
        this.tween = null;
        this.announce(target);
    }

    next() {
        this.goTo(1);
    }

    prev() {
        this.goTo(-1);
    }

    setPointer(x, y) {
        this.program.uniforms.uPointer.value = [x, y];
    }

    beginDrag() {
        if (this.animating || this.items.length < 2) return false;
        this.dragging = true;
        this.dragDir = 0;
        this.syncOptions();
        return true;
    }

    drag(distance) {
        if (!this.dragging) return;
        const opts = this.getOptions();
        const direction = distance < 0 ? 1 : -1;
        if (!opts.loop) {
            const raw = this.current + direction;
            if (raw < 0 || raw > this.items.length - 1) {
                this.program.uniforms.uProgress.value = 0;
                return;
            }
        }
        if (direction !== this.dragDir) {
            this.dragDir = direction;
            this.prepareNext(direction);
        }
        const progress = Math.min(Math.abs(distance), 1);
        this.program.uniforms.uProgress.value = progress;
        this.announce(progress > 0.5 ? this.wrap(this.current + direction) : this.current);
    }

    endDrag() {
        if (!this.dragging) return;
        this.dragging = false;
        const progress = this.program.uniforms.uProgress.value;
        if (this.dragDir === 0) return;
        const target = this.wrap(this.current + this.dragDir);
        const duration = this.reducedMotion ? 0.2 : 0.5;
        this.animating = true;
        if (progress > 0.4) {
            this.announce(target);
            this.tween = gsap.to(this.program.uniforms.uProgress, {
                value: 1,
                duration,
                ease: "power4.out",
                onComplete: () => this.commit(target),
            });
        } else {
            this.announce(this.current);
            this.tween = gsap.to(this.program.uniforms.uProgress, {
                value: 0,
                duration,
                ease: "power4.out",
                onComplete: () => {
                    this.animating = false;
                    this.tween = null;
                },
            });
        }
    }

    onContextLost(event) {
        event.preventDefault();
        cancelAnimationFrame(this.raf);
    }

    destroy() {
        cancelAnimationFrame(this.raf);
        this.tween?.kill();
        this.resizeObserver.disconnect();
        this.canvas.removeEventListener("webglcontextlost", this.boundContextLost);
        this.textures.forEach((texture) => {
            if (texture?.texture) this.gl.deleteTexture(texture.texture);
        });
        if (this.program?.program) this.gl.deleteProgram(this.program.program);
        const extension = this.gl.getExtension("WEBGL_lose_context");
        extension?.loseContext();
        this.canvas.remove();
    }
}

export default function MorphSlider({
    items = DEFAULT_ITEMS,
    startIndex = 0,
    transition = "melt",
    duration = 1.1,
    ease = "power2.inOut",
    intensity = 0.55,
    scale = 2.4,
    aberration = 0.35,
    drift = 0.4,
    autoplay = false,
    autoplayDelay = 4,
    loop = true,
    radius = 16,
    overlayColor = "#000000",
    showCaptions = true,
    showControls = true,
    showIndicators = true,
    className = "",
    ...props
}) {
    const containerRef = useRef(null);
    const engineRef = useRef(null);
    const optionsRef = useRef({
        transition,
        duration,
        ease,
        intensity,
        scale,
        aberration,
        drift,
        overlayColor,
        loop,
    });
    const [index, setIndex] = useState(startIndex);
    const [hovering, setHovering] = useState(false);
    const [webglFailed, setWebglFailed] = useState(false);

    useEffect(() => {
        optionsRef.current = {
            transition,
            duration,
            ease,
            intensity,
            scale,
            aberration,
            drift,
            overlayColor,
            loop,
        };
    }, [transition, duration, ease, intensity, scale, aberration, drift, overlayColor, loop]);

    useEffect(() => {
        if (!containerRef.current) return undefined;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let engine;
        let cancelled = false;
        try {
            engine = new MorphEngine(containerRef.current, {
                items,
                startIndex,
                reducedMotion,
                dprCap: 2,
                getOptions: () => optionsRef.current,
                onIndexChange: setIndex,
            });
            engineRef.current = engine;
            window.queueMicrotask(() => {
                if (!cancelled) {
                    setIndex(startIndex);
                    setWebglFailed(false);
                }
            });
        } catch {
            window.queueMicrotask(() => {
                if (!cancelled) setWebglFailed(true);
            });
        }

        return () => {
            cancelled = true;
            engine?.destroy();
            engineRef.current = null;
        };
    }, [items, startIndex]);

    const handleNext = useCallback(() => engineRef.current?.next(), []);
    const handlePrev = useCallback(() => engineRef.current?.prev(), []);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!autoplay || hovering || reducedMotion) return undefined;
        const id = window.setTimeout(
            () => engineRef.current?.next(),
            Math.max(autoplayDelay, 1) * 1000
        );
        return () => window.clearTimeout(id);
    }, [autoplay, autoplayDelay, hovering, index]);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return undefined;
        let startX = 0;
        let width = 1;
        let active = false;

        const onDown = (event) => {
            const rect = element.getBoundingClientRect();
            width = rect.width || 1;
            startX = event.clientX;
            engineRef.current?.setPointer(
                (event.clientX - rect.left) / rect.width,
                1 - (event.clientY - rect.top) / rect.height
            );
            active = engineRef.current?.beginDrag() ?? false;
            if (active && element.setPointerCapture) {
                try {
                    element.setPointerCapture(event.pointerId);
                } catch {
                    // Pointer capture is optional; dragging still works without it.
                }
            }
        };
        const onMove = (event) => {
            if (active) engineRef.current?.drag((event.clientX - startX) / width);
        };
        const onUp = () => {
            if (!active) return;
            active = false;
            engineRef.current?.endDrag();
        };

        element.addEventListener("pointerdown", onDown);
        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerup", onUp);
        element.addEventListener("pointercancel", onUp);
        return () => {
            element.removeEventListener("pointerdown", onDown);
            element.removeEventListener("pointermove", onMove);
            element.removeEventListener("pointerup", onUp);
            element.removeEventListener("pointercancel", onUp);
        };
    }, []);

    const onKeyDown = useCallback(
        (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                handleNext();
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                handlePrev();
            }
        },
        [handleNext, handlePrev]
    );

    const hasCaptions = items.some((item) => item.caption);

    return (
        <div
            className={`morph-slider ${className}`.trim()}
            style={{
                borderRadius: `${radius}px`,
                "--ms-swap": `${(duration * 0.66).toFixed(3)}s`,
                "--ms-dot": `${(duration * 0.45).toFixed(3)}s`,
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            {...props}
        >
            {webglFailed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="morph-slider-fallback" src={items[index].image} alt="" />
            )}
            <div
                ref={containerRef}
                className="morph-slider-stage"
                role="group"
                aria-roledescription="carousel"
                aria-label="What Coffee store photos"
                tabIndex={0}
                onKeyDown={onKeyDown}
            />

            {showCaptions && hasCaptions && (
                <div className="morph-slider-caption" aria-live="polite">
                    {items.map((item, itemIndex) =>
                        item.caption ? (
                            <span
                                key={item.image}
                                aria-hidden={itemIndex === index ? undefined : true}
                                className={`morph-slider-caption-text ${itemIndex === index ? "is-active" : ""}`}
                            >
                                {item.caption}
                            </span>
                        ) : null
                    )}
                </div>
            )}

            {showControls && (
                <div className="morph-slider-controls">
                    <button
                        type="button"
                        className="morph-slider-btn"
                        aria-label="Previous store photo"
                        onClick={handlePrev}
                    >
                        <span aria-hidden="true">←</span>
                    </button>
                    <button
                        type="button"
                        className="morph-slider-btn"
                        aria-label="Next store photo"
                        onClick={handleNext}
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            )}

            {showIndicators && (
                <div className="morph-slider-indicators" role="tablist" aria-label="Store photos">
                    {items.map((item, itemIndex) => (
                        <button
                            key={item.image}
                            type="button"
                            role="tab"
                            aria-selected={itemIndex === index}
                            aria-label={`Go to store photo ${itemIndex + 1}`}
                            className={`morph-slider-dot ${itemIndex === index ? "is-active" : ""}`}
                            onClick={() => {
                                if (itemIndex !== index) {
                                    engineRef.current?.goTo(itemIndex > index ? 1 : -1);
                                }
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
