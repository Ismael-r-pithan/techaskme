# TechAskMe

# Sobre o projeto

O TechAskMe é um projeto pessoal desenvolvido e arquitetado por mim (está aberto a contribuição e opiniões ) 🙂

Em uma visão geral a aplicação é um fórum onde Devs podem criar e responder dúvidas. O projeto conta com cadastro de usuário e um serviço de e-mail para confirmação de conta. Somente usuários logados e com a conta ativa podem criar, responder ou interagir (like/deslike) com as dúvidas e respostas da plataforma.
O usuário pode inserir imagens de apoio a dúvida criada, as imagens são salvas no s3 (bucket na aws) e a url da imagem é salva em um banco em produção (É possivel usar um banco local sem problemas).


# Tecnologias utilizadas
## Back end
-   TypeScript
-   Node.js
-   Express
-   Prisma

## Front end
- HTML / CSS / JS
- EJS

```bash
# clonar repositório
    git clone https://github.com/Ismael-r-pithan/techaskme

# entrar na pasta do projeto
    yarn ou npm install
```

## Observações
- Todas variaveis de ambiente utilizadas no projeto estão no arquivo .env.example, nao esqueça de preencher.





