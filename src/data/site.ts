// Globální obsah webu — zrcadlí entitu `Nastaveni` (kontakt makléřky lze měnit v CMS).

export const site = {
  nazev: "Zákoutí Apartments",
  claim: "Moderní apartmány v srdci Orlických hor.",
  lokalita: "Deštné v Orlických horách",
  adresaProjektu: "Lokalita Zákoutí, č. p. 32, Deštné v Orlických horách",
  dokonceni: "2027",
  pocetApartmanu: 19,

  makler: {
    jmeno: "Mgr. Anna Krčmová",
    kancelar: "Baťkovo nám. 552 (Hotel Paříž), 500 02 Hradec Králové",
    telefon: "+420 728 880 529",
    telefonHref: "+420728880529",
    email: "reality@annakrcmova.cz",
    emailDruhy: "a.krcmova@centrum.cz",
    web: "https://www.annakrcmova.cz",
  },

  developer: {
    nazev: "Hradecká Developerská, s.r.o.",
    ico: "25993640",
    veta: "Stavbu realizuje Hradecká Developerská, s.r.o., IČO 25993640.",
  },

  mapa: {
    // Lokalita projektu — Deštné v Orlických horách
    lat: 50.30357,
    lng: 16.35361,
    odkaz: "https://www.google.com/maps/place/De%C5%A1tn%C3%A9+v+Orlick%C3%BDch+hor%C3%A1ch",
    embed:
      "https://www.openstreetmap.org/export/embed.html?bbox=16.30%2C50.28%2C16.41%2C50.33&layer=mapnik&marker=50.30357%2C16.35361",
  },
} as const;

export const NAV = [
  { href: "/", label: "O projektu" },
  { href: "/apartmany/", label: "Apartmány" },
  { href: "/lokalita/", label: "Lokalita" },
  { href: "/standardy/", label: "Standardy" },
  { href: "/galerie/", label: "Galerie" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;
