let gold = 0;
let pickaxeDurability = 100;

document.getElementById('clicker').addEventListener('click', async () => {
    if (pickaxeDurability > 0) {
        let minedGold = Math.random() * (1 - 0.1) + 0.1;
        gold += minedGold;
        gold = Math.round(gold * 10) / 10;
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;

        pickaxeDurability -= 0.5;
        if (pickaxeDurability < 0) pickaxeDurability = 0;
        document.getElementById('pickaxeStatus').textContent = `Прочность кирки: ${pickaxeDurability}%`;

        // Отправка данных на сервер
        await fetch('/api/updateGameState', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gold, pickaxeDurability })
        });
    } else {
        alert('Кирка сломалась! Вы не можете добывать золото.');
    }
});

// Подключение к Tonkeeper
document.getElementById('connectTonkeeper').addEventListener('click', () => {
    let tonkeeperUrl = `https://app.tonkeeper.com/transfer/<адрес_получателя>?amount=${gold}`;
    window.open(tonkeeperUrl, "_blank");
});
