document.querySelectorAll('.recette').forEach(recette => {
    const base = parseInt(recette.dataset.base);
    const input = recette.querySelector('.personnes');
    const ingredients = recette.querySelectorAll('li[data-qty]');

    input.addEventListener('input', () => {
        const personnes = parseInt(input.value);

        ingredients.forEach(item => {
            const qty = parseFloat(item.dataset.qty);
            const unit = item.dataset.unit;
            const newQty = (qty * personnes / base).toFixed(1);

            item.textContent = `${newQty} ${unit} ${item.textContent.replace(/^[0-9.,]+\s*\w*/, '').trim()}`;
        });
    });
});
