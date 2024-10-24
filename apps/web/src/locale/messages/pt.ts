export default {
  homepage: {
    construction: {
      title: "Projeto em Construção",
      description: "Estamos trabalhando duro para trazer algo incrível para você. Fique atento!",
      button: {
        github: "Acesse o GitHub"
      }
    }
  },
  dashboard: {
    routes: {
      dashboard: "Painel",
      social: "Social",
      diagram: "Diagrama", // Shared Diagram
      sprint: "Sprints",// Sprint Votes
    },
    notFound: {
      title: "Pagina não Encontrada",
      description: "Desculpe, essa pagina esta fora do ar ou não existe.",
      link: "Ir para o Dashboard",
      document: "Ver documentação"
    },
    translate:{
      traduction: "Alterar Linguagem",
      selectLanguage: "Linguagem",
      listLanguages: {
        en: "Ingles",
        pt: "Português"
      }
    }
  },
  auth: {
    signIn: 'Entrar na sua conta',
    yourEmail: 'Seu e-mail ou Usuario',
    placeholderEmail: 'nome@empresa.com',
    password: 'Senha',
    rememberMe: 'Lembre-se de mim',
    forgotPassword: 'Esqueceu a senha?',
    signInButton: 'Entrar',
    dontHaveAccount: 'Ainda não tem uma conta?',
    signUp: 'Inscreva-se',
    invalidUser: "Usuario invalido",
    shortPassword: "Senha invalida",
    register_redirect: {
      question: "Sem nenhuma conta?",
      button: "Criar"
    },
    login_redirect: {
      question: "Tem alguma conta?",
      button: "Fazer Login"
    },
  },
} as const;
