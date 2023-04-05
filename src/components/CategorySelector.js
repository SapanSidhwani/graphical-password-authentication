
import React, { useState } from "react";
import ImageSplitter from "./ImageSplitter";

import car1Image from "../images/cars/car1.jpg";
import car2Image from "../images/cars/car2.jpg";
import car3Image from "../images/cars/car3.jpg";
import pet1Image from "../images/pets/pet1.jpg";
import pet2Image from "../images/pets/pet2.jpg";
import pet3Image from "../images/pets/pet3.jpg";
import flower1Image from "../images/flowers/flower1.jpg";
import flower2Image from "../images/flowers/flower2.jpg";
import flower3Image from "../images/flowers/flower3.jpg";
import bicycle1Image from "../images/bicycles/bicycle1.jpg";
import bicycle2Image from "../images/bicycles/bicycle2.jpg";
import bicycle3Image from "../images/bicycles/bicycle3.jpg";

function CategorySelector({ password, setPassword }) {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [imgIndex, setImgIndex] = useState("");

    function showCategoryImages(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const category = selectedOption.value;
        const categoryName = selectedOption.text;
        setSelectedCategory(category);
        setSelectedCategoryName(categoryName);
        setSelectedImage("");
    }

    const images = {
        cars: [car1Image, car2Image, car3Image],
        pets: [pet1Image, pet2Image, pet3Image],
        flowers: [flower1Image, flower2Image, flower3Image],
        bicycles: [bicycle1Image, bicycle2Image, bicycle3Image]
    };

    function handleImageClick(event, image) {

        setImgIndex(event.target.alt);
        setSelectedImage(image);
    }
    return (
        <>
            <label className="form-label" htmlFor="categories">
                Select a category:
            </label>
            <select
                className="form-select text-center mb-3"
                id="categories"
                name="categories"
                onChange={showCategoryImages}
            >
                <option value="" disabled hidden selected>
                    -- Select a category --
                </option>
                <option value="cars">Cars</option>
                <option value="pets">Pets</option>
                <option value="flowers">Flowers</option>
                <option value="bicycles">Bicycles</option>
            </select>

            {selectedCategory && (
                <div className="border rounded-4 bg-body-tertiary">
                    <h2 className="mt-2 text-center">{selectedCategoryName}</h2>
                    <hr />
                    <div className="row justify-content-around">
                        {/* img-container */}
                        {images[selectedCategory].map((imagePath, index) => (
                            <img
                                className="rounded p-0 border-2 m-3 col-auto"
                                style={{ height: "200px", width: "200px", cursor: "pointer" }}
                                key={index}
                                src={imagePath}
                                alt={`${selectedCategoryName}${index + 1}`}
                                onClick={(event) => handleImageClick(event, imagePath)}
                            />
                        ))}
                    </div>
                </div>
            )}
            {selectedImage && <ImageSplitter image={selectedImage} password={password} setPassword={setPassword} category={selectedCategoryName} imgIndex={imgIndex} />}
        </>
    );
}

export default CategorySelector;