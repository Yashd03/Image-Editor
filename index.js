// Selecting DOM elements
const imgEl = document.querySelector(".image img");
const filtersEl = document.querySelectorAll(".filter input[type='range']");
const toolsEl = document.querySelectorAll(".tools li");
const fileEl = document.querySelector(".file");
const chooseBtnEl = document.querySelector(".chooseBtn");
const saveBtnEl = document.querySelector(".saveBtn");
const resetBtnEl = document.querySelector(".resetBtn");

// Initial values for image filters and transformations
let saturation = 100,
    blur = 0,
    brightness = 100,
    contrast = 100;
let rotate = 0,
    flipH = 1,
    flipV = 1;

// Function to reset all values to initial conditions
const resetValues = () => {
    saturation = 100;
    blur = 0;
    brightness = 100;
    contrast = 100;
    rotate = 0;
    flipH = 1;
    flipV = 1;
    filtersEl.forEach(input => {
        if (input.id === "saturation") {
            input.value = 100;
            input.nextElementSibling.textContent = "100";
        } else if (input.id === "blur") {
            input.value = 0;
            input.nextElementSibling.textContent = "0";
        }
    });
}

// Function to generate the image preview based on filter and transformation values
const generateResult = () => {
    imgEl.style.filter = `saturate(${saturation}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
    imgEl.style.transform = `rotate(${rotate}deg) scaleX(${flipH}) scaleY(${flipV})`;
}

// Event listeners for tool adjustments
toolsEl.forEach(element => {
    element.addEventListener("click", () => {
        switch (element.id) {
            case "rotate-left":
                rotate -= 90;
                break;
            case "rotate-right":
                rotate += 90;
                break;
            case "flip-horizontal":
                flipH *= -1;
                break;
            case "flip-vertical":
                flipV *= -1;
                break;
            case "crop":
              const cropBtnEl = document.querySelector(".cropBtn");

              // Function to handle cropping
              const cropImage = () => {
                  // Code to crop the image
                  // Replace this comment with your cropping logic
                  alert("Image cropped!");
              };
              
              // Event listener for crop button
              cropBtnEl.addEventListener("click", () => {
                  cropImage();
              });
              
                break;
        }
        generateResult();
    });
});

// Event listeners for filter adjustments
filtersEl.forEach(element => {
    element.addEventListener("input", () => {
        switch (element.id) {
            case "saturation":
                saturation = element.value;
                break;
            case "blur":
                blur = element.value;
                break;
            case "brightness":
                brightness = element.value;
                break;
            case "contrast":
                contrast = element.value;
                break;
        }
        generateResult();
    });
});

// Event listener for file input (image selection)
fileEl.addEventListener("change", () => {
    const file = fileEl.files[0];
    if (!file) return;
    imgEl.src = URL.createObjectURL(file);
    imgEl.onload = () => {
        resetValues();
        generateResult();
    };
});

// Event listeners for buttons
chooseBtnEl.addEventListener("click", () => {
    fileEl.click();
});

saveBtnEl.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imgEl.naturalWidth;
    canvas.height = imgEl.naturalHeight;

    ctx.filter = `saturate(${saturation}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipH, flipV);
    ctx.drawImage(imgEl, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "ResultImage.jpg";
    link.href = canvas.toDataURL();
    link.click();
});

resetBtnEl.addEventListener("click", () => {
    resetValues();
    generateResult();
});

// Initial setup
generateResult();
