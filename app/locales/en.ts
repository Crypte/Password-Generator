export default {
  warning: {
    message: "Make sure you are on the correct URL",
  },
  generator: {
    title: "Pass Generator",
    description:
      "Generate a credential based on your secret code, your name and the domain of the website",
    type: {
      label: "Type",
      password: "Password",
      pin4: "PIN (4)",
      pin6: "PIN (6)",
      pin8: "PIN (8)",
    },
    count: "Count",
    name: {
      label: "Your name",
      placeholder: "Eric Dupont",
    },
    domain: {
      label: "Domain",
      placeholder: "google.com",
    },
    secret: {
      label: "Your secret code",
      placeholder: "YOurS3cret-C0de@",
    },
    complexity: {
      noinput: "No secret input",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
    },
    generate: "Generate & copy",
    result: {
      label: "Result",
      placeholder: "Complete to generate",
      tooltip: "Copy to clipboard",
    },
    toast: {
      pincopied: "",
      passwordcopied: "",
      warning: "",
    },
  },
} as const;
