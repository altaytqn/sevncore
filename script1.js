const titles = [
    "⚡ kE5wgo",
    "⚡ BryEvo",
    "⚡ CrcBtoB",
    "⚡ k1yptoB",
    "⚡ krypto",
    "⚡ kryptoD",
    "⚡ kripto",
    "⚡ fyptol",
    "⚡ drypto",
    "⚡ DZYxtee",
    "⚡ krypt7o"
];

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    document.title = titles[randomIndex];
}, 700);