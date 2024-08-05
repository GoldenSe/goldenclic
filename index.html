<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker App</title>
    <script>
        async function createWallet() {
            const response = await fetch('/api/ton/createWallet', { method: 'POST' });
            const wallet = await response.json();
            document.getElementById('wallet-address').innerText = wallet;
        }

        async function getBalance() {
            const address = document.getElementById('wallet-address').innerText;
            const response = await fetch(`/api/ton/getBalance/${address}`);
            const balance = await response.json();
            document.getElementById('wallet-balance').innerText = balance;
        }

        async function sendMessage() {
            const address = document.getElementById('wallet-address').innerText;
            const message = document.getElementById('message').value;
            await fetch(`/api/ton/sendMessage?address=${address}&message=${message}`, { method: 'POST' });
        }
    </script>
</head>
<body>
    <h1>Clicker App</h1>
    <div>
        <button onclick="createWallet()">Create Wallet</button>
        <p>Wallet Address: <span id="wallet-address"></span></p>
        <p>Balance: <span id="wallet-balance"></span></p>
        <button onclick="getBalance()">Get Balance</button>
    </div>
    <div>
        <input type="text" id="message" placeholder="Message">
        <button onclick="sendMessage()">Send Message</button>
    </div>
</body>
</html>
