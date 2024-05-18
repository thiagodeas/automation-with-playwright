import { test, expect } from '@playwright/test'
import { ApplicationPage } from './support/pages/application'

let appPage: ApplicationPage

test.beforeEach(({ page }) => {
    appPage = new ApplicationPage(page)
})

test('deve conseguir pesquisar um produto', async () => {

    await appPage.go()
    await appPage.searchProduct('Liquidificador')
    await appPage.searchValidation()

})

test('deve ser obrigatório preencher o campo antes de pesquisar', async () => {

    await appPage.go()

    await appPage.searchProduct('')

    await appPage.requiredFieldValidation()

})

test('deve conseguir adicionar um produto ao carrinho de compras', async () => {

    await appPage.go()

    await appPage.addToCart()

    await appPage.addToCartValidation()

})

test('deve conseguir remover um produto do carrinho de compras', async () => {

    await appPage.go()

    await appPage.addToCart()

    await appPage.addToCartValidation()

    await appPage.removeItemToCart()

    await appPage.removeValidation()

})
