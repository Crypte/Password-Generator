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
      pin4: "PIN (4)",
      pin6: "PIN (6)",
      pin8: "PIN (8)",
    },
    count: "Itérations",
    name: {
      label: "Votre nom",
      placeholder: "Eric Dupont",
    },
    domain: {
      label: "Domaine",
      placeholder: "google.com",
    },
    secret: {
      label: "Votre code secret",
      placeholder: "VotreS3cret-C0de@",
    },
    complexity: {
      noinput: "Aucune saisie",
      weak: "Faible",
      medium: "Moyen",
      strong: "Fort",
    },
    generate: "Générer & copier",
    result: {
      label: "Résultat",
      placeholder: "Complétez pour générer",
      tooltip: "Copier dans le presse-papiers",
    },

    toast: {
      pincopied: "",
      passwordcopied: "",
      warning: "",
    },
  },
} as const;
