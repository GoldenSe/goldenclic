let gold = 0;
let pickaxeDurability = 100;

document.getElementById('clicker').addEventListener('click', () => {
    if (pickaxeDurability > 0) {
        // Случайное количество золота от 0.1 до 1
        let minedGold = Math.random() * (1 - 0.1) + 0.1;
        gold += minedGold;
        gold = Math.round(gold * 10) / 10; // Округляем до одной цифры после запятой
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;

        // Уменьшаем прочность кирки
        pickaxeDurability -= 0.5;
        if (pickaxeDurability < 0) pickaxeDurability = 0;
        document.getElementById('pickaxeStatus').textContent = `Прочность кирки: ${pickaxeDurability}%`;
    } else {
        alert('Кирка сломалась! Вы не можете добывать золото.');
    }
});

// Подключение к Tonkeeper
document.getElementById('connectTonkeeper').addEventListener('click', () => {
    let tonkeeperUrl = "https://app.tonkeeper.com/transfer/<адрес_получателя>?amount=<сумма>";
    window.open(tonkeeperUrl, "_blank");
});
