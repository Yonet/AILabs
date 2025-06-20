# Computer Vision Project - Hunyuan3D Demo

This project demonstrates the use of the Hunyuan3D-2.1 model for image-to-3D generation.

## Running the Demo

1.  **Provide an Input Image:**
    *   This demo expects an input image at `assets/demo.png`.
    *   The original `demo.png` from the Hunyuan3D project was not available in the Hugging Face repository when this project was set up.
    *   **You will need to provide your own image file and name it `demo.png` inside the `assets/` directory.**
    *   The image should preferably have a clear subject with a transparent or removable background (though the script includes background removal).

2.  **Install Dependencies:**
    Make sure you have Python installed. Then, install the required libraries:
    ```bash
    pip install -r requirements.txt
    ```
    The main dependencies include:
    - `Pillow`
    - `torch`
    - `torchvision`
    - `diffusers`
    - `transformers`
    - `huggingface_hub`
    - `rembg`

3.  **Run the Script:**
    Execute the run script:
    ```bash
    bash scripts/run.sh
    ```

    *   **Note on Model Downloads:** The first time you run the script, it will download the Hunyuan3D model weights from Hugging Face. This might take some time depending on your internet connection. Subsequent runs will use the cached models.
    *   **Output:** The script will generate two files in the `src/` directory:
        *   `demo.glb`: The initial 3D mesh.
        *   `demo_textured.glb`: The final textured 3D mesh.

## Project Structure

- `assets/demo.png`: Input image (user-provided).
- `src/demo.py`: The main Python script to run the Hunyuan3D model.
- `src/hy3dshape/`: Contains code for shape generation (adapted from Hunyuan3D).
- `src/hy3dpaint/`: Contains code for texture painting (adapted from Hunyuan3D).
- `src/hunyuan3d-vae-v2-1/`: Contains VAE model components.
- `scripts/run.sh`: Shell script to execute the demo.
- `requirements.txt`: Python dependencies.
# Computer Vision Project

This project is for computer vision tasks.
