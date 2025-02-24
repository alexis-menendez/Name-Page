document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars-container');
  const gradientBox = document.getElementById('gradient-box');
  const circle = document.getElementById('circle');
  const h1 = document.querySelector('#circle h1');

  const boxWidth = gradientBox.offsetWidth;
  const boxHeight = gradientBox.offsetHeight;

  const circleRect = circle.getBoundingClientRect();
  const circleX = circleRect.left + circleRect.width / 2;
  const circleY = circleRect.top + circleRect.height / 2;

  const movingStars = [];
  const staticStars = [];
  const movingStarSizes = [
    { size: 8, quantity: 1 },
    { size: 7, quantity: 2 },
    { size: 6, quantity: 2 },
    { size: 5, quantity: 10 },
    { size: 4, quantity: 25 },
    { size: 3, quantity: 50 },
    { size: 2, quantity: 150 },
    { size: 1, quantity: 250 }
  ];
  const staticStarSizes = [
    { size: 8, quantity: 0 },
    { size: 7, quantity: 0 },
    { size: 6, quantity: 0 },
    { size: 5, quantity: 0 },
    { size: 4, quantity: 0 },
    { size: 3, quantity: 0 },
    { size: 2, quantity: 0 },
    { size: 1, quantity: 250 }
  ];

  const greatbird = [
    // Head, Body, Tail
      { x: 0.8, y: 0.6, size: 7 },   // Great Bird Star 1
      { x: 0.84, y: 0.7, size: 5 },  // Great Bird Star 2
      { x: 0.9, y: 0.8, size: 3 }, // Great Bird Star 3
      { x: 0.94, y: 0.9, size: 2 },  // Great Bird Star 4
      { x: 0.95, y: 0.93, size: 2 },  // Great Bird Star 5

    // Back up the Body
      { x: 0.94, y: 0.9, size: 2 },  // Great Bird Star 4
      { x: 0.9, y: 0.8, size: 3 }, // Great Bird Star 3
      { x: 0.84, y: 0.7, size: 5 },  // Great Bird Star 2

    // Left Wing
      { x: 0.81, y: 0.85, size: 2 },  // Great Bird Star 6
      { x: 0.79, y: 0.90, size: 4 },  // Great Bird Star 7
      { x: 0.75, y: 0.95, size: 3 },  // Great Bird Star 8

    // Back up the Left Wing
    { x: 0.79, y: 0.90, size: 4 },  // Great Bird Star 7
      { x: 0.81, y: 0.85, size: 2 },  // Great Bird Star 6
      { x: 0.84, y: 0.7, size: 5 },  // Great Bird Star 2

    // Right Wing
      { x: 0.9, y: 0.6, size: 2 },  // Great Bird Star 7
      { x: 0.92, y: 0.4, size: 3 },  // Great Bird Star 6
      { x: 0.93, y: 0.35, size: 3 },  // Great Bird Star 2

  ];

  const libra = [
    { x: 0.023, y: 0.48, size: 2 },     // Libra Star 1
    { x: 0.040, y: 0.46, size: 2 },     // Libra Star 2
    { x: 0.060, y: 0.45, size: 3 },     // Libra Star 3
    { x: 0.10, y: 0.30, size: 6 },      // Libra Star 4
    { x: 0.16, y: 0.47, size: 5 },      // Libra Star 5
    { x: 0.11, y: 0.65, size: 4 },      // Libra Star 6
    { x: 0.048, y: 0.7, size: 3 },      // Libra Star 7
    { x: 0.043, y: 0.74, size: 2 },     // Libra Star 8
  ];

  function doesOverlap(x, y, starSize) {
    // Check against the circle
    const distanceFromCircle = Math.sqrt(
      Math.pow(x - circleX, 2) +
      Math.pow(y - circleY, 2)
    );
    if (distanceFromCircle < circleRect.width / 2 + starSize) {
      return true; // Overlaps with the circle
    }

    // Check against other stars
    for (const star of movingStars.concat(staticStars)) {
      const distanceFromStar = Math.sqrt(
        Math.pow(x - star.x, 2) +
        Math.pow(y - star.y, 2)
      );
      if (distanceFromStar < starSize * 2) {
        return true; // Overlaps with another star
      }
    }

    return false; // No overlap
  }

  function createStars(starSizes, starArray, container) {
    starSizes.forEach(({ size, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        let x, y;

        let attempts = 0;
        const maxAttempts = 1000; // Avoid infinite loops

        do {
          x = Math.random() * boxWidth;
          y = Math.random() * boxHeight;
          attempts++;
        } while (doesOverlap(x, y, size) && attempts < maxAttempts);

        if (attempts === maxAttempts) {
          console.warn(`Could only place ${movingStars.length + staticStars.length} stars out of ${quantity}`);
          break; // Stop placing stars if max attempts are reached
        }

        const star = { x, y, size };
        starArray.push(star);

        // Create and style the star
        const starElement = document.createElement('div');
        starElement.classList.add('star');
        starElement.style.width = `${size}px`;
        starElement.style.height = `${size}px`;
        starElement.style.left = `${x}px`;
        starElement.style.top = `${y}px`;

        container.appendChild(starElement);
      }
    });
  }

  function createConstellation(stars, container, additionalLines = []) {
    stars.forEach(({ x, y, size }) => {
      const star = { x: x * boxWidth, y: y * boxHeight, size };
      staticStars.push(star);

      // Create and style the star
      const starElement = document.createElement('div');
      starElement.classList.add('star');
      starElement.style.width = `${size}px`;
      starElement.style.height = `${size}px`;
      starElement.style.left = `${star.x}px`;
      starElement.style.top = `${star.y}px`;

      container.appendChild(starElement);
    });

    // Draw lines between the stars
    const canvas = document.createElement('canvas');
    canvas.width = boxWidth;
    canvas.height = boxHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;

    ctx.beginPath();
    stars.forEach(({ x, y }, index) => {
      const starX = x * boxWidth;
      const starY = y * boxHeight;
      if (index === 0) {
        ctx.moveTo(starX, starY);
      } else {
        ctx.lineTo(starX, starY);
      }
    });
    ctx.stroke();

    // Draw additional lines
    additionalLines.forEach(([startIndex, endIndex]) => {
      const startStar = stars[startIndex];
      const endStar = stars[endIndex];
      ctx.beginPath();
      ctx.moveTo(startStar.x * boxWidth, startStar.y * boxHeight);
      ctx.lineTo(endStar.x * boxWidth, endStar.y * boxHeight);
      ctx.stroke();
    });
  }

  // Create separate containers for moving and static stars
  const movingStarsContainer = document.createElement('div');
  const staticStarsContainer = document.createElement('div');
  movingStarsContainer.id = 'moving-stars-container';
  staticStarsContainer.id = 'static-stars-container';
  starsContainer.appendChild(movingStarsContainer);
  starsContainer.appendChild(staticStarsContainer);

  createStars(movingStarSizes, movingStars, movingStarsContainer);
  createStars(staticStarSizes, staticStars, staticStarsContainer);
  createConstellation(greatbird, staticStarsContainer);
  createConstellation(libra, staticStarsContainer, [[3, 5]]); // Add line between Libra star 4 and Libra star 6

  function moveStarsToCenter() {
    const groups = [
      { sizes: [8, 1], delay: 0 },
      { sizes: [7, 2], delay: 5 },
      { sizes: [6, 3], delay: 10 },
      { sizes: [5, 4], delay: 15 }
    ];

    groups.forEach(group => {
      group.sizes.forEach(size => {
        const starsToMove = movingStars.filter(star => star.size === size);
        starsToMove.forEach((star, index) => {
          const starElement = movingStarsContainer.children[movingStars.indexOf(star)];
          setTimeout(() => {
            starElement.style.transform = `translate(${circleX - star.x}px, ${circleY - star.y}px)`;
          }, group.delay + index * 10); // Adjust delay for staggered effect within the group
        });
      });
    });

    // Move size 1, size 2, and size 3 stars in groups of 3
    [1, 2, 3].forEach(size => {
      const sizeStars = movingStars.filter(star => star.size === size);
      sizeStars.forEach((star, index) => {
        const starElement = movingStarsContainer.children[movingStars.indexOf(star)];
        setTimeout(() => {
          starElement.style.transform = `translate(${circleX - star.x}px, ${circleY - star.y}px)`;
        }, Math.floor(index / 3) * 10); // Move 3 stars at a time
      });
    });
  }

  function resetStars() {
    const groups = [
      { sizes: [8, 1], delay: 0 },
      { sizes: [7, 2], delay: 5 },
      { sizes: [6, 3], delay: 10 },
      { sizes: [5, 4], delay: 15 }
    ];

    groups.forEach(group => {
      group.sizes.forEach(size => {
        const starsToMove = movingStars.filter(star => star.size === size).reverse();
        starsToMove.forEach((star, index) => {
          const starElement = movingStarsContainer.children[movingStars.indexOf(star)];
          setTimeout(() => {
            starElement.style.transform = 'translate(0, 0)';
          }, group.delay + index * 10); // Adjust delay for staggered effect within the group
        });
      });
    });

    // Move size 1, size 2, and size 3 stars in groups of 3
    [1, 2, 3].forEach(size => {
      const sizeStars = movingStars.filter(star => star.size === size).reverse();
      sizeStars.forEach((star, index) => {
        const starElement = movingStarsContainer.children[movingStars.indexOf(star)];
        setTimeout(() => {
          starElement.style.transform = 'translate(0, 0)';
        }, Math.floor(index / 3) * 10); // Move 3 stars at a time
      });
    });
  }

  circle.addEventListener('mouseenter', () => {
    moveStarsToCenter();
    circle.classList.add('hover');
    staticStarsContainer.classList.add('transparent'); // Add this line
});

