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

## Manual Setup for `hy3dshape` Module (Important)

Due to limitations in the automated setup environment, the `hy3dshape` Python module (source from the `hunyuan3d-dit-v2-1` directory on Hugging Face) could not be downloaded automatically. You will need to manually ensure these files are in place:

1.  **Go to the Hugging Face repository:**
    [https://huggingface.co/tencent/Hunyuan3D-2.1/tree/main](https://huggingface.co/tencent/Hunyuan3D-2.1/tree/main)

2.  **Navigate to the `hunyuan3d-dit-v2-1` directory.**

3.  **Download the contents of this directory.**
    You can do this by:
    *   Cloning the entire `tencent/Hunyuan3D-2.1` repository locally using `git clone https://huggingface.co/tencent/Hunyuan3D-2.1` and then `git lfs pull` (if you want the full model checkpoints).
    *   Or, selectively downloading the Python files and subdirectories from `hunyuan3d-dit-v2-1` if you only want the script structure and plan to let the script download checkpoints on first run. Key files include `pipelines.py`, `__init__.py`, `dit.py`, `rembg.py` and any other Python files or sub-modules within it.

4.  **Place the downloaded contents into the project:**
    *   Create a directory named `hy3dshape` inside `packages/computer-vision/src/`.
    *   Copy all the files and subdirectories from the `hunyuan3d-dit-v2-1` (that you downloaded) into `packages/computer-vision/src/hy3dshape/`.
    *   Ensure that `packages/computer-vision/src/hy3dshape/` contains at least `__init__.py` and `pipelines.py` among other necessary Python files from the original `hunyuan3d-dit-v2-1` Hugging Face directory.

**Without this manual step, the `demo.py` script will fail with a `ModuleNotFoundError` for `hy3dshape.pipelines`.**

## Project Structure

- `assets/demo.png`: Input image (user-provided).
- `src/demo.py`: The main Python script to run the Hunyuan3D model.
- `src/hy3dshape/`: **(Manual Setup Required)** Contains code for shape generation from `hunyuan3d-dit-v2-1`. See "Manual Setup for `hy3dshape` Module".
- `src/hy3dpaint/`: Contains code for texture painting (adapted from Hunyuan3D).
- `src/hunyuan3d-vae-v2-1/`: Contains VAE model components.
- `scripts/run.sh`: Shell script to execute the demo.
- `requirements.txt`: Python dependencies.
# Computer Vision Project

This project is for computer vision tasks.
