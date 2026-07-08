function injectStyles() {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .expanded-card {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 80vw !important;
            height: 80vh !important;
            z-index: 9999 !important;
            margin: 0 !important;
            box-shadow: 0 0 0 100vw rgba(0,0,0,0.7) !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
        }

        .expanded-card .card-text {
            width: calc(100% - 28px) !important;
            height: calc(100% - 28px) !important;
            overflow-y: auto !important;
            cursor: default !important;
        }
    `;
    document.head.appendChild(styleTag);

    // choosing + config story cards
    const storyLinks = document.querySelectorAll('.cards-container .card');
    console.log(`[Story Expander] Connected! Injecting styles and managing ${storyLinks.length} cards.`);

    storyLinks.forEach((link, index) => {
        link.addEventListener('click', function (event) {
            // Prevent navigating away to written stories
            event.preventDefault();

            // Find the active card inside the link (.card, .card2, etc.)
            const card = this.querySelector('div') || this.firstElementChild;

            if (!card) return;

            // Toggle expansion state
            if (card.classList.contains('expanded-card')) {
                card.classList.remove('expanded-card');
            } else {
                // Close any other open cards first
                document.querySelectorAll('.expanded-card').forEach(openCard => {
                    openCard.classList.remove('expanded-card');
                });

                // Open clicked card
                card.classList.add('expanded-card');
            }
        });
    });
}

function appendStoriesToDOM(stories) {
    const container = document.querySelector('.cards-container');
    for (let index = 0; index < stories.length; index++) {
        const story = stories[index];
        const childDiv = document.createElement("div");
        childDiv.className = "card-text";
        const storyText = document.createElement("p");
        storyText.textContent = story.story;
        childDiv.appendChild(storyText);

        const parentDiv = document.createElement("div");
        parentDiv.className = "card";

        parentDiv.appendChild(childDiv);

        const metaText = document.createElement("div");
        metaText.className = "metaText";
        metaText.style.padding = "10px";
        metaText.style.fontFamily = "'Cinzel', serif";

        // Add this line right above your metaText.innerHTML to format the date string
        const formattedDate = story.date ? new Date(story.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

        metaText.innerHTML = `<h4 style="margin:0; color:#76a5af;">${story.name || 'Anonymous'}</h4>
                            <p style="margin:0; font-size:12px; color:#555;">${formattedDate}</p>`;
        parentDiv.appendChild(metaText);

        container.appendChild(parentDiv);
    }
    injectStyles();
}

function setLoading(elementSelector, isLoading){
    const container = document.querySelector(elementSelector);
    if(isLoading){
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "loading-container";
        loadingDiv.textContent = "loading...";
        container.appendChild(loadingDiv);
    } else{
        const loadingDiv = document.querySelector(".loading-container");
        loadingDiv.remove();
    }
}

const PATH = "https://script.google.com/macros/s/AKfycbwHLm2t0b2FBCe4M6AqgrA398VQPZJW9nhvmG5C0RprjhLm_Dy6nB6NyOASMPn5P9T0bg/exec";
function getStories() {
    const url = new URL(PATH);
    url.searchParams.append("filter","featured");
    setLoading(".cards-container", true);
    return fetch(url)
        .then(response => response.json())
        .then(response => response.data)
        .finally(()=>setLoading(".cards-container", false));
}

// Makes it wait until the entire HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    getStories().then(appendStoriesToDOM);

});