circle.addEventListener('mouseleave', () => {
    resetStars();
    circle.classList.remove('hover');
    staticStarsContainer.classList.remove('transparent'); // Add this line
});


// change color of gradiet box when hovering over header 1
h1.addEventListener('mouseenter', () => {
  gradientBox.classList.add('hovered');
  circle.classList.add('hovered');
  staticStarsContainer.classList.add('faded');
});

h1.addEventListener('mouseleave', () => {
  gradientBox.classList.remove('hovered');
  circle.classList.remove('hovered');
  staticStarsContainer.classList.remove('faded');
});

// change opacity of clouds when hovering over header 1
h1.addEventListener('mouseenter', () => {
  const clouds = [
    document.getElementById('cloud1'),
    document.getElementById('cloud2'),
    document.getElementById('cloud3'),
    document.getElementById('cloud4'),
    document.getElementById('cloud5')
  ];

  clouds.forEach((cloud) => {
    cloud.classList.add('animate');
  });
});

h1.addEventListener('mouseleave', () => {
  const clouds = [
    document.getElementById('cloud1'),
    document.getElementById('cloud2'),
    document.getElementById('cloud3'),
    document.getElementById('cloud4'),
    document.getElementById('cloud5')
  ];

  clouds.forEach((cloud) => {
    cloud.classList.remove('animate');
  });
});

