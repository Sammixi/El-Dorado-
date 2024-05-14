document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-product-image');
    const lens = document.getElementById('lens');
    const thumbnails = document.querySelectorAll('.thumbnail img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newSrc = thumbnail.getAttribute('data-src');
            mainImage.src = newSrc;
        });

        thumbnail.addEventListener('mouseover', () => {
            const newSrc = thumbnail.getAttribute('data-src');
            mainImage.src = newSrc;
        });
    });

    mainImage.addEventListener('mousemove', moveLens);
    mainImage.addEventListener('mouseenter', () => lens.style.visibility = 'visible');
    mainImage.addEventListener('mouseleave', () => lens.style.visibility = 'hidden');

    function moveLens(e) {
        const rect = mainImage.getBoundingClientRect();
        const lensWidth = lens.offsetWidth;
        const lensHeight = lens.offsetHeight;
        
        // Position the lens 20px to the right and 20px below the mouse cursor
        let lensX = e.clientX + 20;
        let lensY = e.clientY + 20;
        
        // Boundary checks to ensure the lens stays within the viewport
        const minX = window.pageXOffset + 20;
        const minY = window.pageYOffset + 20;
        const maxX = window.pageXOffset + window.innerWidth - lensWidth - 20;
        const maxY = window.pageYOffset + window.innerHeight - lensHeight - 20;

        lensX = Math.max(minX, Math.min(lensX, maxX));
        lensY = Math.max(minY, Math.min(lensY, maxY));

        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';
        lens.style.backgroundImage = `url(${mainImage.src})`;
        lens.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`;
        lens.style.backgroundPosition = `-${(e.clientX - rect.left) * 2 - lensWidth / 2}px -${(e.clientY - rect.top) * 2 - lensHeight / 2}px`;
    }
});
