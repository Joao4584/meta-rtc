export default {
  homepage: {
    construction: {
      title: "Project under Construction",
      description: "We are working hard to bring you something amazing. Stay tuned!",
      button: {
        github: "Access GitHub"
      }
    }
  },
  dashboard: {
    routes: {
      dashboard: "Dashboard",
      social: "Social",
      diagram: "Shared Diagram", 
      sprint: "Sprint Votes",
    },
    notFound: {
      title: "Page Not Found",
      description: "Sorry, this page is down or does not exist.",
      link: "Go to Dashboard",
      document: "View documentation"
    },
    translate:{
      traduction: "Change Language",
      selectLanguage: "Select Language",
      listLanguages: {
        en: "English",
        pt: "Portuguese"
      }
    }
  },
  auth: {
    signIn: 'Sign in to your account',
    yourEmail: 'Your email or user',
    placeholderEmail: 'name@company.com',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInButton: 'Sign in',
    dontHaveAccount: "Don’t have an account yet?",
    signUp: 'Sign up',
    invalidUser: "Invalid user",
    shortPassword: "Invalid password"
  },
} as const;
