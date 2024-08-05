let gold = 0;
let pickaxeDurability = 100;

document.getElementById('clicker').addEventListener('click', () => {
    if (pickaxeDurability > 0) {
        let minedGold = Math.random() * (1 - 0.1) + 0.1;
        gold += minedGold;
        gold = Math.round(gold * 10) / 10; // Округляем до одной цифры после запятой
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;

        pickaxeDurability -= 0.5;
        if (pickaxeDurability < 0) pickaxeDurability = 0;
        document.getElementById('pickaxeStatus').textContent = `Прочность кирки: ${pickaxeDurability}%`;
    } else {
        alert('Кирка сломалась! Вы не можете добывать золото.');
    }
});

document.getElementById('connectTonkeeper').addEventListener('click', () => {
    const address = document.getElementById('addressInput').value;
    if (address) {
        const amount = (gold * 1000000000).toFixed(0); // Преобразование золота в нанотонкоины
        const tonkeeperUrl = `https://app.tonkeeper.com/transfer/${address}?amount=${amount}`;
        window.open(tonkeeperUrl, "_blank");
    } else {
        alert('Пожалуйста, введите адрес получателя.');
    }
});

document.getElementById('repairPickaxe').addEventListener('click', () => {
    if (gold >= 1) { // Предположим, что ремонт кирки стоит 1 золото
        gold -= 1;
        gold = Math.round(gold * 10) / 10; // Округляем до одной цифры после запятой
        pickaxeDurability = 100; // Восстанавливаем кирку
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;
        document.getElementById('pickaxeStatus').textContent = `Прочность кирки: ${pickaxeDurability}%`;
    } else {
        alert('Недостаточно золота для ремонта кирки.');
    }
});

document.getElementById('withdrawGold').addEventListener('click', () => {
    const address = document.getElementById('addressInput').value;
    if (address) {
        const amount = (gold * 1000000000).toFixed(0); // Преобразование золота в нанотонкоины
        const tonkeeperUrl = `https://app.tonkeeper.com/transfer/${address}?amount=${amount}`;
        window.open(tonkeeperUrl, "_blank");
    } else {
        alert('Пожалуйста, введите адрес получателя.');
    }
});
