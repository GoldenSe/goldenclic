package com.example.clicker;

import drinkless.org.ton.TonApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ton")
public class TonController {

    @Autowired
    private TonClient tonClient;

    @PostMapping("/createWallet")
    public TonApi.AccountAddress createWallet() {
        return tonClient.createWallet();
    }

    @GetMapping("/getBalance/{address}")
    public TonApi.Account getBalance(@PathVariable String address) {
        TonApi.AccountAddress accountAddress = new TonApi.AccountAddress(address);
        return tonClient.getBalance(accountAddress);
    }

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestParam String address, @RequestParam String message) {
        TonApi.AccountAddress accountAddress = new TonApi.AccountAddress(address);
        tonClient.sendMessage(accountAddress, message);
    }
}
