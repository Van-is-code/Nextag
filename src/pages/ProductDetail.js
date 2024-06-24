import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsList } from '../helpers/ProductsList';
import '../style/ProductDetail.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import 'bootstrap/dist/css/bootstrap.min.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ProductDetail() {
  const { id } = useParams();
  const product = ProductsList.find((p) => p.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const downloadProductInfo = () => {
    const docDefinition = {
      content: [
        { text: `Name: ${product.name}`, fontSize: 14, style: { color: 'red' } },
        { text: `\nBrand: ${product.brand}`, fontSize: 14 },
        { text: `\nPrice: $${product.price}`, fontSize: 14, style: { color: 'orange' } },
        { text: `\nReview: ${product.review}`, fontSize: 14 },
      ],
    };

    const pdfName = `${product.name}_info.pdf`;

    pdfMake.createPdf(docDefinition).download(pdfName);
  };


  return (
    <div className="product-detail-container">
      <div className="image-container">
        <div>
        <div>
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="product-pic"
        />
        </div>
        </div>
        <button className="prev-image-btn" onClick={prevImage}>
          &larr;
        </button>
        <button className="next-image-btn" onClick={nextImage}>
          &rarr;
        </button>
      </div>
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-brand">Brand: {product.brand}</p>
        <p className="product-brand">Styles: {product.styles}</p>
        <p className="product-brand">Made in: {product.origin}</p>
        <p className="product-brand">Dimension: {product.dimension}</p>
        <p className="product-brand">Material: {product.material}</p>
        <p className="product-brand">Weight: {product.weight}</p>
        <p className="product-price">Price: ${product.price}</p>
        <button className="downloadmoreinfo" onClick={downloadProductInfo}>
          Download more info
        </button>
        <button className="add-to-cart-btn">Add to Cart</button>
        <p className='text3'></p>
      </div>
    </div>
  );
}

export default ProductDetail;
