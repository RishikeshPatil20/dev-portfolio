// document.addEventListener("DOMContentLoaded", () => {
//     const timelineFillLine = document.querySelector(".timeline-line-fill");
//     const timelineContainer = document.querySelector(".timeline-container");

//     if (!timelineFillLine || !timelineContainer) {
//         console.warn("Timeline elements not found. Skipping animation.");
//         return;
//     }

//     const updateTimelineFill = () => {
//         const containerRect = timelineContainer.getBoundingClientRect();
//         const containerTop = containerRect.top + window.scrollY;
//         const containerHeight = timelineContainer.offsetHeight;
//         const scrollBottom = window.scrollY + window.innerHeight;

//         // Fill amount: how much of the container is visible
//         const fillAmount = scrollBottom - containerTop;

//         // Clamp the height between 0 and container height
//         const height = Math.max(0, Math.min(fillAmount, containerHeight));

//         timelineFillLine.style.height = `${height}px`;
//     };

//     window.addEventListener("scroll", updateTimelineFill);
//     window.addEventListener("resize", updateTimelineFill);
//     updateTimelineFill(); // Initial call
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const containers = document.querySelectorAll(".timeline-container");

//   const updateTimelineFill = () => {
//     containers.forEach((container) => {
//       const timelineFillLine = container.querySelector(".timeline-line-fill");
//       if (!timelineFillLine) return;

//       const containerRect = container.getBoundingClientRect();
//       const containerTop = window.scrollY + containerRect.top;
//       const containerHeight = container.offsetHeight;
//       const scrollBottom = window.scrollY + window.innerHeight;

//       const fillAmount = scrollBottom - containerTop;
//       const height = Math.max(0, Math.min(fillAmount, containerHeight));

//       timelineFillLine.style.height = `${height}px`;
//     });
//   };

//   window.addEventListener("scroll", updateTimelineFill);
//   window.addEventListener("resize", updateTimelineFill);
//   updateTimelineFill(); // Initial call
// });
document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".timeline-container");

    if (!containers.length) {
        console.warn("No timeline containers found. Skipping animation.");
        return;
    }

    const updateTimelineFills = () => {
        containers.forEach(container => {
            const fillLine = container.querySelector(".timeline-line-fill");
            const baseLine = container.querySelector(".timeline-line");

            if (!fillLine || !baseLine) return;

            const rect = baseLine.getBoundingClientRect();
            const baseTop = rect.top + window.scrollY;
            const scrollBottom = window.scrollY + window.innerHeight;
            const maxHeight = baseLine.offsetHeight;

            let fillHeight = scrollBottom - baseTop;

            // Clamp the fill height to avoid overshooting or gaps
            fillHeight = Math.max(0, Math.min(fillHeight, maxHeight - 2));

            fillLine.style.height = `${fillHeight}px`;
        });
    };

    window.addEventListener("scroll", updateTimelineFills);
    window.addEventListener("resize", updateTimelineFills);
    updateTimelineFills(); // initial run
});
