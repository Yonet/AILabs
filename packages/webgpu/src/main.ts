async function main() {
    const canvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    if (!navigator.gpu) {
        throw new Error("WebGPU not supported on this browser.");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw new Error("No appropriate GPUAdapter found.");
    }

    const device = await adapter.requestDevice();
    if (!device) {
        throw new Error("No appropriate GPUDevice found.");
    }

    const context = canvas.getContext('webgpu');
    if (!context) {
        throw new Error("Could not get WebGPU context from canvas.");
    }

    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });

    // Vertex data: position (x, y)
    const vertices = new Float32Array([
        // Triangle 1
         0.0,  0.5, // Top center
        -0.5, -0.5, // Bottom left
         0.5, -0.5, // Bottom right
    ]);

    const vertexBuffer = device.createBuffer({
        label: 'Triangle vertices',
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    const vertexBufferLayout: GPUVertexBufferLayout = {
        arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT, // 2 floats per vertex (x, y)
        attributes: [
            {
                format: 'float32x2', // (x, y)
                offset: 0,
                shaderLocation: 0, // Corresponds to @location(0) in vertex shader
            },
        ],
    };

    const shaderModule = device.createShaderModule({
        label: 'Triangle shaders',
        code: `
            @vertex
            fn vs(@location(0) pos: vec2f) -> @builtin(position) vec4f {
                return vec4f(pos, 0.0, 1.0);
            }

            @fragment
            fn fs() -> @location(0) vec4f {
                return vec4f(1.0, 0.0, 0.0, 1.0); // Red color
            }
        `,
    });

    const pipeline = device.createRenderPipeline({
        label: 'Triangle pipeline',
        layout: 'auto',
        vertex: {
            module: shaderModule,
            entryPoint: 'vs',
            buffers: [vertexBufferLayout],
        },
        fragment: {
            module: shaderModule,
            entryPoint: 'fs',
            targets: [
                {
                    format: canvasFormat,
                },
            ],
        },
        primitive: {
            topology: 'triangle-list',
        },
    });

    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                loadOp: 'clear',
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }, // Clear to black
                storeOp: 'store',
            },
        ],
    });

    passEncoder.setPipeline(pipeline);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.draw(vertices.length / 2); // 3 vertices for one triangle (vertices.length / 2 because each vertex has 2 components)
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);

    console.log("Triangle rendered.");
}

main().catch(err => {
    console.error("Error in WebGPU main function:", err);
    const errorElement = document.createElement('pre');
    errorElement.style.color = 'red';
    errorElement.textContent = err.message + (err.stack ? `\n${err.stack}` : '');
    document.body.innerHTML = ''; // Clear body
    document.body.appendChild(errorElement);
});
