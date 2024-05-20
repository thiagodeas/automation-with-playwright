import { Page, expect } from '@playwright/test'

//Criando e exportando uma classe TypeScript
export class ApplicationPage {

    //Criando propriedade page e tipando ela com Page
    readonly page: Page

    //Criando uma nova instância e associando ela à página
    constructor(page: Page) {
        this.page = page
    }

    //Criando função que acessa a página da aplicação
    async go() {
        await this.page.goto('/')
    }

    //Criando funçao que pesquisa por um produto
    async searchProduct(productName: string) {
        const inputProductName = this.page.locator('xpath=//form[contains(@class, "sc-eDLKkx")]//input')
        await inputProductName.fill(productName)

        await this.page.click('button[type="submit"]')
    }

    //Criando função que adiciona um produto ao carrinho
    async addToCart () {
        await this.page.click('//section[contains(@class, "sc-iBdnpw")]//div//h2[contains(text(), "Apple iPhone 14 (128 Gb) - Meia Noite - Distribuidor Autorizado")]/../following-sibling::button')
    }

    //Criando função que remove um produto do carrinho
    async removeItemToCart() {
        await this.page.click('xpath=//button[contains(@class, "sc-fHejqy") and contains(@class, "HWKci")]')
    }


    //Criando função que valida que o que foi pesquisado foi exibido na tela
    async searchValidation () {
        const target = this.page.locator('xpath=//h2[contains(text(), "Liquidificador Mondial L-99 500w 2,2l C/ Jarra San Pt - 110v")]')
        await target.isVisible()
    }

    //Criando função que valida que o preenchimento do campo de busca é obrigatório
    async requiredFieldValidation () {
        const inputProductName = this.page.locator('xpath=//form[contains(@class, "sc-eDLKkx")]//input')

        const validationMessage = await inputProductName.evaluate(e => (e as HTMLInputElement).validationMessage)
        await expect(validationMessage === 'Preencha este campo.' || validationMessage === 'Please fill out this field.').toBe(true);
    }

    //Criando função que valida a inclusão de um produto ao carrinho
    async addToCartValidation() {
        const target = this.page.locator('xpath=//button[contains(@class,"sc-dmyCSP")]//span')
        await expect(target).toBeVisible()

        const totalCartValue = this.page.locator('div[class="sc-csKJxZ GwIeK"]')
        await expect(totalCartValue).not.toHaveText('R$ 0,00')
    }

    //Criando função que valida a remoção de um produto do carrinho
    async removeValidation() {
        const target = this.page.locator('xpath=//button[contains(@class,"sc-dmyCSP")]//span')
        await expect(target).not.toBeVisible()
        const totalCartValue = this.page.locator('div[class="sc-csKJxZ GwIeK"]')
        await expect(totalCartValue).toHaveText('R$ 0,00')
    }
}