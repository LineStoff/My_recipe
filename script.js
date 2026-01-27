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

                li.textContent = `${newQty} ${unit} ${name}`;
            });
        });
    });
});
