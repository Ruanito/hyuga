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

Acessar a pasta neji a criar o arquivo .env com base no arquivo .env.example
Acessar a pasta hanabi e criar o arquivo .env com base no arquivo .env.example
Execucar o comando no termina docker-compose up