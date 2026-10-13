const profile = {
  firstName: "Jesús Rodolfo",
  lastName: "Gil Farías",
  fullName: "Jesús Rodolfo Gil Farías",
  title: "Software Engineer | Backend Developer | AI & Web3",
  organization: "Universidad Católica Andrés Bello (UCAB)",
  city: "Caracas",
  country: "Venezuela",
  phone: "+584121844043",
  email: "fariasjr223@gmail.com",
  website: "https://jrgil20.github.io/ProfessionalPortfolio/",
  linkedIn: "https://www.linkedin.com/in/jesus-r-gil/",
  github: "https://github.com/Jrgil20",
  gravatarProfile: "https://gravatar.com/jesusrgil",
  whatsapp: "https://wa.me/584121844043"
};

function escapeVCardValue(value) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function buildVCard(data) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(data.lastName)};${escapeVCardValue(data.firstName)};;;`,
    `FN:${escapeVCardValue(data.fullName)}`,
    `TITLE:${escapeVCardValue(data.title)}`,
    `ORG:${escapeVCardValue(data.organization)}`,
    `ADR;TYPE=WORK:;;${escapeVCardValue(data.city)};;;${escapeVCardValue(data.country)}`,
    `TEL;TYPE=CELL:${escapeVCardValue(data.phone)}`,
    `EMAIL;TYPE=INTERNET:${escapeVCardValue(data.email)}`,
    `URL;TYPE=WORK:${escapeVCardValue(data.website)}`,
    `URL;TYPE=LinkedIn:${escapeVCardValue(data.linkedIn)}`,
    `URL;TYPE=GitHub:${escapeVCardValue(data.github)}`,
    `URL;TYPE=Gravatar:${escapeVCardValue(data.gravatarProfile)}`,
    `URL;TYPE=WhatsApp:${escapeVCardValue(data.whatsapp)}`,
    "END:VCARD"
  ];

  return `${lines.join("\r\n")}\r\n`;
}

function downloadVCard() {
  const vCard = buildVCard(profile);
  const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "jesus-rodolfo-gil-farias.vcf";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function loadGravatarAvatar() {
  const avatar = document.getElementById("avatar");
  if (!avatar || !window.crypto?.subtle) {
    return;
  }

  const value = "jesusrgil".trim().toLowerCase();
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  const hash = toHex(digest);
  avatar.src = `https://www.gravatar.com/avatar/${hash}?s=240&d=mp`;
}

document.getElementById("save-contact")?.addEventListener("click", downloadVCard);
loadGravatarAvatar().catch(() => {});
