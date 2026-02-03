# 👨‍💻 Desafio Desenvolvedor Fullstack Jr.

## Proposta do desafio:
Desenvolver um dashboard web (SPA) moderno e responsivo construído com **React**, **Node.js**, **Next.js** e **PostgreSQL**.

## Documento de requisitos

### Realizei um planejamento da seguinte forma:
    Minha primeira etapa foi analisar a referência do [Protótipo Figma](https://www.figma.com/design/GybRSY5qwzpBYko8Yc3PfR/InteraTo-Challenge--Dev-Jr.?m=auto&t=RAByiHv483jQlAAD-6) buscando entender qual seria a real estrutura do layout.
    Após a análise, fiquei com dúvida a respeito do usuário cadastrado, pois poderia ser tando um Funcionário quanto um dono de Pet. Entretanto, optei por acreditar que seria um funcionário pois nos campos "Cadastrar" e "Editar" do Dashboard é possível editar e cadastrar dono, demonstrando não ser feito para usuários com pets e sim para Funcionários.
    Concluída essa minha dúvida e com os requisitos iniciais disponibilizados pelo "e-farias" da empresa IteraTo, pedi ao ChatGPT para gerar um prompt inicial com os recursos disponíveis e ferramentas sugeridas. Em seguida instalei a IA Cursor sugerida pelo desafio - foi meu primeiro contato com o Cursor após o VsCode (coincidentemente é um fork do vscode com IA) - e pedi para o Cursor me auxiliar com o diretório e pastas inicial do projeto.
    Após análise, refatoração e ajustes concluí o software SPA do desafio.
    
    Abaixo seguem as características, funcionalidades e ferramentas do sistema.

## 🎯 Características

- **Design Minimalista** - Tema claro elegante com destaques em laranja
- **100% Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- **Modo Claro/Escuro** - Toggle de tema com preferência do usuário
- **Animações Suaves** - Efeito de digitação, scroll reveal e transições fluidas
- **Rápido** - Otimizado para performance com Next.js e React

OBS:. O layout não ficou idêntico ao layout do figma pois foi fornecido como "Referência" então deixei a IA me sugerir um layout totalmente inovador e com boas práticas de UX/UI para captar a atenção de novos usuários. Quero reforçar que tenho a capacidade e habilidade de estilizar exatamente como no figma se tiver a oportunidade de dedicar mais tempo a vocês, sempre inovando e melhorando software e sistemas para todo mundo.

## 📱 Seções

1. **Cadastro** (Pública) - Cadastro de usuários
2. **Login** (Pública) - Login de usuários
3. **Home** CRUD (Privada) - Cadastro, listagem, criação e exclusão de animais e do respectivo dono.

## 🚀 Quick Start

### Instalação

```bash ou PowerShell
# Clone o repositório


git clone <https://github.com/YanPalmer/petcare-dashboard/commits/main/>
cd petcare-dashboard

# Instale as dependências
npm install
```

### Desenvolvimento

```bash OU PowerShell
# Inicie o servidor local
npm run dev

# Acesse http://localhost:3000 OU via Network http://192.168.1.175:3000
```

### Utilização

    1. Passo 1: Cadastrar um nome, email e senha. (Usar email fictício)
    2. Passo 2: Fazer login com o email e senha cadastrada.
    3. Passo 3: Uma vez logado e autenticado o usuário pode:
        A. Cadastrar um novo animal com (nome, tipo, idade, raça, nome do dono e contato do dono)
        B. Visualizar os animais cadastrados, tanto por ele quanto por outros usuários.
        C. Editar animais cadastrados pelo usuário atual.
        D. Deletar animais cadastrados pelo usuário atual.
        CRUD completo
    4. Ao clicar em sair o sistema encerra a sessão sendo necessário efetuar login novamente.

### Build

```bash
# Atualmente sem build
```

## 🎨 Tecnologias

- **Front-end**: React, TypeScript, TailwindCSS 4
- **Back-end**: Node.js, API, Next.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Versionamento**: Git, Github, Github Desktop
- **Bibliotecas**: Zod, React Hook Form
- **UI Components**: shadcn/ui
- **Build Tool**: Npm

## Clareza na comunicação sobre:
**O que foi implementado**: Todo este documento explica...
**O que não foi possível concluir**: Não foi possível integra com o docker por enquanto. (Estou buscando implementar)
**Quais seriam os próximos passos**: Implementar gráficos, funcionalidade de visualisar perfil e integrar com o docker para manter o serviço funcionando via VPS seriam alguns dos próximos passos que eu acho crucial para melhoria desse sistema.

## 📄 Licença

MIT - Veja [LICENSE](./LICENSE) para detalhes

## 👤 Autor

**Yan** - [GitHub](https://github.com/yanpalmer) | [LinkedIn](https://www.linkedin.com/in/yanpalmer007/)

---

Desenvolvido usando a ajuda da ferramenta Cursor(sugerida) e minhas experiências em desenvolvimento de sistemas