export default {
  warning: {
    message: "Assurez-vous d'être sur la bonne URL",
  },
  generator: {
    title: "Générateur de Pass",
    description:
      "Générer un mot de passe/pin basé sur votre code secret, votre nom et le domaine du site web.",
    type: {
      label: "Type",
      password: "Mot de passe",
      pin4: "PIN à 4 chiffres",
      pin6: "PIN à 6 chiffres",
      pin8: "PIN à 8 chiffres",
    },
    count: "Nombre",
    name: {
      label: "Votre nom",
      placeholder: "Eric Dupont",
    },
    Domain: {
      label: "Domaine",
      placeholder: "google.com",
    },
    secret: {
      label: "Votre code secret",
      placeholder: "VotreS3cret-C0de@",
    },
    complexity: {
      noinput: "Aucune saisie de code secret",
      weak: "Faible",
      medium: "Moyen",
      strong: "Fort",
    },
    generate: "Générer & copier",
    result: {
      label: "Résultat",
      placeholder: "Complétez pour générer",
    },
  },
} as const;
