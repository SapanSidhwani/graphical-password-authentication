import React, { useEffect, useState } from 'react';

const ImageSplitter = ({ image, password, setPassword, category, imgIndex }) => {

    const categoryLength = category.length;
    switch (category) {
        case "Cars":
            category = "1";
            break;
        case "Pets":
            category = "2";
            break;
        case "Flowers":
            category = "3";
            break;
        case "Bicycles":
            category = "4";
            break;
        default:
            break;
    }


    const [pieces, setPieces] = useState([]);

    let run = true;

    useEffect(() => {
        setPieces([]);
        const splitImage = () => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width / 3;
                canvas.height = img.height / 2;
                const context = canvas.getContext('2d');
                for (let row = 0; row < 2; row++) {
                    for (let col = 0; col < 3; col++) {
                        context.drawImage(
                            img,
                            col * canvas.width,
                            row * canvas.height,
                            canvas.width,
                            canvas.height,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );
                        const piece = canvas.toDataURL();
                        setPieces((prevPieces) => [...prevPieces, piece]);
                    }
                }
            };
            img.src = image;
        };
        if (run) {
            splitImage();
            // eslint-disable-next-line
            run = false;
        }
    }, [image]);
    function activeImg(event, index) {

        const target = event.target;
        const className = 'border-white';
        const strpassword = category + imgIndex.slice(categoryLength) + index;
        if (target.classList.contains(className)) {
            target.classList.remove(className);
            target.classList.add('border-danger');
            setPassword(password => [...password, strpassword]);
        } else {
            target.classList.remove('border-danger');
            target.classList.add(className);

            const updatedPassword = password.filter((pass) => pass !== strpassword);
            setPassword(updatedPassword);
        }
    }
    setTimeout(() => {
    }, 1000);
    return (
        <div className='container my-4' style={{ width: '550px' }}>
            <div className="row justify-content-center">
                {
                    pieces.map((piece, index) => {
                        if (password.includes(`${category}${imgIndex.slice(categoryLength)}${index}`)) {

                            return (
                                <div className="col-4 m-2 p-0 w-auto">
                                    <img
                                        className='rounded border border-danger border-4'
                                        style={{ height: '150px', width: '150px' }}
                                        key={index}
                                        src={piece}
                                        onClick={(event) => activeImg(event, index)}
                                        alt={`piece ${index}`}
                                    />
                                </div>
                            )
                        }
                        else {

                            return (
                                <div className="col-4 m-2 p-0 w-auto">
                                    <img
                                        className='rounded border border-white border-4'
                                        style={{ height: '150px', width: '150px' }}
                                        key={index}
                                        src={piece}
                                        onClick={(event) => activeImg(event, index)}
                                        alt={`piece${index}`}
                                    />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    );
};

export default ImageSplitter;
