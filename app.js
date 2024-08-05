const secretKey = 'mySecretKey'; // Ваш секретный ключ для шифрования
let gold = 0;
let pickaxeDurability = 100;
let ethereum;

// Инициализация MetaMask SDK
const MMSDK = new MetaMaskSDK.MetaMaskSDK({
    dappMetadata: {
        name: "Кликер золота",
        url: window.location.href
    },
    infuraAPIKey: 'YOUR_INFURA_API_KEY' // Убедитесь, что заменили YOUR_INFURA_API_KEY на ваш ключ
});

document.addEventListener('DOMContentLoaded', () => {
    ethereum = MMSDK.getProvider();
    if (ethereum) {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                document.getElementById('userInfo').classList.remove('hidden');
                document.getElementById('userAddress').textContent = `Адрес: ${accounts[0]}`;
                // Здесь вы можете получить баланс токенов или другие данные
                // Например, получить ETH баланс
                return ethereum.request({
                    method: 'eth_getBalance',
                    params: [accounts[0], 'latest']
                });
            })
            .then(balance => {
                const balanceInEth = parseFloat(ethereum.utils.formatEther(balance));
                document.getElementById('userBalance').textContent = `Баланс: ${balanceInEth} ETH`;
            })
            .catch(error => {
                console.error('Ошибка подключения MetaMask:', error);
            });
    }

    loadGold();
});

function saveGold() {
    const encryptedGold = CryptoJS.AES.encrypt(gold.toString(), secretKey).toString();
    localStorage.setItem('gold', encryptedGold);
}

function loadGold() {
    const encryptedGold = localStorage.getItem('gold');
    if (encryptedGold) {
        const bytes = CryptoJS.AES.decrypt(encryptedGold, secretKey);
        const decryptedGold = bytes.toString(CryptoJS.enc.Utf8);
        gold = parseFloat(decryptedGold);
        gold = Math.round(gold * 10) / 10;
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;
    }
}

document.getElementById('clicker').addEventListener('click', () => {
    if (pickaxeDurability > 0) {
        let minedGold = Math.random() * (1 - 0.1) + 0.1;
        gold += minedGold;
        gold = Math.round(gold * 10) / 10; // Округляем до одной цифры после запятой
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;

        pickaxeDurability -= 0.5;
        if (pickaxeDurability < 0) pickaxeDurability = 0;
        document.getElementById('pickaxeStatus').textContent = `Прочность кирки: ${pickaxeDurability}%`;

        saveGold(); // Сохраняем золото при клике
    } else {
        alert('Кирка сломалась! Вы не можете добывать золото.');
    }
});

document.getElementById('connectMetaMask').addEventListener('click', () => {
    if (ethereum) {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                document.getElementById('userInfo').classList.remove('hidden');
                document.getElementById('userAddress').textContent = `Адрес: ${accounts[0]}`;
                return ethereum.request({
                    method: 'eth_getBalance',
                    params: [accounts[0], 'latest']
                });
            })
            .then(balance => {
                const balanceInEth = parseFloat(ethereum.utils.formatEther(balance));
                document.getElementById('userBalance').textContent = `Баланс: ${balanceInEth} ETH`;
            })
            .catch(error => {
                console.error('Ошибка при подключении MetaMask:', error);
            });
    } else {
        alert('MetaMask не найден. Установите MetaMask, чтобы продолжить.');
    }
});

document.getElementById('repairPickaxe').addEventListener('click', () => {
    if (gold >= 1) { // Предположим, что ремонт кирки стоит 1 золото
        gold -= 1;
        gold = Math.round(gold * 10) / 10; // Округляем до одной цифры после запятой
        pickaxeDurability = 100; // Восстанавливаем кирку
        document.getElementById('goldDisplay').textContent = `Золото: ${gold}`;
        document.getElementById('pickaxeStatus').textContent = `Прочность кирки: ${pickaxeDurability}%`;
        saveGold(); // Сохраняем золото при ремонте
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
