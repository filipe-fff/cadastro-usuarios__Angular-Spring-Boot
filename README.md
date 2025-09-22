# Cadastro de Usuários — Angular + Spring Boot (MySQL)

**Descrição:** sistema de exemplo para cadastro/gestão de usuários com frontend em **Angular** e backend em **Spring Boot**, usando **MySQL** como banco de dados.

---

## Tecnologias
- Frontend: Angular (TypeScript, HTML).  
- Backend: Spring Boot (Java).  
- Banco de dados: **MySQL**.

---

## Pré-requisitos
- Java 17+  
- Maven ou Gradle (conforme o projeto)  
- Node.js + npm/yarn  
- MySQL (local) ou Docker (opcional)

---

## Como rodar (guia rápido) — com MySQL

### Opção A — Usando MySQL local
1. Crie o banco e usuário:
```bash
mysql -u root -p
# no prompt MySQL:
CREATE DATABASE cadastro_usuarios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cad_user'@'%' IDENTIFIED BY 'cad_pass';
GRANT ALL PRIVILEGES ON cadastro_usuarios.* TO 'cad_user'@'%';
FLUSH PRIVILEGES;
EXIT;
