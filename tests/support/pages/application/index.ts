import { Page, expect } from '@playwright/test'

export class ApplicationPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('/')
    }

    async searchProduct(productName: string) {
        const inputProductName = this.page.locator('xpath=//form[contains(@class, "sc-eDLKkx")]//input')
        await inputProductName.fill(productName)

        await this.page.click('button[type="submit"]')
    }

    async addToCart () {
        await this.page.click('//section[contains(@class, "sc-iBdnpw")]//div//h2[contains(text(), "Apple iPhone 14 (128 Gb) - Meia Noite - Distribuidor Autorizado")]/../following-sibling::button')
    }

    async removeItemToCart() {
        await this.page.click('xpath=//button[contains(@class, "sc-fHejqy") and contains(@class, "HWKci")]')
    }

    async searchValidation () {
        const target = this.page.locator('xpath=//h2[contains(text(), "Liquidificador Mondial L-99 500w 2,2l C/ Jarra San Pt - 110v")]')
        await target.isVisible()
    }

    async requiredFieldValidation () {
        const inputProductName = this.page.locator('xpath=//form[contains(@class, "sc-eDLKkx")]//input')

        const validationMessage = await inputProductName.evaluate(e => (e as HTMLInputElement).validationMessage)
        await expect(validationMessage === 'Preencha este campo.' || validationMessage === 'Please fill out this field.').toBe(true);
    }

    async addToCartValidation() {
        const target = this.page.locator('xpath=//button[contains(@class,"sc-dmyCSP")]//span')
        await expect(target).toBeVisible()

        const totalCartValue = this.page.locator('div[class="sc-csKJxZ GwIeK"]')
        await expect(totalCartValue).not.toHaveText('R$ 0,00')
    }

    async removeValidation() {
        const target = this.page.locator('xpath=//button[contains(@class,"sc-dmyCSP")]//span')
        await expect(target).not.toBeVisible()
        const totalCartValue = this.page.locator('div[class="sc-csKJxZ GwIeK"]')
        await expect(totalCartValue).toHaveText('R$ 0,00')
    }
}