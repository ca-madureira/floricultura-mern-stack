# Flores de Papel - MERN Stack E-commerce

Este é o repositório para o projeto **Flores de Papel**, uma aplicação de e-commerce para uma floricultura online, desenvolvida com a stack MERN (MongoDB, Express, React, Node.js). O sistema é composto por três partes principais:

- **Frontend**: Interface de usuário onde os clientes visualizam os produtos, adicionam ao carrinho e finalizam pedidos.
- **Dashboard**: Área administrativa para o cadastro de produtos e categorias.
- **API**: Backend responsável pela comunicação entre o frontend, dashboard e banco de dados.

## Funcionalidades

- **Cadastro de Produtos e Categorias**: O administrador pode cadastrar novos produtos e categorias no sistema (funcionalidade disponível no dashboard).
- **Exibição de Produtos**: O usuário pode visualizar os produtos na homepage e filtrá-los por categoria.
- **Carrinho de Compras**: O usuário pode adicionar produtos ao carrinho e finalizar a compra.
- **Autenticação de Usuário**: Para acessar o carrinho e finalizar a compra, o usuário precisa estar autenticado.
- **Integração com Cloudinary**: O upload de imagens de produtos é feito através da integração com o Cloudinary.


## Melhorias na próxima versão

- **Pagamento com Stripe**: Integração com gateway de pagamento ao finalizar compra.
- **Autenticação Admin**: Implementar autenticação do admin no dashboard.
- **Detalhes do pedido**: Melhorar a visualização dos pedidos.
- **Detalhes do produto**: Visualizar detalhes do produto ao clicar nele.
- **Mascara do input price**: Aplicar mascara de moeda brasileira no input de preço.

## Bugs pendentes para correção na próxima versão
- retorno dos valores categoria e estoque (os dois são dropdown) ao editar o produto já existente no dashboard. 

## Estrutura do Projeto

A aplicação está dividida em três diretórios principais:

1. **API**: Backend com Node.js e Express.
2. **Frontend**: Aplicação React para o cliente.
3. **Dashboard**: Interface para administração dos produtos e categorias.

Cada parte do projeto pode ser executada de forma independente.

## Pré-requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- **Node.js** (versão recomendada: 18.x ou superior)
- **npm** ou **yarn** (gerenciadores de pacotes)

## Instalação

### 1. Clonar o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/ca-madureira/papelaria-mern.git
cd papelaria-mern


```
![floricultura-online](https://github.com/user-attachments/assets/5809e5ff-1077-4ae8-a848-968fc9368f25)

<br/>

## Dashboard

<div align="center">
  <img src="https://github.com/user-attachments/assets/4f7ea1d3-d0f5-41c4-bfec-900e66d93633"/>
</div>

<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/644f5673-6684-4a75-b918-85f0ee88793e"/>
</div>




