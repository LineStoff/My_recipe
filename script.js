//quantités photos
document.addEventListener("DOMContentLoaded", () => {
    const recettes = document.querySelectorAll(".recette-info");

    recettes.forEach(recette => {
        const base = parseInt(recette.dataset.base);
        const input = recette.querySelector(".personnes");
        const ingredients = recette.querySelectorAll("li");

        // On sauvegarde le texte original pour ne pas le perdre
        ingredients.forEach(li => {
            li.dataset.original = li.textContent;
        });

        input.addEventListener("input", () => {
            const personnes = parseInt(input.value);

            ingredients.forEach(li => {
                const qty = parseFloat(li.dataset.qty);
                const unit = li.dataset.unit || "";
                const originalText = li.dataset.original;

                // On récupère le nom de l’ingrédient après la quantité
                const name = originalText.split(" ").slice(2).join(" ");

                const newQty = (qty / base) * personnes;


                if( newQty < 1 )
                {
                    li.textContent = `${newQty.toFixed(2)} ${unit} ${name}`;
                }
                else
                {
                    li.textContent = `${Math.round(newQty)} ${unit} ${name}`;
                }
            });
        });
    });
});



//defilement des photos 
document.querySelectorAll(".carrousel").forEach(carrousel => {
    const images = carrousel.querySelectorAll("img");
    const prev = carrousel.querySelector(".prev");
    const next = carrousel.querySelector(".next");

    let index = 0;

    function showImage(i) {
        images.forEach(img => img.classList.remove("active"));
        images[i].classList.add("active");
    }

    next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        showImage(index);
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    });
});



//sous categories 
const buttons = document.querySelectorAll(".sous-categories button");
const cartes = document.querySelectorAll(".carte");

// Active "Tout" au chargement
document.querySelector('.sous-categories button[data-filter="all"]').classList.add("active");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Retire l'état actif de tous les boutons
        buttons.forEach(b => b.classList.remove("active"));

        // Ajoute l'état actif au bouton cliqué
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cartes.forEach(carte => {
            const cat = carte.dataset.cat || "";

            if (filter === "all" || cat.includes(filter)) {
                carte.style.display = "block";
            } else {
                carte.style.display = "none";
            }
        });
    });
});
