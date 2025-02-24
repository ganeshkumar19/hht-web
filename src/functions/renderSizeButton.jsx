export const renderSizeButton = (size, selectedSize, setSelectedSize) => {
    const isSizeOutOfStock = size.productQuantity === 0;
    return (
        <button
            key={size.id}
            className={`selectSizeButton ${selectedSize === size.size ? 'active' : ''} ${
              isSizeOutOfStock ? 'disabled-size' : ''
            }`}
            onClick={() => setSelectedSize(size.size)}
            disabled={isSizeOutOfStock}
            title={isSizeOutOfStock ? 'Out of stock' : ''}
        >
            {size.size}
        </button>
    );
};