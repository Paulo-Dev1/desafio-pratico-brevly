# Prova Prática

Este repositório contém a implementação da prova prática, dividida em duas aplicações:

* **server/** → Back-end
* **web/** → Front-end

## Requisitos

Antes de iniciar, certifique-se de possuir instalado:

* **Node.js:** `24.15.0`
* **pnpm**
* **Docker** e **Docker Compose** (para executar o banco de dados)

---

# Front-end (Vite + React + TypeScript)

A aplicação foi desenvolvida utilizando **Vite**, **React** e **TypeScript**.

## Instalação

Entre na pasta `web`:

```bash
cd web
```

Instale as dependências:

```bash
pnpm install
```

Execute o build da aplicação:

```bash
pnpm run build
```

Caso deseje executar em modo de desenvolvimento:

```bash
pnpm run dev
```

---

# Back-end

Entre na pasta `server`:

```bash
cd server
```

## Instalação

Instale as dependências:

```bash
pnpm install
```

## Banco de dados

Suba apenas o banco de dados:

```bash
docker compose up db
```

Execute as migrações:

```bash
pnpm run db:migrate
```

Visualize o banco de dados através do Drizzle Studio:

```bash
pnpm run db:studio
```

## Executando a aplicação

Inicie o servidor:

```bash
pnpm run dev
```

A documentação da API estará disponível em:

```
http://localhost:3333/docs
```

---

# Docker

Caso deseje executar toda a aplicação utilizando Docker (back-end + banco de dados), execute:

```bash
docker compose up
```

> **Observação:** Para desenvolvimento, recomenda-se utilizar:
>
> 1. `docker compose up db`
> 2. `pnpm run db:migrate`
> 3. `pnpm run dev`
>
> Dessa forma, apenas o banco de dados será executado via Docker, enquanto o back-end ficará em modo de desenvolvimento.

---

# Modelagem de Dados

```md
[![](https://mermaid.ink/img/pako:eNq1k11rwjAUhv9KONdFWrt-3g3tPlhXN7W7GAUJ7VktmkTSFNzE_75Up_jBnDc7EMg5ed-c8HCyglwUCCGg7Fe0lJRlMuO7RXSMHgbDcZRE_Uk6jEdktau3oXCpSFWQl6ezqpBVWXE6nzRyTjJIBmOSpHGcwZmyngqpkGNxIjVImjy-ptGxpeIKS5SE5jnW9SQXDVdHpn50d5vGY2KetKoY1oqyBcklUqW7UfX7u_biZlFcEq8PSd1rSsNorEn1Rm9Xg-KU4WVAEplQOJnh5590DvXX0PwnKmBAKasCQiUbNIChZLRNYdUKMlBTZJhBqLcFlTPt5K1nQfm7EGxnk6IppxB-0Hmts23PnyHdS5AXKHvtEEBomZsrIFzBUmfdbse3AssNvMD2TKdrwCeEnt2xXc92fMdzfT-w1gZ8bVqaHT9wbkzX1KeeZbu-YwAWlRLyeftBNv9k_Q2QtvY2?type=png)](https://mermaid.live/edit#pako:eNq1U9tKw0AQ_ZVlnkNJGnN9kzZeMEZtGx8kUJZkTIPd3TLZgFr6726qFbVY--LAws7sOXOWw8waSlUhxIA0bnhNXBRUyN1hJqYXN5NZkiXjeT5Jp2y9q_eh8VmzpmK3V3tVRU3dSL6cd7RkBWQ3M5blaVrAHrJdKNIosfoBtVieXd7lyXdKIzXWSIyXJbbtvFSd1N9I4-TsNE9nzP4h1QhsNRcrVhJybdS4_v1fn-BuVR0Cb746dW5cmiQz49Roen-0UZILPGwQoVAa50_48qc7X_HHuPlProAFNTUVxJo6tEAgCd6nsO4BBegFCiwgNteK05Nhyp6z4vJBKbGjkerqBcSPfNma7F3zY0g_q4SyQhr1UwCxt20B8RqeIXaGw0HoRI4fBZEb2N7QgheIA3fg-oHrhV7gh2HkbCx43UragzDyTmzfNq-B4_qhaYZVoxVdvy_Idk82b5uQ9lU)
```
