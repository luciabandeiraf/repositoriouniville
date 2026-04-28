# Levantamento de Segurança – Repositório Univille

Abaixo estão as questões encontradas e a correção proposta para cada uma. Itens estão ordenados por gravidade.

---

## 1. CRÍTICO – Qualquer usuário autenticado pode apagar/alterar todos os trabalhos

**Problema:** As políticas RLS da tabela `academic_works` para INSERT/UPDATE/DELETE usam `true`, ou seja, qualquer pessoa logada (mesmo que se cadastre sozinha no Supabase) consegue apagar ou modificar qualquer trabalho acadêmico.

**Correção proposta:**
- Criar enum `app_role` (`admin`, `user`) e tabela `user_roles` (padrão seguro, sem recursão de RLS).
- Criar função `has_role(_user_id, _role)` com `SECURITY DEFINER`.
- Substituir as políticas de INSERT/UPDATE/DELETE em `academic_works` para exigir `has_role(auth.uid(), 'admin')`.
- Manter SELECT público (`true`) já que o catálogo é público.
- Conceder a role `admin` ao usuário `luciabandeiraf@gmail.com` (admin atual).

> Observação: como o app é um repositório institucional com curadoria (não uma plataforma onde cada usuário envia o seu próprio trabalho), o modelo "admin x leitor público" é mais adequado do que "user_id por linha". Por isso a recomendação difere do scanner, que sugeriu coluna `user_id` — esse modelo não faz sentido aqui.

---

## 2. CRÍTICO – Edge Function `create-admin-user` está pública

**Problema:** A função `create-admin-user` usa `SUPABASE_SERVICE_ROLE_KEY` e cria contas com email já confirmado. Não há `verify_jwt` nem checagem de quem está chamando. Qualquer pessoa na internet pode chamar essa URL e criar usuários administrativos à vontade.

**Correção proposta:**
- Adicionar bloco em `supabase/config.toml` para essa função com `verify_jwt = true`.
- Dentro da função, validar o JWT do chamador e checar via `has_role(uid, 'admin')` antes de criar o novo usuário. Apenas admins podem criar admins.
- Alternativa, se a criação de admin for evento raro: remover a função e criar usuários direto pelo painel da Lovable Cloud.

---

## 3. AVISO – Política RLS "always true" em operações de escrita

Consequência direta do item 1. Será resolvido ao reescrever as políticas com `has_role(...)`.

---

## 4. AVISO – Proteção contra senhas vazadas (HIBP) desativada

**Problema:** Usuários podem cadastrar senhas que já apareceram em vazamentos públicos.

**Correção proposta:** Ativar `password_hibp_enabled = true` nas configurações de auth da Lovable Cloud.

---

## 5. Sobre o `.env` que você viu no repositório

**Diagnóstico (não é incidente):**
- O `.env` do projeto contém apenas:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY` (chave **anon/publishable** — feita para ser pública)
  - `VITE_SUPABASE_PROJECT_ID`
- Nenhum desses valores é segredo. Eles são embutidos no bundle JavaScript que vai para o navegador de qualquer visitante do site, então estar no Git **não** é vazamento.
- A segurança do backend depende exclusivamente do RLS (itens 1 e 3) e da proteção das edge functions (item 2) — não dessas chaves.
- Segredos reais (`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`, etc.) **não estão** no `.env` do repositório; ficam armazenados como Secrets na Lovable Cloud e só são acessíveis dentro de edge functions.

**Recomendação:**
- Manter `.env` versionado como está (gerenciado automaticamente pela Lovable, com chaves públicas).
- Nunca adicionar a `SERVICE_ROLE_KEY` ou outras chaves secretas no `.env` do front. Continuar usando o cofre de Secrets para isso.
- Se mesmo assim você preferir não versionar, é possível adicionar `.env` ao `.gitignore`, mas o conteúdo continuará público no JS final do site — então não traz ganho real de segurança.

---

## 6. Boas práticas adicionais (recomendado)

- **CORS da edge function**: hoje está `*`. Após o item 2, restringir para o domínio publicado (`https://repositoriouniville.lovable.app`) e o domínio de preview.
- **Rota `/admin`**: já protegida por `useAuth`, OK. Após criar `user_roles`, também checar se o usuário é admin antes de exibir o formulário (proteção extra de UI; a verdadeira barreira fica no RLS).
- **Mensagem de erro genérica no login**: já está OK ("Email ou senha inválidos"), sem revelar se o email existe.

---

## Resumo das mudanças que serão feitas ao aprovar

**Migração SQL:**
1. `create type app_role as enum ('admin','user')`
2. `create table user_roles (...)` com RLS habilitado
3. `create function has_role(...) security definer`
4. Drop + recreate das policies de INSERT/UPDATE/DELETE em `academic_works` usando `has_role(auth.uid(),'admin')`
5. Insert da role `admin` para `luciabandeiraf@gmail.com`

**Edge function `create-admin-user`:**
- Adicionar verificação de JWT + checagem de role admin do chamador
- Configurar `verify_jwt = true` em `supabase/config.toml`
- Restringir CORS aos domínios do projeto

**Configuração de auth:**
- Ativar HIBP (proteção contra senhas vazadas)

**Frontend (`/admin`):**
- Bloquear UI para quem não tem role `admin` (mensagem amigável + redirecionamento)

**Não será alterado:**
- `.env` (conteúdo é público por design)
- Política de SELECT pública em `academic_works` (catálogo é aberto, conforme uso atual)
