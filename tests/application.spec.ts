import { test, expect } from '@playwright/test'
import { ApplicationPage } from './support/pages/application'

//Declarando uma variável para armazenar a instância da página
let appPage: ApplicationPage

//Executa antes de cada teste: cria uma nova instância de 'ApplicationPage' com a página do navegador 
test.beforeEach(({ page }) => {
    appPage = new ApplicationPage(page)
})

test('deve conseguir pesquisar um produto', async () => {

    //Dado que eu acesse a página da aplicação
    await appPage.go()

    //Quando eu digitar o nome de um produto e pesquisar
    await appPage.searchProduct('Liquidificador')

    //Então produtos relacionados a pesquisa serão exibidos
    await appPage.searchValidation()

})

test('deve ser obrigatório preencher o campo antes de pesquisar', async () => {

    //Dado que eu acesse a página da aplicação
    await appPage.go()

    //Quando eu tentar pesquisar sem digitar nada no campo de busca de produto
    await appPage.searchProduct('')

    //Então uma mensagem informando que o preenchimento do campo é obrigatório é exibida
    await appPage.requiredFieldValidation()

})

test('deve conseguir adicionar um produto ao carrinho de compras', async () => {

    //Dado que eu acesse a página da aplicação
    await appPage.go()

    //Quando eu clicar no botão para adicionar um produto ao carrinho
    await appPage.addToCart()

    //Então o produto deverá ser adicionado ao carrinho
    await appPage.addToCartValidation()

})

test('deve conseguir remover um produto do carrinho de compras', async () => {

    //Dado que eu acesse a página da aplicação
    await appPage.go()

    //E clico no botão para adicionar um produto ao carrinho
    await appPage.addToCart()

    //E o produto é adicionado ao carrinho
    await appPage.addToCartValidation()

    //Quando eu clicar no botão para remover um produto do carrinho
    await appPage.removeItemToCart()

    //Então o produto deverá ser removido do carrinho
    await appPage.removeValidation()

})
