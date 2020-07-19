# Arquitetura

Essa aplicação utiliza 4 serviços: Neji, Hanabi, Konoha e Byakugan

## Neji

Recebe as reques de Pedido, salva no banco de dados Konoha e adiciona na file do Byakugan

## Hanabi

Fica lendo a fila do Byakugan e faz request a API do Google e atualiza os dados de Pedido com latitude e longitude

## Konoha

Banco de dados MongoDB

## Byakugan

Sistema de fila do RabbitMQ

# Rodar aplicação

- Acessar a pasta neji a criar o arquivo .env com base no arquivo .env.example
- Acessar a pasta hanabi e criar o arquivo .env com base no arquivo .env.example
- Execucar o comando no terminal
```
docker-compose up
```

# Resultados

Para criar um Order deve ser feito um request para http://localhost:3000/order [POST] com os seguinte parametros

```
{
  "user_info": {
    "phone": "(11) 98765-4321",
    "name": "João da Silva",
    "email": "joao_silva@exemplo.com"
  },
  "address_attributes": {
    "city": "São Paulo",
    "neighborhood": "Jardim Paulista",
    "street": "Avenida São Gabriel",
    "uf": "SP",
    "zip_code": "01435-001"
  },
  "request_info": {
    "question1": "answer1",
    "question2": "answer2",
    "question3": "answer3"
  }
}
```

Após a request sera salvo os dados no banco de dados e adicionado na fila do RabbitMQ um JSON com o ID da Order e os dados de **address_attributes**. O serviço Hanabi vai ler da fila esse JSON e ira fazer um request para o Google com os dados de endereço, caso retorno status **OK** do Google é atualizado a Order com os dados lat e lng.

Um exemplo do objeto após a request no Google.

```
{
  "_id": {
    "$oid": "5f14c5d0ae001f0001494be4"
  },
  "address_attributes": {
    "city": "São Paulo",
    "neighborhood": "Jardim Paulista",
    "street": "Avenida São Gabriel",
    "uf": "SP",
    "zip_code": "01435-001",
    "lat": -23.5811981,
    "lng": -46.6706357
  },
  "request_info": {
    "question1": "answer1",
    "question2": "answer2",
    "question3": "answer3"
  },
  "user_info": {
    "phone": "(11) 98765-4321",
    "name": "João da Silva",
    "email": "joao_silva@exemplo.com"
  }
}
```