// Add springy hover effect to moving stars
gradientBox.addEventListener('mousemove', (event) => {
  // Ensure the effect doesn't apply when hovering over the circle
  if (circle.matches(':hover')) {
    return;
  }

  const rect = gradientBox.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  movingStars.forEach((star, index) => {
    const starElement = movingStarsContainer.children[index];

    // Calculate the distance from the mouse to the star
    const distanceX = mouseX - star.x;
    const distanceY = mouseY - star.y;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Only move stars within a certain radius (e.g., 150px)
    const maxDistance = 150;
    if (distance < maxDistance) {
      const effectStrength = 1 - distance / maxDistance; // Closer stars move more

      // Calculate the offset with diminishing intensity based on distance
      const offsetX = (distanceX / .25) * effectStrength; // Adjust divisor for "springiness"
      const offsetY = (distanceY / .25) * effectStrength;

      // Apply the transform
      starElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + 0.1 * effectStrength})`;
    } else {
      // Reset stars outside the interaction radius
      starElement.style.transform = 'translate(0, 0) scale(1)';
    }
  });
});

// Reset all stars when the mouse leaves the gradient box
gradientBox.addEventListener('mouseleave', () => {
  movingStars.forEach((star, index) => {
    const starElement = movingStarsContainer.children[index];
    starElement.style.transform = 'translate(0, 0) scale(1)'; // Reset position and scale
  });
});

});