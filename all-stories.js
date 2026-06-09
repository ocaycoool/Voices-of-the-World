// Makes it wait until the entire HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
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
    const storyLinks = document.querySelectorAll('.cards-container a');
    console.log(`[Story Expander] Connected! Injecting styles and managing ${storyLinks.length} cards.`);

    storyLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
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
});